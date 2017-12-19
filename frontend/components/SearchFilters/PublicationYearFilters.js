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

export default class PublicationTopicFilters extends Component {
  constructor(props) {
    super(props);
    this.state = { allTopics: [] };
  }
  async componentDidMount() {
    const allTopics = await sanityClient.fetch('*[_type in ["topics"]]');
    this.setState({ allTopics });
  }
  render() {
    const { results = [] } = this.props;
    const publicationsInResult = findPublications(results);
    const findYearsInPublications = sortBy(
      uniq(publicationsInResult.map(getPubYear)),
      year => year,
    ).reverse();
    return (
      <div {...classes('item')}>
        <h3 {...classes('title')}>Publication year</h3>
        {this.state.allTopics.length === 0 && <span>Loading ...</span>}
        {findYearsInPublications.map(year => (
          <FilterCheckBox
            key={year}
            id={slugify(`pub-year-${year}`, { lower: true })}
            title={year}
            {...classes('checkbox')}
            results={results}
            numResultsIfFiltered={
              publicationsInResult.filter(pub => getPubYear(pub) === year).length
            }
            {...this.props}
            disabled={!some(publicationsInResult, pub => getPubYear(pub) === year)}
          />
        ))}
      </div>
    );
  }
}
