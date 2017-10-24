import React, { Component } from 'react';

export default class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = { results: [] }
  }

  render() {
    return (
      <ul>
        { this.props.results.map(res => <li><a href={`/${res._type}/${res.slug.current}`}>{res.title}</a></li>) }
      </ul>
    )
  }
}
