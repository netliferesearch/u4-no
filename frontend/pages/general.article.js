import React from 'react';

import { Layout, LongformArticle, Footer } from '../components';
import BreadCrumb from '../components/BreadCrumb';
import DataLoader from '../helpers/data-loader';

const GeneralArticle = ({
  explainerText = 'has no explainer text',
  longTitle = 'has no long title',
  url = {},
  content,
  advisors = [],
}) => (
  <Layout>
    <div className="o-wrapper o-wrapper--padded">
      <BreadCrumb url={url} />
      <div className="c-article c-longform-grid">
        <div className="c-longform-grid__standard">
          <h1>{longTitle}</h1>
          <p>{explainerText}</p>
        </div>
      </div>
      <LongformArticle content={content} advisors={advisors} />
    </div>
    <Footer />
  </Layout>
);

export default DataLoader(GeneralArticle, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '*[slug.current == $slug][0]',
    param: { slug },
  }),
});
