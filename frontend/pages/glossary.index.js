import React, { Component } from 'react';
import { Link } from '../routes';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';

import { BoxOnBox, Footer, Layout, ExtendedBlockContent, Accordion, LinkList, Newsletter } from '../components';
import { Feature, Mosaic, LinkBox } from '../components';
import { DownArrowButton, RightArrowButton } from '../components/buttons';
import { Basics, Picture, Publication, Resources, ResearchAgenda, ArrowRight } from '../components/icons';


const Glossary = ({
  terms: {
    definition = '',
    term = '',
  },
}) => (
  <Layout>
    {terms.map(term => term.term)}

    <Footer />
  </Layout>
);

export default DataLoader(Glossary, {
  queryFunc: () => ({
    sanityQuery: '{ "terms": *[_type == "term"]}',
  }),
});
