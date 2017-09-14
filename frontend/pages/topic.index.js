import React from 'react';
import { sortBy } from 'lodash';
import { Link } from '../routes';
import { Layout } from '../components';
import DataLoader from '../helpers/data-loader';

function sortTopcis(items, key) {
  console.log(items.filter(e => e))
  return sortBy(items, [key]);
}
const TopicOverview = ({ topics = []}) => (
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
    {sortTopcis(topics, 'title').map(({ _id = false, title = false, featuredImage }) => (
      <div
        key={_id}
        style={{
          height: 200,
          backgroundImage: featuredImage && `url(${featuredImage.asset.url})`,
        }}
      >
        <Link route={`/topics/${_id}`}>
          <a>{title}</a>
        </Link>
      </div>
    ))}
  </Layout>
);

export default DataLoader(TopicOverview, {
  // here you get the next context object that is initially passed into
  // getInitialProps
  queryFunc: ({ query }) => '{"topics": *[_type in ["topics"] && !(_id in path "drafts.**") ]}',
  materialize: 5,
});
