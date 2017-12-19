import React, { Component } from 'react';
import PublicationFilters from './PublicationFilters';
import PublicationTopicFilters from './PublicationTopicFilters';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'filters',
  prefix: 'c-',
});

export default class SearchFilters extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [] };
  }

  toggle() {
    document.getElementsByClassName('c-filters')[0].classList.toggle('c-filters--open');
  }

  render() {
    const { results } = this.props;
    const { ...rest } = this.props;
    return (
      <div {...classes()}>
        <div {...classes('wrapper')}>
          <div {...classes('topbar')}>
            <h3 {...classes('topbar-result')}>Results ({results.length})</h3>
            <button onClick={this.toggle} {...classes('topbar-filter')}>
              Update search
            </button>
          </div>
          <h2 {...classes('main-title')}>Filters</h2>
          <PublicationFilters {...rest} />
          <PublicationTopicFilters {...rest} />
        </div>
      </div>
    );
  }
}
