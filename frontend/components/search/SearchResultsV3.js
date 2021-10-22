import React, { useEffect, useState } from 'react';
if (typeof window !== 'undefined') {
  // Can only polyfill if window is present. Not when running on server side.
  require('intersection-observer');
}
import { useSelector } from 'react-redux';
import SearchResultsSortingSelect from './SearchResultsSortingSelect';
import { PaginationComponent } from '../general/PaginationComponent';
import { SearchResult } from './SearchResult';

export const limit = 10;
export const SearchResultsV3 = props => {
  const [pageCount, setPageCount] = useState(1);
  const searchResults = useSelector(state => state.searchResults);
  const searchFilters = useSelector(state => state.searchFilters);
  const { hits = [], total: { value = 0 } = {} } = searchResults ? searchResults.hits : {};
  const maxPagesListed = 5;
  const total =
    searchResults && searchResults.hits && searchResults.hits.total
      ? searchResults.hits.total.value
      : 0;
  let d = total < limit ? 1 : Math.ceil(total / limit);
  const lastPage = Math.ceil(total / limit);
  const currentSearchPage = useSelector(state => state.searchPageNum);
  const currentFrom = currentSearchPage * limit - (limit - 1);
  let currentTo;
  if (lastPage === currentSearchPage) {
    currentTo = total;
  } else {
    currentTo = currentSearchPage * limit - limit + limit;
  }
  const currentResults = `${currentFrom}-${currentTo}`;
  useEffect(() => {
    setPageCount(Math.ceil(total / d) > maxPagesListed ? maxPagesListed : Math.ceil(total / d));
  });

  return (
    <section className="c-search-results-v2--search">
      {!value && <span />}
      <div className="c-search-results-v2__topbar">
        <div className="c-search-results-v2__topbar__results">
          {searchFilters.length > 0 || value > 0
            ? `Showing ${currentResults} of ${value} Results`
            : `Search our publication, courses and more. Enter a query above, and the results will be
          displayed as you type.`}
        </div>
        {!props.publications && (
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
        <PaginationComponent
          total={total}
          limit={limit}
          pageCount={pageCount}
          currentPage={currentSearchPage}
          search
        />
      ) : null}
    </section>
  );
};
