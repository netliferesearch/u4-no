import React, { Component } from 'react';
import some from 'lodash/some';
import slugify from 'slugify';
import BEMHelper from 'react-bem-helper';
import uniqBy from 'lodash/uniqBy';
import flatten from 'lodash/flatten';
import sortBy from 'lodash/sortBy';

import sanityClient from '../../helpers/sanity-client-config';
import { findPublications, isAuthorInPublication } from './searchHelpers';
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
    const authorsInResults = sortBy(
      uniqBy(
        flatten(publicationsInResult.map(({ authors = [] }) => authors)).filter(author => author),
        ({ _id }) => _id,
      ),
      ({ firstName, surname }) => `${surname}, ${firstName}`,
    );
    return (
      <div {...classes('item')}>
        <h3 {...classes('title')}>Publication authors</h3>
        {this.state.allTopics.length === 0 && <span>Loading ...</span>}
        {authorsInResults.map((author = {}) => (
          <FilterCheckBox
            key={author._id}
            id={slugify(`pub-author-${author.surname}-${author.firstName}`, { lower: true })}
            title={`${author.surname}, ${author.firstName}`}
            {...classes('checkbox')}
            results={results}
            numResultsIfFiltered={numberIfFiltered({ publicationsInResult, author })}
            {...this.props}
            disabled={
              !some(publicationsInResult, publication =>
                isAuthorInPublication({ publication, author }))
            }
          />
        ))}
      </div>
    );
  }
}

function numberIfFiltered({ publicationsInResult, author }) {
  return publicationsInResult.filter(publication => isAuthorInPublication({ author, publication }))
    .length;
}
