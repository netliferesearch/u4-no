import React, { Component } from 'react';
import { Layout, Article } from '../components';
import DataLoader from '../helpers/data-loader';

const PublicationEntry = props => (
  <Layout>
    <div className="c-hero">
      {props.featuredImage && <img className="c-hero__image" src={props.featuredImage.asset.url} />}
    </div>
    <Article {...props} />
  </Layout>
);

export default DataLoader(PublicationEntry, {
  // here you get the next context object that is initially passed into
  // getInitialProps
  queryFunc: ({ query }) => {
    const { publication = '' } = query;
    const sanityQuery = `*[_id == "${publication}"][0]`;
    return sanityQuery;
  },
});
