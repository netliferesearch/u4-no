import React from 'react';
import { Link } from '../routes';
import { Layout } from '../components';
import DataLoader from '../helpers/data-loader';
import randomKey from '../helpers/randomKey';

const PublicationOverview = ({ publications = [] }) => (
  <Layout>
    <div className="o-wrapper">
      <h1>Publications</h1>
      {publications.map(({ slug = {}, title = '' }) => (
        <div key={randomKey()}>
          <Link route="publication.entry" params={{ slug: slug.current || 'no-slug-defined' }}>
            <a>{title}</a>
          </Link>
        </div>
      ))}
    </div>
  </Layout>
);

export default DataLoader(PublicationOverview, {
  queryFunc: () => ({
    sanityQuery: '{ "publications": *[_type in ["publication"]][0..10000] }',
  }),
});
