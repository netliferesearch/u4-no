import React, { Component } from 'react';
import some from 'lodash/some';

import slugify from 'slugify';

import sanityClient from '../../helpers/sanity-client-config';

import { findPublicationTypes, findPublications } from './searchHelpers';
import FilterCheckBox from './FilterCheckBox';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'filters',
  prefix: 'c-',
});

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
      <div {...classes('item')}>
        <h3 {...classes('title')}>Publication type</h3>
        {this.state.allPublicationTypes.length === 0 && <span>Loading ...</span>}
        {this.state.allPublicationTypes.map((pub = {}) => (
          <FilterCheckBox
            key={pub._id}
            id={slugify(`pub-type-${pub._id}`, { lower: true })}
            title={pub.title}
            {...classes('checkbox')}
            results={results}
            numResultsIfFiltered={
              findPublications(results).filter(
                ({ publicationType = {} }) => publicationType._id === pub._id,
              ).length
            }
            {...this.props}
            disabled={!some(publicationTypesInResults, resultPub => resultPub._id === pub._id)}
          />
        ))}
      </div>
    );
  }
}

export default PublicationFilters;
