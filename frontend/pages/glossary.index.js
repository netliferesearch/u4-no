import React, { Component } from 'react';
import { Link } from '../routes';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';
import BEMHelper from 'react-bem-helper';

import { Footer, Layout } from '../components';

const classes = BEMHelper({
  name: 'glossary',
  prefix: 'c-',
});

const Glossary = ({ terms = [] }) => (
  <Layout className="o-wrapper">
    <div className="o-wrapper-inner o-wrapper--padded">
      <section {...classes()}>
        <h1{...classes('title')}>Glossary</h1>
        {terms.map(({ term = '', definition = '' }) =>
          (definition.length > 0 && (<div {...classes('terms')}>
            <h3{...classes('terms-term')}>{term}</h3>
            <p{...classes('terms-definition')}>{definition}</p>
          </div>)),
        )}
      </section>
    </div>
    <Footer />
  </Layout>
);

export default DataLoader(Glossary, {
  queryFunc: () => ({
    sanityQuery: `{
      "terms": *[_type == "term"] | order(term)
    }`,
  }),
  materializeDepth: 2,
});
