import React from 'react';

import { Layout, LongformArticle } from '../components';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

const GeneralArticle = ({ url = {}, content }) => (
  <Layout>
    <div className="o-wrapper o-wrapper--padded">
      <BreadCrumb url={url} />
    </div>
    <LongformArticle content={content} />
  </Layout>
);

export default DataLoader(GeneralArticle, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '*[slug.current == $slug][0]',
    param: { slug },
  }),
});
