import React from 'react';
import serializers from '../components/serializers';
import DataLoader from '../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import BlockToContent from '@sanity/block-content-to-react';
import { Layout } from '../components/v2';
import { BlogSidebar } from '../components/v2/blog/BlogSidebar';
import { BreadCrumbV2 } from '../components/v2/BreadCrumbV2';
import { BlogHeader } from '../components/v2/blog/BlogHeader';
import { Keywords } from '../components/v2/Keywords';
import Newsletter from '../components/v2/Newsletter';
import { AboutAuthor } from '../components/v2/AboutAuthor';
import { Disclaimers } from '../components/v2/Disclaimers';
import { Share } from '../components/v2/ShareOnSocialMedia';
import { PhotoCaptionCredit } from '../components/v2/PhotoCaptionCredit';

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
    relatedContent = '',
    topics = '',
    keywords = '',
    language = '',
    translation = '',
  } = blogEntry;

const firstPar = content[0]
const furtherPar = content.slice(1)
  
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
      <div className={`c-blog-entry ${featuredImage.asset ? '' : 'c-blog-entry--no-img'}`}>
        <section className="o-wrapper--no-padding">
          <BlogHeader data={blogEntry} />
        </section>
        <hr className="u-section-underline--no-margins" />
        <section className="o-wrapper c-blog-entry__main">
          {featuredImage.asset && (
            <figure className="c-blog-entry__featured-image u-hidden--desktop">
              <img
                src={`${featuredImage.asset.url}?w=800`}
                alt={featuredImage.asset.altText ? featuredImage.asset.altText : 'Featured image'}
              />
              <figcaption className="u-hidden--desktop">
                <PhotoCaptionCredit featuredImage={featuredImage} />
              </figcaption>
            </figure>
          )}
          <div className="o-wrapper-section c-blog-entry__row u-hidden--tablet-flex">
            <BreadCrumbV2 title={'Blog'} parentSlug={'/blog'} home={false} />
            <PhotoCaptionCredit featuredImage={featuredImage} />
          </div>
          <div className="o-wrapper-section c-blog-entry__row">
            <div className="c-blog-entry__side c-blog-entry__col">
              <BlogSidebar data={blogEntry} side={'left'} />
            </div>
            <div className="c-blog-entry__col c-blog-entry__center">
              <div className="c-blog-entry__content">
                {lead ? (
                  <div className="c-blog-entry__main-text c-blog-entry__lead u-drop-cap">
                    <p>{lead}</p>
                  </div>
                ) : null}
                {firstPar ? (
                  <div className="c-blog-entry__main-text">
                    <BlockContent blocks={firstPar} serializers={serializers} />
                  </div>
                ) : null}
                <div className="c-newsletter-v2">
                  <Newsletter />
                </div>
                {furtherPar ? (
                  <div className="c-blog-entry__main-text">
                    <BlockContent blocks={furtherPar} serializers={serializers} />
                  </div>
                ) : null}
                <div className="c-blog-entry__additional-content">
                  {keywords.length > 0 ? <Keywords title={false} keywords={keywords} /> : null}
                  <Share text={title} />
                  <AboutAuthor authors={authors} />
                  <Disclaimers />
                  {headsUp && (
                    <div className="c-blog-entry__heads-up">
                      <BlockContent blocks={headsUp} serializers={serializers} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="c-blog-entry__side c-blog-entry__col u-hidden--tablet">
              <BlogSidebar data={blogEntry} side={'right'} />
            </div>
          </div>
        </section>
      </div>
      <div id="modal" />
    </Layout>
  );
};

export default DataLoader(BlogEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
      "blogEntry": *[_type  == "blog-post" && slug.current == $slug][0] | order(date.utc desc) {_id, _updatedAt, title, date, content, authors, lead, standfirst, headsUp, topics[]->{title, slug}, keywords[]->{category, keyword}, "slug": slug.current, language, translation, 
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
