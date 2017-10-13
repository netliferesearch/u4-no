import React from 'react';
import { Link } from '../routes';
import { Layout } from '../components';
import DataLoader from '../helpers/data-loader';
import randomKey from '../helpers/randomKey';

const PublicationOverview = ({ publications = [] }) => (
  <Layout>
    <div className="o-wrapper-inner">
      <h1 className="c-topic-page_longTitle u-margin-bottom-huge">Publications</h1>
      {publications.map(({ slug = {}, title = '' }) => (
        <div className="c-duo__item" key={randomKey()}>
          <div className="c-duo__body">
            <h2 className="c-duo__title">
              <Link route="publication.entry" params={{ slug: slug.current || 'no-slug-defined' }}>
                <a className="c-duo__link">{title}</a>
              </Link>
            </h2>
          </div>
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
