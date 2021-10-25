import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { replaceSearchFilters, updateSearchSorting } from '../../helpers/redux-store';
import { useRouter } from 'next/router';
import SearchFilterPublicationTypes from './SearchFilterPublicationTypes';
import SearchFilterTopics from './SearchFilterTopics';
import SearchFilterLanguages from './SearchFilterLanguages';
import SearchFilterYears from './SearchFilterYears';
import SearchFilterReset from './SearchFilterReset';
import { getSearchAggregations } from '../../helpers/elastic-data-loader';
import SearchFilterContentTypes from './SearchFilterContentTypes';

function toggle() {
  if (document) {
    document.querySelector('.c-filters-v2').classList.toggle('c-filters-v2--open');
  }
}

export const SearchFiltersV3 = props => {
  const dispatch = useDispatch();
  const router = useRouter();

  const resetFilters = () => {
    // Purpose: Overwrite any filter state in Redux with the actual state in the url.
    const filterStr = router.query.filters
    const searchFilters = filterStr
      .split(',')
      .filter(value => value)
      // unescape filters with commas in them.
      .map(str => str.replace(/\|/g, ','));
    // These are old filters from V1 that we need to prevent from messing with the new search filters
    const invalidFilters = ['pub-type', 'pub-topic', 'pub-year', 'pub-author', 'pub-lang'];
    dispatch(
      replaceSearchFilters(
        searchFilters.filter(
          filterName =>
            !invalidFilters.find(invalidFilterName => filterName.startsWith(invalidFilterName))
        )
      )
    );
  };

  const resetSorting = () => {
    const sort = router.query.sort
    if(sort) {
      dispatch(updateSearchSorting(sort));
    }
  };

  useEffect(() => {
    resetFilters();
    resetSorting();
    async function get() {
      const { aggregations } = await getSearchAggregations();
      return dispatch({
        type: 'SEARCH_UPDATE_DEFAULT_AGGS',
        defaultSearchAggs: aggregations,
      });
    }
    get();
  }, []);
  return (
    <div>
      <button onClick={toggle} className="c-search-results-v2__topbar-filter">
        Filters
      </button>
      <div className="c-filters-v2">
        <div className="c-filters-v2__item--title">
          <div className="c-filters-v2__clear-all">
            <h4>Filters</h4>
            <SearchFilterReset buttonText="Clear all" />
          </div>
        </div>
        <SearchFilterTopics />
        {props.publications ?  <SearchFilterPublicationTypes /> :  <SearchFilterContentTypes />}
        <SearchFilterYears />
        <SearchFilterLanguages />
        <button onClick={toggle} className="c-search-results-v2__topbar-filter-close">
          Close
        </button>
      </div>
    </div>
  );
};
