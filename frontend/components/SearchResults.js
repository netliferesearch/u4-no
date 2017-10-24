import React, { Component } from 'react';

export default class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = { results: [] }
  }

  render() {
    return (
      <ul>
        <li>Search result</li>
      </ul>
    )
  }
}
