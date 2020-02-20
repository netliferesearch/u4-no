import React, { Component } from 'react';
import serializers from '../components/serializers';
import DataLoader from '../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import { NewsAndEvents, Layout } from '../components/v2';
import { BlogAccordion } from '../components/v2/blog/BlogAccordion';
import { BlogSidebar } from '../components/v2/blog/BlogSidebar';
import { TagsSection } from '../components/v2/TagsSection';
import { BreadCrumbV2 } from '../components/v2/BreadCrumbV2';


const BlogEntry = ({ data: { blogEntry = {} }, url = {} }) => {
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
    headsUp = '',
    pdfFile = {},
    legacypdf = {},
    relatedContent = '',
    topics = '',
    keywords = '',
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
      <hr className="u-section-underline--no-margins" />
      <div className="o-wrapper c-blog-entry">
        <BreadCrumbV2 title={'Blog'} parentSlug={'/blog'} />
        <section className="o-wrapper-section c-blog-entry__post">
          <BlogSidebar data={blogEntry} />
          <div className="c-blog-entry__content">
            <div className="c-blog-entry__head">
              <h2>{title}</h2>
              {lead && <p className="c-blog-entry__lead">{lead}</p>}
              {topics && 
                topics.map((topic, index) => (
                  <span className="topic" key={index}>
                    {topic.title}
                  </span>
                ))}
            </div>
            {content ? <BlockContent blocks={content} serializers={serializers} /> : null}
            {headsUp && (
              <div className="c-blog-entry__heads-up">
                <BlockContent blocks={headsUp} serializers={serializers} />
              </div>
            )}
            {topics || keywords ? <TagsSection topics={topics} keywords={keywords} /> : null}
            <BlogAccordion />
          </div>
        </section>
      </div>
      <section className="o-wrapper">
        <div className="o-wrapper-section">
          {relatedContent ? <NewsAndEvents events={relatedContent} title={'Related'} /> : null}
        </div>
      </section>
    </Layout>
  );
};

export default DataLoader(BlogEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
      "blogEntry": *[_type  == "blog-post" && slug.current == $slug][0] | order(date.utc desc) {_id, _updatedAt, title, date, content, authors, lead, standfirst, headsUp, topics[]->{title}, keywords[]->{category, keyword}, "imageUrl": featuredImage.asset->url, "slug": slug.current, pdfFile, legacypdf,
      "relatedContent": relatedContent[]->{_type, title, startDate, lead, "slug": slug.current, topics[]->{title}}[0..2]}
    }`,
    param: { slug },
  }),
  materializeDepth: 2,
});
