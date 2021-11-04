import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import sortBy from 'lodash/sortBy';
import slugify from 'slugify';
import { addSearchFilter, removeSearchFilter } from '../../helpers/redux-store';
const isFilterActive = ({ searchFilters = [], filterName }) =>
  !!searchFilters.find(name => name === filterName);

const supportedTypes = [
  'article',
  'course',
  'event',
  'publication',
  'blog-post',
  'topics',
  'collection',
  'audio-video',
];
const typeLabels = {
  article: 'Article',
  course: 'Online course',
  event: 'Event',
  publication: 'Publication',
  'blog-post': 'Blog',
  topics: 'Topic',
  collection: 'Resource collection',
  'audio-video': 'Audio & video',
};
export const SearchFilterContentTypes = () => {
  const dispatch = useDispatch();
  const defaultBuckets = useSelector(state =>
    sortBy(state.defaultSearchAggs.contentTypes.buckets, ['key'])
  );
  const searchFilters = useSelector(state => state.searchFilters);
  return (
    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Content type</h3>
      </div>
      <span>
        {defaultBuckets
          .filter(bucket => supportedTypes.includes(bucket.key))
          .map(bucket => {
            const { key } = bucket;
            const filterName = `content-${key}`;
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
                <label htmlFor={slugify(key)}>{typeLabels[key]}</label>
              </div>
            );
          })}
      </span>
    </form>
  );
};
