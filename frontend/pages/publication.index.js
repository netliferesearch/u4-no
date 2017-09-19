import React from 'react';
import { Link } from '../routes';
import { Layout } from '../components';
import DataLoader from '../helpers/data-loader';
import randomKey from '../helpers/randomKey';

const PublicationOverview = ({ publications = [] }) => (
  <Layout>
    <h1>Publications</h1>
    {publications.map(({ _id = '', title = '' }) => (
      <div key={randomKey()}>
        <Link route={`/publications/${_id}`}>
          <a>{title}</a>
        </Link>
      </div>
    ))}
  </Layout>
);

export default DataLoader(PublicationOverview, {
  queryFunc: () => ({
    sanityQuery: '{ "publications": *[_type in ["publication"]][0..10000] }',
  }),
  materializeDepth: 1,
});
