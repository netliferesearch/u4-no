import React, { Component } from 'react';
import BEMHelper from 'react-bem-helper';
import uniq from 'lodash/uniq';
if (typeof window !== 'undefined') {
  // Can only polyfill if window is present. Not when running on server side.
  require('intersection-observer');
}
import { InView } from 'react-intersection-observer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSearchPageNum } from '../../helpers/redux-store';
import Link from 'next/link';
import ArrowRightSmall from '../icons/ArrowRightSmall';
import format from 'date-fns/format';
import SearchResultsSortingSelect from './SearchResultsSortingSelect';
import { Post, POST_TYPE } from '../general/post/Post';
import { getPlaceholder } from '../../helpers/imgloader';

const classes = BEMHelper({
  name: 'search-results-v2',
  prefix: 'c-',
});

const toggleFilterMenu = () => {
  if (document) {
    document.querySelector('.c-filters-v2').classList.toggle('c-filters-v2--open');
    document.querySelector('html').classList.toggle('u-overflow-hidden');
  }
};

// If there is a highlight (list of html strings) show it, or instead show fallback.
const Highlight = ({ highlight = [], fallback = '' }) => {
  if (highlight.length > 0) {
    return <span dangerouslySetInnerHTML={{ __html: highlight[0] }} />;
  }
  return fallback;
};

const SearchResult = props => {
  const { _source = {} } = props;
  const { type = '' } = _source;
  if (type === 'term') {
    const { termTitle = '', url = '', termContent = {} } = _source;
    return (
      <div {...classes('glossary')}>
        <span {...classes('items-type')}>Glossary</span>
        <br />
        <Link href={url}>
          <a {...classes('items-title')}>{termTitle}</a>
        </Link>
        <br />
        <p>{termContent}</p>
      </div>
    );
  } else if (type === 'topic') {
    const { highlight: { topicTitle: topicTitleHighlight = [] } = {} } = props;
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
      highlight: {
        content = [],
        title: titleHighlight = [],
        subtitle: subTitleHighlight = [],
      } = {},
    } = props;

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
  const { highlight: { content = [], title: titleHighlight = [] } = {} } = props;
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

class SearchResultsV2 extends Component {
  state = {
    isLoading: false,
  };
  componentDidUpdate(prevProps) {
    this.updateLoadingState({ prevProps });
    console.log('prev', prevProps);
  }

  updateLoadingState({ prevProps }) {
    if (this.props.data !== prevProps.data) {
      this.setState({ isLoading: false });
    }
  }
  render() {
    const { data = {}, searchPageNum = 1, updateSearchPageNum, searchFilters = [] } = this.props;
    const { hits = [], total: { value = 0 } = {} } = data.hits || {};

    const resultsPerPage = 10;
    const isMoreResultsToLoad = searchPageNum * resultsPerPage < value;
    return (
      <section {...classes()}>
        {!value && <span />}
        <div {...classes('topbar')}>
          <div {...classes('topbar__results')}>
            {searchFilters.length > 0 || value > 0
              ? `Results (${value})`
              : `Search our publication, courses and more. Enter a query above, and the results will be
          displayed as you type.`}
          </div>
          <button onClick={toggleFilterMenu} {...classes('topbar-filter')}>
            Filter search result
          </button>
          <div {...classes('topbar-sortby')}>
            <SearchResultsSortingSelect />
          </div>
        </div>
        <ul {...classes('content')}>
          {hits.map(hit => (
            <li key={hit._id} {...classes('items')}>
              <SearchResult {...hit} />
            </li>
          ))}
          <InView
            onChange={inView => {
              // We are already viewing all possible hits for current query
              // no need to fetch more.
              if (inView && !this.state.isLoading && isMoreResultsToLoad) {
                const newSearchPage = searchPageNum + 1;
                this.setState({ isLoading: true }, () => updateSearchPageNum(newSearchPage));
              }
            }}
          >
            {value === 0 ? null : !isMoreResultsToLoad && !this.state.isLoading ? (
              <p>
                Showing {value} of {value} search results
              </p>
            ) : this.state.isLoading ? (
              <p>Loading more search results</p>
            ) : (
              <button
                className="c-btn c-btn--primary"
                onClick={() => {
                  // Sometimes it takes time before the <InView /> component starts
                  // watching. Thus we make it possible to manually initiate a search.
                  const newSearchPage = searchPageNum + 1;
                  this.setState({ isLoading: true }, () => updateSearchPageNum(newSearchPage));
                }}
              >
                <span className="c-btn__body">Load more results</span>
              </button>
            )}
          </InView>
        </ul>
      </section>
    );
  }
}

const mapStateToProps = ({ searchPageNum, searchFilters }) => ({ searchPageNum, searchFilters });
const mapDispatchToProps = dispatch => ({
  updateSearchPageNum: bindActionCreators(updateSearchPageNum, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsV2);
