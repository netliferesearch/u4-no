import React from 'react';
import PublicationFilters from './PublicationFilters';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'filters',
  prefix: 'c-',
});


const SearchFilters = props => (
  <div {...classes()}>
    <h2 {...classes('main-title')}>Filters</h2>
    <PublicationFilters {...props} />
  </div>
);

export default SearchFilters;
