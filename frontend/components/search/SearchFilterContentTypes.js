import React from 'react';
import { bindActionCreators } from 'redux';
import { connect, useDispatch } from 'react-redux';
import sortBy from 'lodash/sortBy';
import slugify from 'slugify';
import {
  addSearchFilter,
  removeSearchFilter,
  clearAllSearchFilters,
  replaceSearchFilters,
  updateSearchPageNum,
} from '../../helpers/redux-store';
const isFilterActive = ({ searchFilters = [], filterName }) =>
  !!searchFilters.find(name => name === filterName);

const supportedTypes = ['article', 'course', 'event', 'publication', 'blog-post', 'topics', 'collection', 'audio_video']
const typeLabels = {
  'article': 'Article',
  'course': 'Online course',
  'event': 'Event',
  'publication': 'Publication',
  'blog-post': 'Blog',
  'topics': 'Topic',
  'collection': 'Resource collection',
  'audio_video': 'Audio & video',
}
const SearchFilterContentTypes = props => {
  const dispatch = useDispatch();
  const { searchFilters, defaultBuckets = [], addSearchFilter, removeSearchFilter } = props;
  console.log('defaultBuckets', defaultBuckets);

  return (
    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Content type</h3>
      </div>
      <span>
        {defaultBuckets.filter(bucket => supportedTypes.includes(bucket.key)).map(bucket => {
          const { key } = bucket;
          const filterName = `content-${key}`;
          return (
            <div key={slugify(key)} className="c-input">
              <input
                type="checkbox"
                id={slugify(key)}
                value={key}
                onChange={event => {
                  if (event.target.checked) {
                    console.log({ filterName });
                    addSearchFilter(filterName);
                  } else {
                    removeSearchFilter(filterName);
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

const mapStateToProps = ({
  defaultSearchAggs: { contentTypes: { buckets: defaultBuckets = [] } = {} } = {},
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
)(SearchFilterContentTypes);
