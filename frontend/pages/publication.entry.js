import React from 'react';
import { Layout, PublicationArticle } from '../components';
import DataLoader from '../helpers/data-loader';

const PublicationEntry = props => (
  <Layout>
    {props.featuredImage &&
    props.featuredImage.asset.url && (
    <div className="c-hero">
          <img className="c-hero__image" src={props.featuredImage.asset.url} />
        </div>
      )}
    <PublicationArticle {...props} />
  </Layout>
);

export default DataLoader(PublicationEntry, {
  queryFunc: ({ query: { id = '' } }) => ({
    sanityQuery: '*[_id == $id][0]',
    projection: { id },
  }),
  materializeDepth: 1,
});
