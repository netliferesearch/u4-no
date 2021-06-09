import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import {
  addSearchFilter,
  removeSearchFilter,
  clearAllSearchFilters,
  replaceSearchFilters,
  updateSearchSorting,
} from '../helpers/redux-store';

import SearchFilterPublicationTypes from './SearchFilterPublicationTypes';
import SearchFilterTopics from './SearchFilterTopics';
import SearchFilterLanguages from './SearchFilterLanguages';
import SearchFilterYears from './SearchFilterYears';
import SearchFilterReset from './SearchFilterReset';


function toggle() {
  if (document) {
    document.querySelector('.c-filters-v2').classList.toggle('c-filters-v2--open');
    document.querySelector('html').classList.toggle('u-overflow-hidden');
  }
}

class SearchFiltersV2 extends React.Component {
  componentDidMount() {
    this.resetFilters();
    this.resetSorting();
  }

  resetFilters() {
    const {
      replaceSearchFilters,
      router: { query: { filters: filterStr = '' } = {} } = {},
    } = this.props;
    // Purpose: Overwrite any filter state in Redux with the actual state in the url.
    const searchFilters = filterStr
      .split(',')
      .filter(value => value)
      // unescape filters with commas in them.
      .map(str => str.replace(/\|/g, ','));
    // These are old filters from V1 that we need to prevent from messing with the new search filters
    const invalidFilters = ['pub-type', 'pub-topic', 'pub-year', 'pub-author', 'pub-lang'];
    replaceSearchFilters(
      searchFilters.filter(
        filterName =>
          !invalidFilters.find(invalidFilterName => filterName.startsWith(invalidFilterName))
      )
    );
  }

  resetSorting() {
    const { updateSearchSorting, router: { query: { sort = '' } = {} } = {} } = this.props;
    updateSearchSorting(sort);
  }

  render() {
    const { searchFilters, replaceSearchFilters, searchTotal } = this.props;

    return (
      <div className="c-filters-v2">
        <div className="c-filters-v2__topbar">
          <h3 className="c-filters-v2__topbar-result">Results ({`${searchTotal.value}`})</h3>
          <button onClick={toggle} className="c-search-results-v2__topbar-filter">
            Update search
          </button>
        </div>
        <div className="c-filters-v2__item">
          <div className="c-filters-v2__clear-all">
            <SearchFilterReset buttonText="Clear all filters" />
          </div>
          <div className="c-input">
            <input
              id="all-content"
              type="radio"
              name="content"
              value="all-content"
              checked={!searchFilters.find(name => name === 'publications-only')}
              onChange={() =>
                replaceSearchFilters([
                  ...searchFilters.filter(name => name !== 'publications-only'),
                  'all-content',
                ])
              }
            />
            <label htmlFor="all-content">All website content</label>
          </div>
          <div className="c-input">
            <input
              id="publications-only"
              type="radio"
              name="content"
              value="publications-only"
              checked={!!searchFilters.find(name => name === 'publications-only')}
              onChange={() =>
                replaceSearchFilters([
                  ...searchFilters.filter(name => name !== 'all-content'),
                  'publications-only',
                ])
              }
            />
            <label htmlFor="publications-only" className="c-filters-v2__checkbox-label">
              Publications only
            </label>
          </div>
        </div>

        <SearchFilterPublicationTypes />

        <SearchFilterTopics />

        <SearchFilterLanguages />

        <SearchFilterYears />
      </div>
    );
  }
}

const mapStateToProps = ({
  searchFilters = [],
  searchResults: { hits: { total: searchTotal = 0 } = {} } = {},
}) => ({ searchFilters, searchTotal });

const mapDispatchToProps = dispatch => ({
  addSearchFilter: bindActionCreators(addSearchFilter, dispatch),
  removeSearchFilter: bindActionCreators(removeSearchFilter, dispatch),
  clearAllSearchFilters: bindActionCreators(clearAllSearchFilters, dispatch),
  replaceSearchFilters: bindActionCreators(replaceSearchFilters, dispatch),
  updateSearchSorting: bindActionCreators(updateSearchSorting, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchFiltersV2)
);
