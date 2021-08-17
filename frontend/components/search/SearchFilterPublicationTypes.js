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
} from '../../helpers/redux-store';
import { publicationTypesToShow } from '../../helpers/elastic-data-loader';

import SearchFilterReset from './SearchFilterReset';


const isFilterActive = ({ searchFilters = [], filterName }) =>
  !!searchFilters.find(name => name === filterName);

const SearchFilterPublicationTypes = props => {
  const { searchFilters, defaultBuckets = [], addSearchFilter, removeSearchFilter } = props;
  const bucketsToShow = defaultBuckets.filter(({ key }) =>
    publicationTypesToShow.find(name => name === key)
  );
  const otherBuckets = defaultBuckets.filter(
    ({ key }) => !publicationTypesToShow.find(name => name === key)
  );
  return (
    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Publication type</h3>
        <span className="c-filters-v2__clear">
          <SearchFilterReset filterPrefix="pub-" />
        </span>
      </div>
      <span>
        {bucketsToShow.map(bucket => {
          const { key } = bucket;
          const filterName = `pub-${key}`;
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
        {otherBuckets.length > 0 && (
          <div className="c-input">
            <input
              type="checkbox"
              id="pub-other"
              checked={isFilterActive({ searchFilters, filterName: 'pub-other' })}
              value="pub-other"
              onChange={event => {
                if (event.target.checked) {
                  addSearchFilter('pub-other');
                } else {
                  removeSearchFilter('pub-other');
                }
              }}
            />
            <label htmlFor="pub-other">Other</label>
          </div>
        )}
      </span>
    </form>
  );
};

const mapStateToProps = ({
  defaultSearchAggs: { publicationTypes: { buckets: defaultBuckets = [] } = {} } = {},
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
)(SearchFilterPublicationTypes);
