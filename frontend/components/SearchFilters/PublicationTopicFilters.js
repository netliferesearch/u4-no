import React, { Component } from 'react';
import some from 'lodash/some';
import slugify from 'slugify';
import BEMHelper from 'react-bem-helper';
import uniqBy from 'lodash/uniqBy';
import flatten from 'lodash/flatten';

import sanityClient from '../../helpers/sanity-client-config';
import { findPublications } from './searchHelpers';
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
  async componentDidMount() {}
  render() {
    const { results = [] } = this.props;
    const publicationsInResult = findPublications(results);
    const publicationTopicsInResults = uniqBy(
      flatten(publicationsInResult.map(({ topics = [] }) => topics)).filter(
        ({ _id = false }) => _id,
      ),
      ({ _id }) => _id,
    );
    console.log(publicationTopicsInResults);
    return (
      <div {...classes('item')}>
        <h3 {...classes('title')}>Publication topics</h3>
        {publicationTopicsInResults.map((topic = {}) => (
          <FilterCheckBox
            key={topic._id}
            id={`pub-topic-${topic.slug.current}`}
            title={topic.title}
            {...classes('checkbox')}
            results={results}
            numResultsIfFiltered={numberIfFiltered({ publicationsInResult, topic })}
            {...this.props}
          />
        ))}
      </div>
    );
  }
}

function numberIfFiltered({ publicationsInResult, topic }) {
  return publicationsInResult.filter((pub) => {
    const { topics = [] } = pub;
    return topics.find((topicInList) => {
      if (topicInList) {
        return topicInList._id === topic._id;
      }
      return false;
    });
  }).length;
}
