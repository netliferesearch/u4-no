import React from 'react';
import BEMHelper from 'react-bem-helper';
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

const SearchResult = (props) => {
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
          <a {...classes('items-title')}>{topicTitle}</a>
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
    const { highlight: { content = [] } = {} } = props;
    const {
      title = '',
      date: { utc: utcDate = '' } = {},
      keywords = [],
      url = '',
      publicationType: { title: publicationTypeTitle = '' } = {},
    } = _source;
    return (
      <div>
        <span {...classes('items-type')}>{publicationTypeTitle}</span>
        <br />
        <Link route={url}>
          <a {...classes('items-title')}>{title}</a>
        </Link>
        <br />
        {utcDate && <p {...classes('items-date')}>{format(utcDate, 'D MMM YYYY')}</p>}
        {content.map((htmlStr, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: htmlStr }} />
        ))}
        {keywords.map((keyword, index) => (
          <div key={index} {...classes('items-tab')}>
            {keyword}
          </div>
        ))}
      </div>
    );
  }
  const { highlight: { content = [] } = {} } = props;
  const { title = '', url = '' } = _source;
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
        <a {...classes('items-title')}>{title}</a>
      </Link>
      <br />
      {content.map((htmlStr, index) => (
        <p key={index} dangerouslySetInnerHTML={{ __html: htmlStr }} />
      ))}
    </div>
  );
};

const SearchResultsV2 = (props) => {
  const { data = {} } = props;
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
      </ul>
    </section>
  );
};

export default SearchResultsV2;
