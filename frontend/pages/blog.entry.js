import React, { Component } from 'react';
import serializers from '../components/serializers';
import DataLoader from '../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import { NewsAndEvents, Layout } from '../components/v2';
import { BlogAccordion } from '../components/v2/blog/BlogAccordion';
import { BlogSidebar } from '../components/v2/blog/BlogSidebar';
import { TagsSection } from '../components/v2/TagsSection';
import { BreadCrumbV2 } from '../components/v2/BreadCrumbV2'
// import dateToString from '../helpers/dateToString';
// import { Link } from '../routes';
// import Head from 'next/head';
// import { BoxOnBox, Footer, Accordion, Newsletter, ServiceArticle } from '../components';
// import { Feature, Mosaic, LinkBox, LinkList, Team } from '../components';
// import { DownArrowButton, RightArrowButton } from '../components/buttons';
// import {
//   Basics,
//   Picture,
//   Publication,
//   Resources,
//   ResearchAgenda,
//   ArrowRight,
// } from '../components/icons';

const BlogEntry = ({ data: { blogEntry = {} }, url = {} }) => {
  console.log('blogEntry', blogEntry);
  const {
    title = '',
    authors = [],
    date = '',
    _updatedAt = '',
    featuredImage = {},
    imageUrl = null,
    standfirst = '',
    lead = '',
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
        description: lead || standfirst,
        image: imageUrl ? imageUrl : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: {},
      }}
    >
      {console.log('relatedContent', relatedContent)}
      <BreadCrumbV2 title={'Blog'} parentSlug={'blog'}/>
      <div className="o-wrapper c-blog-post">
        <BlogSidebar data={blogEntry} />
        <div className="c-blog-post__post ">
          {/* <div className="c-oneColumnBox c-oneColumnBox__darkOnWhite"> */}
          <div className="o-wrapper-inner u-margin-top u-margin-bottom-large">
            <div>
              <h2>{title}</h2>
              {lead && <p>{lead}</p>}
              {topics &&
                topics.map((topic, index) => (
                  <span className="topic" key={index}>
                    {topic.title}
                  </span>
                ))}
            </div>
            {content ? <BlockContent blocks={content} serializers={serializers} /> : null}
            {topics || keywords ? <TagsSection topics={topics} keywords={keywords} /> : null}
            <BlogAccordion />
          </div>
          {relatedContent ? <NewsAndEvents events={relatedContent} /> : null}
        </div>
      </div>
    </Layout>
  );
};

export default DataLoader(BlogEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
      "blogEntry": *[_type  == "blog-post" && slug.current == $slug][0] | order(date.utc desc) {_id, _updatedAt, title, date, content, authors, lead, standfirst, topics[]->{title}, keywords[]->{category, keyword}, "imageUrl": featuredImage.asset->url, "slug": slug.current, pdfFile, legacypdf,
      "relatedContent": relatedContent[]->{_type, title, startDate, lead, "slug": slug.current, topics[]->{title}}[0..2]}
    }`,
    param: { slug },
  }),
  materializeDepth: 2,
});
