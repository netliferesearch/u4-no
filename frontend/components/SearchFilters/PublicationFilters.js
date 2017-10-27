import React, { Component } from 'react';
import some from 'lodash/some';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import sanityClient from '../../helpers/sanity-client-config';
import { addSearchFilter, removeSearchFilter } from '../../helpers/redux-store';
import { findPublicationTypes } from './filterHelpers';
import FilterCheckBox from './FilterCheckBox';

class PublicationFilters extends Component {
  constructor(props) {
    super(props);
    this.state = { allPublicationTypes: [] };
  }
  async componentDidMount() {
    const allPublicationTypes = await sanityClient.fetch('*[_type in ["publicationType"]]');
    this.setState({ allPublicationTypes });
  }
  render() {
    const { results = [] } = this.props;
    const publicationTypesInResults = findPublicationTypes(results);
    return (
      <div>
        {this.state.allPublicationTypes.length === 0 && <span>Loading ...</span>}
        {this.state.allPublicationTypes.map(({ _id, title }) => (
          <FilterCheckBox
            key={_id}
            publicationType={{ _id, title }}
            results={results}
            {...this.props}
            disabled={!some(publicationTypesInResults, resultPub => resultPub._id === _id)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  addSearchFilter: bindActionCreators(addSearchFilter, dispatch),
  removeSearchFilter: bindActionCreators(removeSearchFilter, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicationFilters);
