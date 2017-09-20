import React from 'react';
import { Layout } from '../components';
import DataLoader from '../helpers/data-loader';

const TopicArticle = props => (
  <Layout>
    {props.featuredImage &&
      props.featuredImage.asset.url && (
        <div className="c-hero">
          <img className="c-hero__image" src={props.featuredImage.asset.url} />
        </div>
      )}
    <TopicArticle {...props} />
  </Layout>
);

export default DataLoader(TopicArticle, {
  queryFunc: ({ query: { id = '' } }) => ({
    sanityQuery: '*[_id == $id][0]',
    projection: { id },
  }),
  materializeDepth: 1,
});
