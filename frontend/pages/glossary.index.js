import React, { Component } from 'react';
import { Link } from '../routes';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';

import { BoxOnBox, Footer, Layout, ExtendedBlockContent, Accordion, LinkList, Newsletter } from '../components';


const Glossary = ({
  terms = {},
}) => (
  <Layout>
    <div>
      {terms.map(term => term.term)}
      <Footer />
    </div>
  </Layout>
);

export default DataLoader(Glossary, {
  queryFunc: () => ({
    sanityQuery: `{
      "terms": *[_type == "term"]
    }`,
  }),
  materializeDepth: 2,
});
