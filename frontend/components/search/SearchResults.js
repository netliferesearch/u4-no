import React from 'react';
if (typeof window !== 'undefined') {
  // Can only polyfill if window is present. Not when running on server side.
  require('intersection-observer');
}
import { useSelector } from 'react-redux';
import { SearchResultsSortingSelect } from './SearchResultsSortingSelect';
import { PaginationComponent } from '../general/PaginationComponent';
import { SearchResult } from './SearchResult';
import { useRouter } from 'next/router';

export const limit = 10;
export const SearchResults = props => {
  const router = useRouter();
  const searchResults = useSelector(state => state.searchResults);
  const searchFilters = useSelector(state => state.searchFilters);
  const { hits = [], total: { value = 0 } = {} } = searchResults ? searchResults.hits : {};
  const total =
    searchResults && searchResults.hits && searchResults.hits.total
      ? searchResults.hits.total.value
      : 0;
  const lastPage = Math.ceil(total / limit);
  const currentSearchPage = useSelector(state => state.searchPageNum);
  const currentFrom = router.query.searchPageNum * limit - (limit - 1);
  let currentTo = router.query.searchPageNum * limit;
  if (lastPage === currentSearchPage) {
    currentTo = total;
  }
  const currentResults = `${currentFrom}-${currentTo}`;

  return (
    <section className="c-search-results-v2--search">
      <div className="c-search-results-v2__topbar">
        <div className="c-search-results-v2__topbar__results">
          {searchFilters.length > 0 || total > 0
            ? `Showing ${currentResults} of ${total} results`
            : `Search our publications, courses and more. Enter a query above, and the results will be
          displayed as you type.`}
        </div>
        {!props.publications && ( total > 0 ) && (
          <div className="c-search-results-v2__topbar-sortby">
            <SearchResultsSortingSelect />
          </div>
        )}
      </div>
      <hr className="u-section-underline--no-margins" />
      <ul className="c-search-results-v2__content">
        {hits.map(hit => (
          <li key={hit._id} className="c-search-results-v2__items">
            <SearchResult {...hit} publications={props.publications} />
          </li>
        ))}
      </ul>
      {total ? (
        <PaginationComponent total={total} limit={limit} currentPage={currentSearchPage} search />
      ) : null}
    </section>
  );
};
