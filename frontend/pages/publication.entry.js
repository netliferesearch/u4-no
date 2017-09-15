import React, { Component } from 'react';
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
  // here you get the next context object that is initially passed into
  // getInitialProps
  queryFunc: ({ query }) => {
    const { id = '' } = query;
    const sanityQuery = `*[_id == "${id}"][0]`;
    return sanityQuery;
  },
  materializeDepth: 1,
});
