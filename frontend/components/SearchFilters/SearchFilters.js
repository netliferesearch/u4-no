import React, { Component } from 'react';
import PublicationFilters from './PublicationFilters';
import PublicationTopicFilters from './PublicationTopicFilters';
import PublicationYearFilters from './PublicationYearFilters';
import PublicationLanguageFilters from './PublicationLanguageFilters';
import PublicationAuthorsFilters from './PublicationAuthorsFilters';
import BEMHelper from 'react-bem-helper';

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

export default function SearchFilters(props) {
  const { results } = props;
  const { ...rest } = props;
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
