import React from 'react';
import BEMHelper from 'react-bem-helper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import slugify from 'slugify';
import { SearchFilterPublicationTypes, SearchFilterTopics } from './';
import {
  addSearchFilter,
  removeSearchFilter,
  clearAllSearchFilters,
  replaceSearchFilters,
} from '../helpers/redux-store';

function toggle() {
  if (document) {
    document.querySelector('.c-filters-v2').classList.toggle('c-filters-v2--open');
    document.querySelector('html').classList.toggle('u-overflow-hidden');
  }
}

class SearchFiltersV2 extends React.Component {
  onChangeHandler = ({ filterType, event }) => {
    console.log('Filter change occured', event.target);
    const {
      addSearchFilter,
      removeSearchFilter,
      replaceSearchFilters,
      searchFilters = [],
    } = this.props;
    const { value = '' } = event.target;
    if (value === 'publications-only') {
      replaceSearchFilters([
        ...searchFilters.filter(name => name !== 'all-content'),
        'publications-only',
      ]);
    } else if (value === 'all-content') {
      replaceSearchFilters([...searchFilters.filter(name => name !== 'publications-only')]);
    } else if (filterType === 'publicationType' && event.target.checked) {
      addSearchFilter(`pub-type-${event.target.value}`);
    } else if (filterType === 'publicationType' && !event.target.checked) {
      removeSearchFilter(`pub-type-${event.target.value}`);
    }

    // //eslint-disable-next-line
    // debugger;

    console.log('event target', value);
  };

  render() {
    const { data = {} } = this.props;
    const {
      aggregations: {
        languages,
        minPublicationDateMilliSeconds,
        maxPublicationDateMilliSeconds,
        publicationTypes,
        topicTitles,
      } = {},
    } = data;

    return (
      <div className="c-filters-v2">
        <div className="c-filters-v2__topbar">
          <h3 className="c-filters-v2__topbar-result">Results (10)</h3>
          <button onClick={toggle} className="c-search-results-v2__topbar-filter">
            Update search
          </button>
        </div>
        <div className="c-filters-v2__item">
          <div className="c-input">
            <input
              id="all-content"
              type="radio"
              name="content"
              value="all-content"
              defaultChecked
              onChange={event => this.onChangeHandler({ event })}
            />
            <label htmlFor="all-content">All website content</label>
          </div>
          <div className="c-input">
            <input
              id="publications-only"
              type="radio"
              name="content"
              value="publications-only"
              onChange={event => this.onChangeHandler({ event })}
            />
            <label htmlFor="publications-only" className="c-filters-v2__checkbox-label">
              Publications only
            </label>
          </div>
        </div>

        <SearchFilterPublicationTypes />

        <SearchFilterTopics />

        <form className="c-filters-v2__item">
          <div className="c-filters-v2__item-head">
            <h3 className="c-filters-v2__title">Languages</h3>
            <input className="c-filters-v2__clear" type="reset" value="Clear" />
          </div>
          <span>
            <div className="c-input">
              <input type="checkbox" id="pub-type-pubtype-1" value="pub-type-pubtype-1" />
              <label htmlFor="pub-type-pubtype-1">English (522)</label>
            </div>
            <div className="c-input">
              <input type="checkbox" id="pub-type-pubtype-2" value="pub-type-pubtype-2" />
              <label htmlFor="pub-type-pubtype-2">French (55)</label>
            </div>
            <div className="c-input">
              <input type="checkbox" id="pub-type-pubtype-3" value="pub-type-pubtype-3" />
              <label htmlFor="pub-type-pubtype-3">Ukranian (1)</label>
            </div>
            <div className="c-input">
              <input type="checkbox" id="pub-type-pubtype-4" value="pub-type-pubtype-4" />
              <label htmlFor="pub-type-pubtype-4">Russian (1)</label>
            </div>
          </span>
        </form>

        <div className="c-filters-v2__item">
          <div className="c-filters-v2__item-head">
            <h3 className="c-filters-v2__title">Year</h3>
          </div>
          <div className="c-filters-v2__select">
            <div>
              <label htmlFor="from">From:</label>
              <select id="from" className="c-select">
                <option selected value="2000">
                  2000
                </option>
                <option value="2001">2001</option>
              </select>
            </div>
            <div>
              <label htmlFor="to">To:</label>
              <select id="to" className="c-select">
                <option selected value="2018">
                  2018
                </option>
                <option selected value="2019">
                  2019
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ searchFilters = [] }) => ({ searchFilters });
const mapDispatchToProps = dispatch => ({
  addSearchFilter: bindActionCreators(addSearchFilter, dispatch),
  removeSearchFilter: bindActionCreators(removeSearchFilter, dispatch),
  clearAllSearchFilters: bindActionCreators(clearAllSearchFilters, dispatch),
  replaceSearchFilters: bindActionCreators(replaceSearchFilters, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchFiltersV2);
