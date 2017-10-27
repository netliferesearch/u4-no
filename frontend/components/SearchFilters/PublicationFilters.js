import React, { Component } from 'react';
import uniqBy from 'lodash/uniqBy';

/**
 * Find unique publication types in the list of current search results
 * @param  {Array} results list of sanity documents
 * @return {Array}         publicationTypes
 */
const findPublicationTypes = (results) => {
  const publications = results.filter(({ _type }) => _type === 'publication');
  return (
    // create a publication list with unique publication titles
    uniqBy(publications, ({ publicationType = {} }) => publicationType.title)
      // create list of only publication title
      .map(({ publicationType = {} }) => publicationType.title)
      // remove publicationType with no title
      .filter(title => !!title)
  );
};

const CheckBox = publicationTypeTitle => (
  <div>
    <label htmlFor={publicationTypeTitle}>
      <input type="checkbox" name={publicationTypeTitle} value="value" />
      {publicationTypeTitle}
    </label>
  </div>
);

const PublicationFilters = ({ results = [] }) => (
  <div>{findPublicationTypes(results).map(CheckBox)}</div>
);

export default PublicationFilters;
