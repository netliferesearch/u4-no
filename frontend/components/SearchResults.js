import React, { Component } from 'react';
import moment from 'moment';
import BEMHelper from 'react-bem-helper';
import { Link } from '../routes';

import { AuthorList, EditorList } from '../components/';

const classes = BEMHelper({
  name: 'search-results',
  prefix: 'c-',
});

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }

  toggle() {
    document.getElementsByClassName('c-filters')[0].classList.toggle('c-filters--open');
  }

  render() {
    const { results } = this.props;
    return (
      <section {...classes()}>
        <div {...classes('topbar')}>
          <h3 {...classes('topbar-result')}>Results ({results.length})</h3>
          <div>
            <label>Sort by </label>
            <select {...classes('topbar-select')}>
              <option value="1">Relevance</option>
              <option value="2">Year</option>
            </select>
          </div>
          <button onClick={this.toggle} {...classes('topbar-filter')}>filter search result</button>
        </div>
        <ul {...classes('content')}>
          {results.map(
            ({
              _id,
              _type,
              publicationType = false,
              date,
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
                  {date && moment(date.local).format('DD.MM.YYYY')}
                </span>
                <br />
                <Link to={`/${_type}s/${slug.current}`}>
                  <a {...classes('items-title')}>{title}</a>
                </Link>
                <br />
                <span {...classes('items-subtitle')}>{subtitle}</span>
                {authors ? (
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
            ),
          )}
        </ul>
      </section>
    );
  }
}
