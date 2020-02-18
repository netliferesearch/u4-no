import React, { Component } from 'react';
import dateToString from '../helpers/dateToString';
import { Link } from '../routes';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';
import BlockContent from '@sanity/block-content-to-react';
import { BreadCrumb } from '../components/BreadCrumb';
import { BoxOnBox, Footer, Accordion, Newsletter, ServiceArticle } from '../components';
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
import { NewsAndEvents, Layout } from '../components/v2';
import { BlogAccordion } from '../components/v2/blog/BlogAccordion';
import { BlogSidebar } from '../components/v2/blog/BlogSidebar';

const BlogEntry = ({ data: { blogEntry = {} }, url = {} }) => {
  console.log('blogEntry', blogEntry);
  const {
    title = '',
    authors = [],
    date = '',
    _updatedAt = '',
    featuredImage = {},
    imageUrl = null,
    leadText = '',
    content = [],
    pdfFile = {},
    legacypdf = {},
    relatedContent = [],
    topics = [],
    keywords = [],
  } = blogEntry;
  return (
    <Layout
      headComponentConfig={{
        title,
        description: leadText,
        image: imageUrl ? imageUrl : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: {},
      }}
    >
      {console.log(blogEntry)}
      <div className="o-wrapper c-post">
      <BlogSidebar data={blogEntry} />
      <div className="c-post__post ">
        {/* <div className="c-oneColumnBox c-oneColumnBox__darkOnWhite"> */}
          <div className="o-wrapper-inner u-margin-top u-margin-bottom-large">
            <h2>{title}</h2>
            {content ? <BlockContent blocks={content} /> : null}
            <BlogAccordion />
          </div>
        {/* </div> */}
        {/* {...classes('publication-type')} */}

        {/* Reuse this component since it's identical, might need to adap the headline */}
        {/* <NewsAndEvents events={relatedContent} /> */}
      </div>
      </div>
      
    </Layout>
  );
};

export default DataLoader(BlogEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
      "blogEntry": *[_type  == "blog-post" && slug.current == $slug][0] | order(date.utc desc) {_id, _updatedAt, title, date, content, authors, standfirst, topics[]->{title}, keywords, "imageUrl": featuredImage.asset->url, "slug": slug.current, pdfFile, legacypdf},
    }`,
    param: { slug },
  }),
  materializeDepth: 2,
});
//"relatedContent":
// relatedContent[]->{ _type, _id, title, slug, publicationType->{ title }, articleType[0]->{ title }, publicationNumber, date, reference, featuredImage, topics, standfirst },
//authors[]->{_id, affiliations, email, firstName, slug, surname}
