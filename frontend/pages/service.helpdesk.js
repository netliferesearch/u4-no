import React, { Component } from 'react';
import { Link } from '../routes';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';

import { BoxOnBox, Footer, Layout, Accordion, Newsletter, ServiceArticle } from '../components';
import { Feature, Mosaic, LinkBox, SimpleHero } from '../components';
import { DownArrowButton, RightArrowButton } from '../components/buttons';
import {
  Basics,
  Picture,
  Publication,
  Resources,
  ResearchAgenda,
  ArrowRight,
} from '../components/icons';

const ServicePage = ({ service = {}, url = {} }) => {
  const {
    title = '',
    longTitle = '',
    featuredImage = {},
    lead = '',
    sections = [],
    relatedUrl = {},
  } = service;
  return (
    <Layout
      headComponentConfig={{
        title,
        description: lead,
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `beta.u4.no${url.asPath}` : '',
        ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
      }}
    >
      <SimpleHero title={title} content={longTitle} cta />

      <ServiceArticle blocks={sections} />
      <Newsletter />

      <Footer />
    </Layout>
  );
};
export default DataLoader(ServicePage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery:
      '{ "service": *[_type == "frontpage" && slug.current == "helpdesk"][0]{title, longTitle, slug, lead, _id, "sections": sections, "featuredImage": featuredImage.asset->url}}',
    param: { slug },
  }),
  materializeDepth: 5,
});
