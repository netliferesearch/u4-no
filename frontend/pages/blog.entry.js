import React, { Component } from 'react';
import dateToString from '../helpers/dateToString';
import { Link } from '../routes';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';
import BlockContent from '@sanity/block-content-to-react';

import { BoxOnBox, Footer, Layout, Accordion, Newsletter, ServiceArticle } from '../components';
import { Feature, Mosaic, LinkBox, LinkList, Team } from '../components';
import { DownArrowButton, RightArrowButton } from '../components/buttons';
import {
  Basics,
  Picture,
  Publication,
  Resources,
  ResearchAgenda,
  ArrowRight,
} from '../components/icons';
import { NewsAndEvents } from '../components/v2';

const BlogSinglePage = ({ data: { blogEntry = {} }, url = {} }) => {
  const {
    title = '',
    eventType = '',
    location = '',
    startDate = {},
    endDate = {},
    organiser = '',
    featuredImage = {},
    leadText = '',
    content = [],
    eventLink = {},
    contact = [],
    relatedContent = [],
    topics = [],
    keywords = [],
  } = blogEntry;
  return (
    <Layout
      headComponentConfig={{
        title,
        description: leadText,
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: {},
      }}
    >
      {/* Download pdf for the sidebar is available in other branch */}
      {/* THe pdf itself is not yet set up */}
      <div className="c-oneColumnBox c-oneColumnBox__darkOnWhite">
        <div className="o-wrapper-inner u-margin-top u-margin-bottom-large">

          <h2 className="c-longform-grid__standard">{title}</h2>
          {content ? <ServiceArticle blocks={content} /> : null}
          {/* TAGS, TOPICS, etc. section is available in other branch */}
        </div>
      </div>
    
      {/* Reuse this component since it's identical, might need to adap the headline */}
      <NewsAndEvents events={relatedContent} />
      <Footer />
    </Layout>
  );
};

export default DataLoader(BlogSinglePage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
       "blogEntry": *[_type=="blog" && slug.current == $slug][0]{title, startDate, endDate, leadText, content, slug, relatedContent, topics, keywords,  _id, "featuredImage": featuredImage.asset->url}}`,
    param: { slug },
  }),
  materializeDepth: 5,
});
