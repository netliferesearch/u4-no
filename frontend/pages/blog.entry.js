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
import { DownloadPdf } from '../components/v2/blog/DownloadDropdown';
import BlogAccordion from '../components/v2/blog/BlogAccordion';

const BlogSinglePage = ({ data: { blogEntry = {} }, url = {} }) => {
  const {
    title = '',
    featuredImage = {},
    leadText = '',
    content = [],
    pdfFile = {},
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
      <div className="c-blog-single">
        <DownloadPdf pdfFile={pdfFile} />
        <div className="c-oneColumnBox c-oneColumnBox__darkOnWhite">
          <div className="o-wrapper-inner u-margin-top u-margin-bottom-large">

            <h2 className="c-longform-grid__standard">{title}</h2>
            {content ? <ServiceArticle blocks={content} /> : null}
            <BlogAccordion />
          </div>
        </div>
      
    
        {/* Reuse this component since it's identical, might need to adap the headline */}
        <NewsAndEvents events={relatedContent} />
      </div>
    </Layout>
  );
};

export default DataLoader(BlogSinglePage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
       "blogEntry": *[_type=="blog" && slug.current == $slug][0]{title, date, leadText, content, slug, relatedContent, topics, keywords, pdfFile, _id, "featuredImage": featuredImage.asset->url},
       "relatedContent":
       relatedContent[]->{ _type, _id, title, slug, publicationType->{ title }, articleType[0]->{ title }, publicationNumber, date, reference, featuredImage, topics, standfirst },
      }`,
    param: { slug },
  }),
  materializeDepth: 2,
});
