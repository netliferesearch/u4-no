import React, { Component } from 'react';
import some from 'lodash/some';

import slugify from 'slugify';
import BEMHelper from 'react-bem-helper';

import sanityClient from '../../helpers/sanity-client-config';

import { findPublicationTypes, findPublications } from './filterHelpers';
import FilterCheckBox from './FilterCheckBox';

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
        {this.state.allPublicationTypes.length === 0 && <span>Loading ...</span>}
        {this.state.allPublicationTypes &&
           this.state.allPublicationTypes.map((pub = {}) => (
             <FilterCheckBox
               key={pub._id}
               id={slugify(`pub-type-${pub.title}`, { lower: true })}
               title={pub.title}
               {...classes('checkbox')}
               results={results}
               numResultsIfFiltered={
                 findPublications(results).filter(resPub => resPub.publicationType._id === pub._id)
                   .length
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
