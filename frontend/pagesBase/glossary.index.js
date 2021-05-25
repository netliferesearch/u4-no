import React, { Component } from 'react';
import { Link } from '../routes';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';
import BEMHelper from 'react-bem-helper';

import { Footer, Layout, ServiceArticle } from '../components';

const classes = BEMHelper({
  name: 'glossary',
  prefix: 'c-',
});

const Glossary = ({ data: { terms = [] }, url = {} }) => (
  <Layout
    className="o-wrapper"
    headComponentConfig={{
      title: 'Glossary',
      description: '',
      url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
    }}
  >
    <div className="o-wrapper-inner o-wrapper--padded">
      <section {...classes()}>
        <h1 {...classes('title')}>Glossary</h1>
        {terms.map(({ term = '', definition = [], slug = {} }) =>
            definition.length > 0 && (
              <div {...classes('terms')}>
                <h3 {...classes('terms-term')} id={slug.current ? slug.current : ''}>
                  {term}
                </h3>
                <p {...classes('terms-definition')}>
                  {definition ? <ServiceArticle blocks={definition} /> : null}
                </p>
              </div>
            ))}
      </section>
    </div>
    <Footer />
  </Layout>
);

export default DataLoader(Glossary, {
  queryFunc: () => ({
    sanityQuery: `{
      "terms": *[_type == "term"][1..10000] | order(term)
    }`,
  }),
  materializeDepth: 2,
});
