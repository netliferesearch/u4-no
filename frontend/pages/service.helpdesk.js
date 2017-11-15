import React, { Component } from 'react';
import { Link } from '../routes';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';

import { BoxOnBox, Footer, Layout, ExtendedBlockContent, Accordion, Newsletter, ServiceArticle } from '../components';
import { Feature, Mosaic, LinkBox, SimpleHero } from '../components';
import { DownArrowButton, RightArrowButton } from '../components/buttons';
import { Basics, Picture, Publication, Resources, ResearchAgenda, ArrowRight } from '../components/icons';

const ServicePage = ({
  service = {},
}) => (
  <Layout>

    <SimpleHero title={service.title} content={service.longTitle} cta />

    <ServiceArticle
      blocks={service.sections}
    />
    <Newsletter />

    <Footer />
  </Layout>
);
export default DataLoader(ServicePage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '{ "service": *[slug.current == "helpdesk"][0]{title, longTitle, slug, lead, _id, "sections": sections, "featuredImage": featuredImage.asset->url}}',
    param: { slug },
  }),
  materializeDepth: 4,
});

