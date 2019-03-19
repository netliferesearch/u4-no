import React, { Component } from 'react';
import BEMHelper from 'react-bem-helper';
if (typeof window !== 'undefined') {
  // Can only polyfill if window is present. Not when running on server side.
  require('intersection-observer');
}
import { InView } from 'react-intersection-observer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSearchPageNum } from '../helpers/redux-store';
import { Link } from '../routes';
import { ArrowRightSmall } from '../components/icons';
import format from 'date-fns/format';
import { SearchResultsSortingSelect } from '../components';

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
        <Link route={url}>
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
      <div {...classes('topic')}>
        <span {...classes('items-type')}>Topic</span>
        <br />
        <Link route={url}>
          <a {...classes('items-title')}>
            <Highlight highlight={topicTitleHighlight} fallback={topicTitle} />
          </a>
        </Link>
        <br />
        <div {...classes('topic-wrapper')}>
          <div {...classes('topic-img')}>
            {featuredImageUrl && <img src={`${featuredImageUrl}?w=500&fit=crop&crop=focalpoint`} />}
          </div>
          <div {...classes('topic-content')}>
            <p>{standfirst}</p>
            {isBasicGuidePresent && (
              <div {...classes('topic-point')}>
                <ArrowRightSmall />
                <Link route={`${url}/basics`}>
                  <a>Basic guide</a>
                </Link>
              </div>
            )}
            {isAgendaPresent && (
              <div {...classes('topic-point')}>
                <ArrowRightSmall />
                <Link route={`${url}/agenda`}>
                  <a>Research and policy agenda</a>
                </Link>
              </div>
            )}
            {numberOfTopicResources > 0 && (
              <div {...classes('topic-point')}>
                <ArrowRightSmall />
                <Link route={`${url}#resources`}>
                  <a>Publications and other resources</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else if (type === 'publication') {
    const { highlight: { content = [], title: titleHighlight = [] } = {} } = props;
    const {
      title = '',
      date: { utc: utcDate = '' } = {},
      keywords = [],
      url = '',
      standfirst = '',
      publicationType: { title: publicationTypeTitle = '' } = {},
    } = _source;
    return (
      <div>
        <span {...classes('items-type')}>{publicationTypeTitle}</span>
        <br />
        <Link route={url}>
          <a {...classes('items-title')}>
            <Highlight highlight={titleHighlight} fallback={title} />
          </a>
        </Link>
        <br />
        {utcDate && <p {...classes('items-date')}>{format(utcDate, 'D MMM YYYY')}</p>}
        <p>
          <Highlight highlight={content} fallback={standfirst} />
        </p>
        {keywords.map((keyword, index) => (
          <div key={index} {...classes('items-tab')}>
            {keyword}
          </div>
        ))}
      </div>
    );
  }
  // What to show if the search result did not match any of the items above.
  const { highlight: { content = [], title: titleHighlight = [] } = {} } = props;
  const { title = '', url = '', standfirst = '' } = _source;
  return (
    <div>
      <span {...classes('items-type')}>
        {type === 'frontpage'
          ? 'Page'
          : type === 'person'
          ? 'Staff'
          : type === 'course'
          ? 'Online course'
          : type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
      <br />
      <Link route={url}>
        <a {...classes('items-title')}>
          <Highlight highlight={titleHighlight} fallback={title} />
        </a>
      </Link>
      <br />
      <p>
        <Highlight highlight={content} fallback={standfirst} />
      </p>
    </div>
  );
};

class SearchResultsV2 extends Component {
  state = {
    isLoading: false,
  };

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { data = {}, searchPageNum, updateSearchPageNum } = this.props;
    const { hits = [], total = 0 } = data.hits || {};
    return (
      <section {...classes()}>
        <div {...classes('topbar')}>
          <div>Results ({total})</div>
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
              // It gets heavier and heavier to search for each page added
              // So we cap it at ten pages.
              if (inView && !this.state.isLoading) {
                if (searchPageNum * 10 >= total) {
                  // We are already viewing all possible hits for current query
                  // no need to fetch more.
                  return;
                }
                const newSearchPage = (searchPageNum || 1) + 1;
                this.setState({ isLoading: true }, () => updateSearchPageNum(newSearchPage));
              }
            }}
          >
            {searchPageNum * 10 >= total && !this.state.isLoading ? (
              <p>
                Showing {total} of {total} search results
              </p>
            ) : null}
            {this.state.isLoading && <p>Loading more search results</p>}
          </InView>
        </ul>
      </section>
    );
  }
}

const mapStateToProps = ({ searchPageNum }) => ({ searchPageNum });
const mapDispatchToProps = dispatch => ({
  updateSearchPageNum: bindActionCreators(updateSearchPageNum, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultsV2);
