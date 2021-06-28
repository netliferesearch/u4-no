import React, { Component } from 'react';
import DataLoader from '../../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers';

import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Newsletter from '../../components/Newsletter';
import ServiceArticle from '../../components/ServiceArticle';

import LinkList from '../../components/LinkList';

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
      description: lead.length ? lead[0].text : lead,
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
          <img
            alt=""
            src={`${featuredImage}?w=1600&q=80`}
            srcSet={`${featuredImage}?w=500&q=70 500w, ${featuredImage}?w=800&q=75 800w, ${featuredImage}?w=1600&q=80 1600w, ${featuredImage}?w=2400&q=80 2400w`}
            sizes="90vw"
          />
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
