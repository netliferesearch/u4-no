import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sortBy from 'lodash/sortBy';
import slugify from 'slugify';
import {
  addSearchFilter,
  removeSearchFilter,
  clearAllSearchFilters,
  replaceSearchFilters,
} from '../helpers/redux-store';
import { SearchFilterReset, SearchFilterToggle } from './';

const isFilterActive = ({ searchFilters = [], filterName }) =>
  !!searchFilters.find(name => name === filterName);

const SearchFilterTopics = props => {
  const { searchFilters, defaultBuckets = [], addSearchFilter, removeSearchFilter } = props;
  return (
    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Topic</h3>
        <span className="c-filters-v2__clear">
          <SearchFilterReset filterPrefix="topic-type-" />
        </span>
      </div>
      <span>
        <SearchFilterToggle bucketsToToggle={defaultBuckets}>
          {({ toggledBuckets }) =>
            toggledBuckets.map(bucket => {
              const { key, doc_count } = bucket;
              const filterName = `topic-type-${key}`;
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
                  <label htmlFor={slugify(key)}>
                    {key} ({doc_count})
                  </label>
                </div>
              );
            })
          }
        </SearchFilterToggle>
      </span>
    </form>
  );
};

const mapStateToProps = ({
  defaultSearchAggs: { filedUnderTopicNames: { buckets: defaultBuckets = [] } = {} } = {},
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
)(SearchFilterTopics);
