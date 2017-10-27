import React from 'react';
import PublicationFilters from './PublicationFilters';

const SearchFilters = props => (
  <div>
    <h2>Filters</h2>
    <PublicationFilters {...props} />
  </div>
);

export default SearchFilters;
