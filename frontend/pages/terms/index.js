import React, { Component } from 'react';
import DataLoader from '../../helpers/data-loader';
import BEMHelper from 'react-bem-helper';

import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import ServiceArticle from '../../components/ServiceArticle';

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
        {terms.map(
          ({ term = '', definition = [], slug = {} }) =>
            definition.length > 0 && (
              <div {...classes('terms')} key={slug.current}>
                <h3 {...classes('terms-term')} id={slug.current ? slug.current : ''}>
                  {term}
                </h3>
                <p {...classes('terms-definition')}>
                  {definition ? <ServiceArticle blocks={definition} /> : null}
                </p>
              </div>
            )
        )}
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
