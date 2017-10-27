import React, { Component } from 'react';
import uniqBy from 'lodash/uniqBy';
import some from 'lodash/some';
import slugify from 'slugify';

import sanityClient from '../../helpers/sanity-client-config';

const findPublications = results => results.filter(({ _type }) => _type === 'publication');

/**
 * Find unique publication types in the list of current search results
 * @param  {Array} results list of sanity documents
 * @return {Array}         publicationTypes
 */
const findPublicationTypes = (results) => {
  const publications = findPublications(results);
  return (
    // create a publication list with unique publication titles
    uniqBy(publications, ({ publicationType = {} }) => publicationType.title)
      // create list of only publication title
      .map(({ publicationType = {} }) => ({
        title: publicationType.title,
        _id: publicationType._id,
      }))
      // remove publicationType with no title
      .filter(({ title }) => !!title)
  );
};

const CheckBox = ({ publicationType, disabled = false, results = [] }) => {
  const numResultsIfFiltered = findPublications(results).filter(
    resPub => resPub.publicationType._id === publicationType._id,
  ).length;
  return (
    <div>
      <label htmlFor={publicationType.title}>
        <input
          disabled={disabled}
          type="checkbox"
          name={publicationType.title}
          value={slugify(publicationType.title, { lower: true })}
        />
        {publicationType.title} ({numResultsIfFiltered})
      </label>
    </div>
  );
};

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
          <CheckBox
            key={_id}
            publicationType={{ _id, title }}
            results={results}
            disabled={!some(publicationTypesInResults, resultPub => resultPub._id === _id)}
          />
        ))}
      </div>
    );
  }
}

export default PublicationFilters;
