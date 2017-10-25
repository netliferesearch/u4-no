import React, { Component } from 'react';

export default class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = { results: [] }
  }

  render() {
    return (
      <ul>
        {this.props.results.map(({ _type, slug, title }) => <li>
          {
            slug ?
              <a href={`/${_type}/${slug.current}`}>{title}</a>
            : title
          }

        </li>)}
      </ul>
    )
  }
}
