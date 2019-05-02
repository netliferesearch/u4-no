import React from 'react';
import { withRouter } from 'next/router';
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
import { publicationTypesToShow } from '../helpers/elastic-data-loader';

const isFilterActive = ({ searchFilters = [], filterName }) =>
  searchFilters.find(name => name === filterName);

const SearchFilterPublicationTypes = props => {
  const {
    searchFilters,
    buckets = [],
    defaultBuckets = [],
    addSearchFilter,
    removeSearchFilter,
    router,
  } = props;
  const { search: searchQuery = '' } = router.query;
  /**
   * We jump through hoops calculating docCount hits using the default aggregations because
   * if a search result returns with 0 docCount hits on a certain aggregation we still want
   * to display that filter option in the list of filters.
   */
  const bucketsToShow = defaultBuckets
    .filter(({ key }) => publicationTypesToShow.find(name => name === key))
    .map(({ key, doc_count: defaultDocCount }) => {
      const { doc_count: docCount = 0 } = buckets.find(bucket => bucket.key === key) || {};
      return {
        key,
        docCount,
        defaultDocCount,
      };
    });
  const otherBuckets = defaultBuckets.filter(
    ({ key }) => !publicationTypesToShow.find(name => name === key)
  );
  const otherBucketsDefaultResultCount = defaultBuckets
    .filter(({ key }) => !publicationTypesToShow.find(name => name === key))
    .reduce((acc, { doc_count: docCount = 0 }) => acc + docCount, 0);
  const otherBucketsResultCount = buckets
    .filter(({ key }) => !publicationTypesToShow.find(name => name === key))
    .reduce((acc, { doc_count: docCount = 0 }) => acc + docCount, 0);
  return (
    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Publication type</h3>
      </div>
      <span>
        {bucketsToShow.map(bucket => {
          const { key, docCount, defaultDocCount } = bucket;
          const filterName = `pub-${key}`;
          return (
            <div key={slugify(key)} className="c-input">
              <input
                type="checkbox"
                id={slugify(key)}
                defaultChecked={isFilterActive({ searchFilters, filterName })}
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
                {key} ({searchQuery.length > 2 ? docCount : defaultDocCount})
              </label>
            </div>
          );
        })}
        {otherBuckets.length > 0 && (
          <div className="c-input">
            <input
              type="checkbox"
              id="pub-other"
              defaultChecked={isFilterActive({ searchFilters, filterName: 'pub-other' })}
              value="pub-other"
              onChange={event => {
                if (event.target.checked) {
                  addSearchFilter('pub-other');
                } else {
                  removeSearchFilter('pub-other');
                }
              }}
            />
            <label htmlFor="pub-other">
              Other (
              {searchQuery.length > 2 ? otherBucketsResultCount : otherBucketsDefaultResultCount})
            </label>
          </div>
        )}
      </span>
    </form>
  );
};

const mapStateToProps = ({
  defaultSearchAggs: { publicationTypes: { buckets: defaultBuckets = [] } = {} } = {},
  searchResults: { aggregations: { publicationTypes: { buckets = [] } = {} } = {} } = {},
  searchFilters,
}) => ({
  defaultBuckets: sortBy(defaultBuckets, ['key']),
  buckets: sortBy(buckets, ['key']),
  searchFilters,
});

const mapDispatchToProps = dispatch => ({
  addSearchFilter: bindActionCreators(addSearchFilter, dispatch),
  removeSearchFilter: bindActionCreators(removeSearchFilter, dispatch),
  clearAllSearchFilters: bindActionCreators(clearAllSearchFilters, dispatch),
  replaceSearchFilters: bindActionCreators(replaceSearchFilters, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchFilterPublicationTypes)
);
