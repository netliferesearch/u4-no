import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sortBy from 'lodash/sortBy';
import slugify from 'slugify';
import {
  addSearchFilter,
  removeSearchFilter,
  updateSearchPageNum,
} from '../../helpers/redux-store';

export const SearchFilterPublicationTypes = () => {
  const dispatch = useDispatch();
  const defaultBuckets = useSelector(
    state => sortBy(state.defaultSearchAggs.publicationTypes.buckets, ['key']) || []
  );
  return (
    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Publication type</h3>
      </div>
      <span>
        {defaultBuckets.map(bucket => {
          const { key } = bucket;
          const filterName = `pub-${key}`;
          return (
            <div key={slugify(key)} className="c-input">
              <input
                type="checkbox"
                id={slugify(key)}
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
        })}
      </span>
    </form>
  );
};
