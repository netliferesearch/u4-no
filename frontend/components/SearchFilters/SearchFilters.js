import React, { Component } from 'react';
import BEMHelper from 'react-bem-helper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearAllSearchFilters } from '../../helpers/redux-store';
import PublicationFilters from './PublicationFilters';
import PublicationTopicFilters from './PublicationTopicFilters';
import PublicationYearFilters from './PublicationYearFilters';
import PublicationLanguageFilters from './PublicationLanguageFilters';
import PublicationAuthorsFilters from './PublicationAuthorsFilters';

const classes = BEMHelper({
  name: 'filters',
  prefix: 'c-',
});

function toggle() {
  if (document) {
    document.querySelector('.c-filters').classList.toggle('c-filters--open');
    document.querySelector('html').classList.toggle('u-overflow-hidden');
  }
}

class SearchFilters extends Component {
  componentWillUnmount() {
    if (this.props.clearAllSearchFilters) {
      this.props.clearAllSearchFilters();
    }
  }

  render() {
    const { results } = this.props;
    const { ...rest } = this.props;
    return (
      <div {...classes()}>
        <div {...classes('wrapper')}>
          <div {...classes('topbar')}>
            <h3 {...classes('topbar-result')}>Results ({results.length})</h3>
            <button onClick={toggle} {...classes('topbar-filter')}>
              Update search
            </button>
          </div>
          <h2 {...classes('main-title')}>Filters</h2>
          <PublicationFilters {...rest} />
          <PublicationLanguageFilters {...rest} />
          <PublicationTopicFilters {...rest} />
          <PublicationYearFilters {...rest} />
          <PublicationAuthorsFilters {...rest} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  clearAllSearchFilters: bindActionCreators(clearAllSearchFilters, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchFilters);
