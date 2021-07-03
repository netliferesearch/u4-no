import React, { Component } from 'react';
import slugify from 'slugify';
import DataLoader from '../../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers';

import Image from 'next/image';
import sanityImageLoader from '../../components/sanityImageLoader';

import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Newsletter from '../../components/Newsletter';
import ServiceArticle from '../../components/ServiceArticle';
import LinkList from '../../components/LinkList';

const ServicePage = ({ data: { service = {}, url = {} } }) => {
  const {
    title = '',
    longTitle = '',
    featuredImage = {},
    lead = '',
    leadLinks,
    relatedUrl = {},
    sections,
  } = service;
  return (
    <Layout
      headComponentConfig={{
        title,
        description: lead.length ? lead[0].text : lead,
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
      }}
    >
      <h2
        id={slugify(title, { lower: true, remove: /[$*_+~.()'"!\-:@]/g })}
        className="c-topic-page_title"
      >
        {title}
      </h2>
      <h2
        id={slugify(longTitle, { lower: true, remove: /[$*_+~.()'"!\-:@]/g })}
        className="c-topic-page__longTitle"
      >
        {longTitle}
      </h2>
      {featuredImage ? (
        <section className="c-boxOnImage">
          <figure className="c-boxOnImage__figure">
            <Image
              loader={sanityImageLoader}
              src={featuredImage}
              alt=""
              layout="fill"
              objectFit="cover"
              priority="true"
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
};
export default DataLoader(ServicePage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery:
      '{ "service": *[_type == "frontpage" && slug.current == "workshops-and-events"][0]{title, longTitle, slug, lead, leadLinks, _id, sections, "featuredImage": featuredImage.asset->url}}',
    param: { slug },
  }),
  materializeDepth: 1,
});
