import React from 'react';
import moment from 'moment';
import BEMHelper from 'react-bem-helper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSearchSorting } from '../helpers/redux-store';
import { Link } from '../routes';

import { AuthorList, EditorList } from '../components/';

const classes = BEMHelper({
  name: 'search-results',
  prefix: 'c-',
});

const toggleFilterMenu = () => {
  if (document) {
    document.querySelector('.c-filters').classList.toggle('c-filters--open');
    document.querySelector('html').classList.toggle('u-overflow-hidden');
  }
};

const SearchResults = (props) => {
  const { results = [], searchSorting = 'relevance', updateSearchSorting = () => {} } = props;
  return (
    <section {...classes()}>
      <div {...classes('topbar')}>
        <h3 {...classes('topbar-result')}>Results ({results.length})</h3>
        <button onClick={toggleFilterMenu} {...classes('topbar-filter')}>
          Filter search result
        </button>
        <div {...classes('topbar-sortby')}>
          <label>Sort by </label>
          <select
            value={searchSorting}
            onChange={e => updateSearchSorting(e.target.value)}
            {...classes('topbar-select')}
          >
            <option value="relevance">Relevance</option>
            <option value="year-desc">Year, new → old</option>
            <option value="year-asc">Year, old → new</option>
          </select>
        </div>
      </div>
      <ul {...classes('content')}>
        {results.map(({
            _id,
            _type,
            publicationType = false,
            date = {},
            slug = {},
            title,
            subtitle = false,
            authors = false,
            editors = false,
          }) => (
            <li {...classes('items')} key={_id}>
              <span {...classes('items-type')}>
                {publicationType && (
                  <span>
                    {_type}: {publicationType.title}
                  </span>
                )}
                {!publicationType && <span>{_type}</span>}
              </span>
              <span {...classes('items-date')}>
                {date && moment(date.utc).format('DD.MM.YYYY')}
              </span>
              <br />
              <Link to={`/${_type}s/${slug.current}`}>
                <a {...classes('items-title')}>{title}</a>
              </Link>
              <br />
              <span {...classes('items-subtitle')}>{subtitle}</span>
              {authors.length ? (
                <div>
                  <AuthorList authors={authors} />
                  <br />
                </div>
              ) : null}
              {editors.length ? (
                <div>
                  <EditorList editors={editors} />
                  <br />
                </div>
              ) : null}
            </li>
          ))}
      </ul>
    </section>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  updateSearchSorting: bindActionCreators(updateSearchSorting, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
