import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import slugify from 'slugify';
import sortBy from 'lodash/sortBy';
import {
  addSearchFilter,
  removeSearchFilter,
  clearAllSearchFilters,
  replaceSearchFilters,
} from '../helpers/redux-store';

import SearchFilterReset from './SearchFilterReset'

const isFilterActive = ({ searchFilters = [], filterName }) =>
  !!searchFilters.find(name => name === filterName);

const SearchFilterLanguages = props => {
  const { searchFilters, defaultBuckets = [], addSearchFilter, removeSearchFilter } = props;
  return (
    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Language</h3>
        <span className="c-filters-v2__clear">
          <SearchFilterReset filterPrefix="lang-type-" />
        </span>
      </div>
      <span>
        {defaultBuckets.map(defaultBucket => {
          const { key } = defaultBucket;
          const filterName = `lang-type-${key}`;
          return (
            <div key={slugify(key)} className="c-input">
              <input
                type="checkbox"
                id={slugify(key)}
                checked={isFilterActive({ searchFilters, filterName })}
                value={key}
                onChange={event => {
                  if (event.target.checked) {
                    addSearchFilter(filterName);
                  } else {
                    removeSearchFilter(filterName);
                  }
                }}
              />
              <label htmlFor={slugify(key)}>{key}</label>
            </div>
          );
        })}
      </span>
    </form>
  );
};

const mapStateToProps = ({
  defaultSearchAggs: { languages: { buckets: defaultBuckets = [] } = {} } = {},
  searchFilters,
}) => ({
  defaultBuckets: sortBy(defaultBuckets, ['key']),
  searchFilters,
});

const mapDispatchToProps = dispatch => ({
  addSearchFilter: bindActionCreators(addSearchFilter, dispatch),
  removeSearchFilter: bindActionCreators(removeSearchFilter, dispatch),
  clearAllSearchFilters: bindActionCreators(clearAllSearchFilters, dispatch),
  replaceSearchFilters: bindActionCreators(replaceSearchFilters, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFilterLanguages);
