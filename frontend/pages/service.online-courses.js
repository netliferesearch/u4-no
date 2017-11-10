import React, { Component } from 'react';
import { Link } from '../routes';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';

import { BoxOnBox, Footer, Layout, ExtendedBlockContent, Accordion, Newsletter, ServiceArticle } from '../components';
import { Feature, Mosaic, LinkBox, LinkList } from '../components';
import { DownArrowButton, RightArrowButton } from '../components/buttons';
import { Basics, Picture, Publication, Resources, ResearchAgenda, ArrowRight } from '../components/icons';

const ServicePage = ({
  service = {},
}) => (
  <Layout>
    <h2
      className="c-topic-page_title"
    >
      {service.title}
    </h2>
    <h2
      className="c-topic-page__longTitle"
    >
      {service.longTitle}
    </h2>
    {service.featuredImage ?
      <section
        className="c-boxOnImage"
      >
        <figure
          className="c-boxOnImage__figure"
        >
          <img
            alt=""
            src={service.featuredImage}
          />
        </figure>
        <div
          className="c-boxOnImage__body"
        >
          <p
            className="c-boxOnImage__lead"
          >
            We facilitate local dialouge
          </p>
          {service.lead.split('\n').map(i => <p>{i}</p>)}
          {service.leadLinks && <LinkList title="" content={service.leadLinks} />}
        </div>
      </section>
      : null
    }

    <ServiceArticle
      blocks={service.sections}
    />

    <Newsletter />

    <Footer />
  </Layout>
);
export default DataLoader(ServicePage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '{ "service": *[slug.current == "online-courses"][0]{title, longTitle, slug, lead, leadLinks, _id, sections, "featuredImage": featuredImage.asset->url}}',
    param: { slug },
  }),
  materializeDepth: 3,
});

