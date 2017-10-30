import React, { Component } from 'react';
import PublicationFilters from './PublicationFilters';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'filters',
  prefix: 'c-',
});

export default class SearchFilters extends Component {
  constructor(props) {
    super(props);
  }

  toggle() {
    document.getElementsByClassName('c-filters')[0].classList.toggle('c-filters--open');
  }

  render() {
    const { results, ...rest } = this.props;
    return (
      <div {...classes()}>
        <button onClick={this.toggle} {...classes('topbar-filter')}>Update search</button>
        <h2 {...classes('main-title')}>Filters</h2>
        <PublicationFilters results={results} {...rest} />
      </div>

    );
  }
}
