import React, { useEffect, useState } from 'react';
if (typeof window !== 'undefined') {
  // Can only polyfill if window is present. Not when running on server side.
  require('intersection-observer');
}
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import SearchResultsSortingSelect from './SearchResultsSortingSelect';
import { Post, POST_TYPE } from '../general/post/Post';
import { getPlaceholder } from '../../helpers/imgloader';
import { PaginationComponent } from '../general/PaginationComponent';

const SearchResult = props => {
  const { _source = {} } = props;
  const { type = '' } = _source;
  if (type === 'term') {
    const { termTitle = '', url = '', termContent = {} } = _source;
    return (
      <div className="c-search-results-v2__glossary">
        <span className="c-search-results-v2__items-type">Glossary</span>
        <br />
        <Link href={url}>
          <a className="c-search-results-v2__items-title">{termTitle}</a>
        </Link>
        <br />
        <p>{termContent}</p>
      </div>
    );
  } else if (type === 'topic') {
    const {
      url = '',
      featuredImageUrl = '',
      topicTitle = '',
      standfirst = '',
      isAgendaPresent,
      numberOfTopicResources = 0,
      isBasicGuidePresent,
    } = _source;
    return (
      <Post
        showImage={false}
        type={POST_TYPE.SEARCH}
        post={_source}
        placeholder={getPlaceholder(1)}
      />
    );
  } else if (type === 'publication') {
    const {
      title = '',
      subtitle = '',
      date: { utc: utcDate = '' } = {},
      topics: { title: topics = '' } = {},
      url = '',
      standfirst = '',
      publicationType: { title: publicationTypeTitle = '' } = {},
    } = _source;
    return (
      <Post
        showImage={false}
        type={POST_TYPE.SEARCH}
        post={_source}
        placeholder={getPlaceholder(1)}
      />
    );
  }
  // What to show if the search result did not match any of the items above.
  const { title = '', url = '', standfirst = '', filedUnderTopicNames = [] } = _source;
  return (
    <Post
      showImage={false}
      type={POST_TYPE.SEARCH}
      post={_source}
      placeholder={getPlaceholder(1)}
    />
  );
};
export const limit = 10;
export const SearchResultsV3 = props => {
  const [pageCount, setPageCount] = useState(1);
  const searchResults = useSelector(state => state.searchResults);
  const { searchFilters = [] } = props;
  const { hits = [], total: { value = 0 } = {} } = searchResults.hits || {};
  const maxPagesListed = 5;
  const total = searchResults.hits && searchResults.hits.total ? searchResults.hits.total.value : 0;
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
        <div className="c-search-results-v2__topbar-sortby">
          <SearchResultsSortingSelect />
        </div>
      </div>
      <hr className="u-section-underline--no-margins" />

      <ul className="c-search-results-v2__content">
        {hits.map(hit => (
          <li key={hit._id} className="c-search-results-v2__items">
            <SearchResult {...hit} />
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

const mapStateToProps = ({ currentSearchPage, searchFilters }) => ({
  currentSearchPage,
  searchFilters,
});
const mapDispatchToProps = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsV3);
