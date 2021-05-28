import React, { Component } from 'react';
import Link from 'next/link';
import sanityClient from '@sanity/client';
import DataLoader from '../../helpers/data-loader';
import Head from 'next/head';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers';

import { BoxOnBox, Footer, Layout, Accordion, Newsletter, ServiceArticle } from '../../components';
import { Feature, Mosaic, LinkBox, LinkList } from '../../components';
import { DownArrowButton, RightArrowButton } from '../../components/buttons';
import {
  Basics,
  Picture,
  Publication,
  Resources,
  ResearchAgenda,
  ArrowRight,
} from '../../components/icons';

const ServicePage = ({
  data: {
    service: {
      title = '',
      longTitle = '',
      featuredImage = '',
      lead = [],
      leadLinks = '',
      sections = [],
      relatedUrl = {},
    } = {},
  } = {},
  url = {},
}) => (
  <Layout
    headComponentConfig={{
      title,
      description: lead,
      image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
      url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
      ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
    }}
  >
    <h2 className="c-topic-page_title">{title}</h2>
    <h2 className="c-topic-page__longTitle">{longTitle}</h2>
    {featuredImage ? (
      <section className="c-boxOnImage">
        <figure className="c-boxOnImage__figure">
          <img alt="" src={featuredImage} />
        </figure>
        <div className="c-boxOnImage__body">
          <BlockContent blocks={lead} serializers={serializers} />
          {leadLinks && <LinkList title="" content={leadLinks} />}
        </div>
      </section>
    ) : null}

    <ServiceArticle blocks={sections} />

    <Newsletter />

    <Footer />
  </Layout>
);
export default DataLoader(ServicePage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery:
      '{ "service": *[_type=="frontpage" && slug.current == "online-courses"][0]{title, longTitle, slug, lead, leadLinks, _id, sections, "featuredImage": featuredImage.asset->url}}',
    param: { slug },
  }),
  materializeDepth: 2,
});
