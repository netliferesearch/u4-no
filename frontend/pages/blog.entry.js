import React from 'react';
import serializers from '../components/serializers';
import DataLoader from '../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import BlockToContent from '@sanity/block-content-to-react';
import { NewsAndEvents, Layout } from '../components/v2';
import { BlogAccordion } from '../components/v2/blog/BlogAccordion';
import { BlogSidebar } from '../components/v2/blog/BlogSidebar';
import { TagsSection } from '../components/v2/TagsSection';
import { BreadCrumbV2 } from '../components/v2/BreadCrumbV2';
import { ArrowPrev } from '../components/v2/icons/ArrowPrev';
import { ShareOnSocialMedia } from '../components/v2/ShareOnSocialMedia';
import { DownloadPdf } from '../components/v2/DownloadDropdown';
import { BlogHeader } from '../components/v2/blog/BlogHeader';
import { Keywords } from '../components/v2/Keywords';
import Newsletter from '../components/v2/Newsletter';

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
      <div className="c-blog-entry">
        <section className="o-wrapper--no-padding">
          <BlogHeader data={blogEntry} />
        </section>
        <hr className="u-section-underline--no-margins" />
        <section className="o-wrapper c-blog-entry__main">
          <div className="o-wrapper-section c-blog-entry__row">
            <BreadCrumbV2 title={'Blog'} parentSlug={'/blog'} />
            {featuredImage.caption && (
              <BlockToContent
                blocks={featuredImage.caption}
                serializers={{
                  types: {
                    block: props => (
                      <p className="c-blog-entry__caption" style={{ display: 'inline' }}>
                        {props.children}
                      </p>
                    ),
                  },
                }}
              />
            )}
          </div>
          <div className="o-wrapper-section c-blog-entry__row">
            <div className="c-blog-entry__side c-blog-entry__col">
              <BlogSidebar data={blogEntry} side={'left'} />
            </div>
            <div className="c-blog-entry__col c-blog-entry__center">
              <div className="c-blog-entry__content">
                {content ? (
                  <div className="c-blog-entry__main-text">
                    <BlockContent blocks={content} serializers={serializers} />
                  </div>
                ) : null}
                <div className="c-newsletter-v2">
                  <Newsletter />
                </div>
                {headsUp && (
                  <div className="c-blog-entry__heads-up">
                    <BlockContent blocks={headsUp} serializers={serializers} />
                  </div>
                )}
                {keywords.length > 0 ? <Keywords title={false} keywords={keywords} /> : null}
                <BlogAccordion />
              </div>
            </div>
            <div className="c-blog-entry__side c-blog-entry__col">
              <BlogSidebar data={blogEntry} side={'right'} />
            </div>
          </div>
        </section>
      </div>
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
