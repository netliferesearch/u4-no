import React, { Component } from 'react';
import { Link } from '../routes';
import { Layout } from '../components';
import DataLoader from '../helpers/data-loader';

const TopicOverview = (props) => {
  const { topics = [] } = props;
  return (
    <Layout>
      <h1>U4 anti-corruption guides for development practitioners and policymakers</h1>
      <p>What you'll find: </p>
      <p>What you won't find: </p>
      <p>Why we built this: </p>
      <p>
        Need to quickly get up to speed on anti-corruption research in sustainable development? We
        want to share our knowledge by providing you with a selection of carefully crafted
        introductions and in-depth articles sorted by topics.
      </p>
      <ul>
        {sortAlphabetically(topics).map(topic => (
          <li key={topic._id}>
            <Link route={`/topics/${topic._id}`}>
              <a>{topic.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default DataLoader(TopicOverview, {
  // here you get the next context object that is initially passed into
  // getInitialProps
  queryFunc: ({ query }) => '{"topics": *[_type in ["topics"] && !(_id in path "drafts.**") ]}',
});

function sortAlphabetically(topics) {
  return topics.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    } else if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
}
