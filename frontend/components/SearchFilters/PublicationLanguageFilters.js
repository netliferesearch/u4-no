import React, { Component } from 'react';
import some from 'lodash/some';
import BEMHelper from 'react-bem-helper';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import slugify from 'slugify';
import sanityClient from '../../helpers/sanity-client-config';
import { findPublications, getPubYear } from './searchHelpers';
import FilterCheckBox from './FilterCheckBox';

const classes = BEMHelper({
  name: 'filters',
  prefix: 'c-',
});

export default class PublicationLanguageFilters extends Component {
  constructor(props) {
    super(props);
    this.state = { allTopics: [] };
  }
  async componentDidMount() {}
  render() {
    const { results = [] } = this.props;
    const publicationsInResult = findPublications(results);
    // copied from languages.js in backend/schema/
    const languages = [
      { title: 'English', value: 'en_US' },
      { title: 'French', value: 'fr_FR' },
      { title: 'Spanish', value: 'es_ES' },
      { title: 'German', value: 'de_DE' },
      { title: 'Portuguese', value: 'pt_PT' },
      { title: 'Russian', value: 'ru_RU' },
      { title: 'Ukranian', value: 'uk_UA' }, // <-- predefined values
    ];
    return (
      <div {...classes('item')}>
        <h3 {...classes('title')}>Publication languages</h3>
        {languages.map(({ title, value }) => (
          <FilterCheckBox
            key={value}
            id={slugify(`pub-lang-${value}`)}
            title={title}
            {...classes('checkbox')}
            results={results}
            numResultsIfFiltered={
              publicationsInResult.filter(({ language = '' }) => language === value).length
            }
            {...this.props}
            disabled={!some(publicationsInResult, ({ language = '' }) => language === value)}
          />
        ))}
      </div>
    );
  }
}
