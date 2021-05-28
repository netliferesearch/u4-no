import React from 'react';
import serializers from '../../components/serializers';
import DataLoader from '../../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import BlockToContent from '@sanity/block-content-to-react';
import { NewsAndEvents, Layout } from '../../components/v2';
import { BlogAccordion } from '../../components/v2/blog/BlogAccordion';
import { BlogSidebar } from '../../components/v2/blog/BlogSidebar';
import { TagsSection } from '../../components/v2/TagsSection';
import { BreadCrumbV2 } from '../../components/v2/BreadCrumbV2';

const BlogEntry = ({ data: { blogEntry = {} }, url = {} }) => {
  const {
    title = '',
    authors = [],
    date = '',
    _updatedAt = '',
    featuredImage = {},
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
        image: featuredImage.asset ? featuredImage.asset.url : '',
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

            {featuredImage.asset && (
              <figure className="c-blog-entry__featured-image">
                <img
                  src={`${featuredImage.asset.url}?w=800`}
                  alt={featuredImage.asset.altText ? featuredImage.asset.altText : 'Featured image'}
                />
                {featuredImage.caption && (
                  <BlockToContent
                    blocks={featuredImage.caption}
                    serializers={{
                      types: {
                        block: props => <p className="c-blog-entry__caption" style={{ display: 'inline' }}>{props.children}</p>,
                      },
                    }}
                  />
                )}
              </figure>
            )}
            {content ? <div className="c-blog-entry__main-text"><BlockContent blocks={content} serializers={serializers} /></div> : null}
            {headsUp && (
              <div className="c-blog-entry__heads-up">
                <BlockContent blocks={headsUp} serializers={serializers} />
              </div>
            )}
            {topics.length > 0 || keywords.length > 0 ? <TagsSection topics={topics} keywords={keywords} /> : null}
            <BlogAccordion />
          </div>
        </section>
      </div>
      <section className="o-wrapper c-blog-entry__bottom">
        <div className="o-wrapper-section">
          {relatedContent ? <NewsAndEvents items={relatedContent} title={'Related'} /> : null}
        </div>
      </section>
    </Layout>
  );
};

export default DataLoader(BlogEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
      "blogEntry": *[_type  == "blog-post" && slug.current == $slug][0] | order(date.utc desc) {_id, _updatedAt, title, date, content, authors, lead, standfirst, headsUp, topics[]->{title}, keywords[]->{category, keyword}, "slug": slug.current, pdfFile, legacypdf,
      "featuredImage": {
        "caption": featuredImage.caption,
        "credit": featuredImage.credit,
        "sourceUrl": featuredImage.sourceUrl,
        "license": featuredImage.license,
        "asset": featuredImage.asset->{
          "altText": altText,
          "url": url
        }
      },
      "relatedContent": relatedContent[]->{_type, _id, title, publicationType->{ title }, articleType[0]->{ title }, startDate, date, standfirst, lead, "slug": slug.current, topics[]->{title}}[0..2]}
    }`,
    param: { slug },
  }),
  materializeDepth: 2,
});
