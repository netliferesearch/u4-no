import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import {
  addSearchFilter,
  removeSearchFilter,
  clearAllSearchFilters,
  replaceSearchFilters,
  updateSearchSorting,
} from '../../helpers/redux-store';

import SearchFilterPublicationTypes from './SearchFilterPublicationTypes';
import SearchFilterTopics from './SearchFilterTopics';
import SearchFilterLanguages from './SearchFilterLanguages';
import SearchFilterYears from './SearchFilterYears';
import SearchFilterReset from './SearchFilterReset';

function toggle() {
  if (document) {
    document.querySelector('.c-filters-v2').classList.toggle('c-filters-v2--open');
  }
}

const SearchFiltersV3 = props => {
  // const { searchFilters, replaceSearchFilters, searchTotal } = props;
  console.log('results props', props);
  const resetFilters = () => {
    const {
      replaceSearchFilters,
      router: { query: { filters: filterStr = '' } = {} } = {},
    } = props;
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
  };

  const resetSorting = () => {
    const { updateSearchSorting, router: { query: { sort = '' } = {} } = {} } = props;
    updateSearchSorting(sort);
  };

  useEffect(() => {
    resetFilters();
    resetSorting();
  }, []);
  return (
    <div>
      <button onClick={toggle} className="c-search-results-v2__topbar-filter">
        Filters
      </button>
      <div className="c-filters-v2">
        <div className="c-filters-v2__item--title">
          <div className="c-filters-v2__clear-all">
            <h4>Filters</h4>
            <SearchFilterReset buttonText="Clear all" />
          </div>
        </div>
        <SearchFilterTopics />
        <SearchFilterPublicationTypes />
        <SearchFilterYears />
        <SearchFilterLanguages />
        <button onClick={toggle} className="c-search-results-v2__topbar-filter-close">
          Close
        </button>
      </div>
    </div>
  );
};

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
  )(SearchFiltersV3)
);
