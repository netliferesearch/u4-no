import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import slugify from 'slugify';
import {
  addSearchFilter,
  removeSearchFilter,
  clearAllSearchFilters,
  replaceSearchFilters,
} from '../helpers/redux-store';

const isFilterActive = ({ searchFilters = [], filterName }) =>
  searchFilters.find(name => name === filterName);

const SearchFilterLanguages = (props) => {
  const {
    searchFilters,
    buckets = [],
    defaultBuckets = [],
    addSearchFilter,
    removeSearchFilter,
  } = props;
  // const inactiveBuckets = getSortedInactiveBuckets({ buckets, defaultBuckets });
  return (
    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Languages</h3>
      </div>
      <span>
        {defaultBuckets.map((defaultBucket) => {
          const { key = defaultBucket.key, doc_count = 0 } =
            buckets.find(b => b.key === defaultBucket.key) || {};
          const filterName = `lang-type-${key}`;
          return (
            <div key={slugify(key)} className="c-input">
              <input
                type="checkbox"
                id={slugify(key)}
                checked={isFilterActive({ searchFilters, filterName })}
                value={key}
                onChange={(event) => {
                  if (event.target.checked) {
                    addSearchFilter(filterName);
                  } else {
                    removeSearchFilter(filterName);
                  }
                }}
              />
              <label htmlFor={slugify(key)}>
                {key} ({doc_count})
              </label>
            </div>
          );
        })}
      </span>
    </form>
  );
};

const mapStateToProps = ({
  defaultSearchAggs: { languages: { buckets: defaultBuckets = [] } = {} } = {},
  searchResults: { aggregations: { languages: { buckets = [] } = {} } = {} },
  searchFilters,
}) => ({
  defaultBuckets,
  buckets,
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
  mapDispatchToProps,
)(SearchFilterLanguages);
