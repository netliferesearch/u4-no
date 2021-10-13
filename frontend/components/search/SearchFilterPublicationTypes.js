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

const SearchFilterPublicationTypes = props => {
  const dispatch = useDispatch();
  const { searchFilters, defaultBuckets = [], addSearchFilter, removeSearchFilter } = props;
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
                checked={isFilterActive({ searchFilters, filterName })}
                value={key}
                onChange={event => {
                  if (event.target.checked) {
                    addSearchFilter(filterName);
                    dispatch(updateSearchPageNum(1));
                  } else {
                    removeSearchFilter(filterName);
                    dispatch(updateSearchPageNum(1));
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
