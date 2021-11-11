import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sortBy from 'lodash/sortBy';
import slugify from 'slugify';
import { addSearchFilter, removeSearchFilter } from '../../helpers/redux-store';
import { SearchFilterToggle } from './SearchFilterToggle';
const isFilterActive = ({ searchFilters = [], filterName }) =>
  !!searchFilters.find(name => name === filterName);

export const SearchFilterTopics = () => {
  const dispatch = useDispatch();
  const searchFilters = useSelector(state => state.searchFilters);
  const defaultBuckets = useSelector(state =>
    sortBy(state.defaultSearchAggs.filedUnderTopicNames.buckets, ['key'])
  );
  return (
    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Topic</h3>
      </div>
      <span>
        <SearchFilterToggle bucketsToToggle={defaultBuckets}>
          {({ toggledBuckets }) =>
            toggledBuckets.map(bucket => {
              const { key } = bucket;
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
                        dispatch(addSearchFilter(filterName));
                      } else {
                        dispatch(removeSearchFilter(filterName));
                      }
                    }}
                  />
                  <label htmlFor={slugify(key)}>{key}</label>
                </div>
              );
            })
          }
        </SearchFilterToggle>
      </span>
    </form>
  );
};
