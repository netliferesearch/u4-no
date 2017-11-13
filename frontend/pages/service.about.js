import React, { Component } from 'react';
import { Link } from '../routes';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';

import { BoxOnBox, Footer, Layout, ExtendedBlockContent, Accordion, Newsletter, ServiceArticle } from '../components';
import { Feature, Mosaic, LinkBox, SimpleHero } from '../components';
import { DownArrowButton, RightArrowButton } from '../components/buttons';
import { Basics, Picture, Publication, Resources, ResearchAgenda, ArrowRight } from '../components/icons';

const About = ({
  about = { title: '', longTitle: '', featuredImage: {}, lead: '', sections: '' },
}) => (
  <Layout>
    {console.log(about)}
    {about.lead &&
      <SimpleHero light title={about.title} content={about.lead} />
    }

    { about.sections ?
      <ServiceArticle
        blocks={about.sections}
      />
      : null}

    <Newsletter />

    <Footer />
  </Layout>
);
export default DataLoader(About, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '{ "about": *[slug.current == "about-u4"][0]{title, slug, lead, _id, "sections": sections, "featuredImage": featuredImage.asset->url}}',
    param: { slug },
  }),
  materializeDepth: 3,
});

