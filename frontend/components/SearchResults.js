import React, { Component } from 'react';
import moment from 'moment';
import { Link } from '../routes';
import BEMHelper from 'react-bem-helper';

import { AuthorList, EditorList } from '../components/';

const classes = BEMHelper({
  name: 'search-results',
  prefix: 'c-',
});


export default class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = { results: [] }
  }

  render() {
    const { results } = this.props;
    return (
      <div>
        <section>
          <span>Results:</span> {results.length}
        </section>
        <ul>
          {
            results
              .map(({ _id, _type, date, slug = {}, title, subtitle = false, authors = false, editors = false }) => (<li {...classes('items')} key={_id}>
                <span>{_type}</span><br />
                <Link to={`/${_type}s/${slug.current}`}><a>{title}</a></Link><br />
                <span>{subtitle}</span>
                {authors ? <div><AuthorList authors={authors} /><br /></div> : null}
                {editors.length ? <div><EditorList editors={editors} /><br /></div> : null}
                { date && moment(date.local).format('DD.MM.YYYY') }

              </li>))
          }
        </ul>
      </div>
    )
  }
}
