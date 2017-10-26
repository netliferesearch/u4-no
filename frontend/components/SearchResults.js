import React, { Component } from 'react';
import { Link } from '../routes';
import BEMHelper from 'react-bem-helper';

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
              .map(({ _id, _type, slug = {}, title, subtitle = false, authors = false, editors = false }) => (<li {...classes('items')} key={_id}>
                <span>{_type}</span><br />
                <Link to={`/${_type}s/${slug.current}`}><a>{title}</a></Link><br />
                <span>{subtitle}</span>
                {
                  console.log(authors)
                }
                {
                  authors && authors.map(author => author.name)
                }
                {
                  editors && editors.map(editor => editor.name)
                }

              </li>))
          }
        </ul>
      </div>
    )
  }
}
