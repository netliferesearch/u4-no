import React from 'react';
import serializers from '../../components/serializers';
import DataLoader from '../../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import { Layout } from '../../components/Layout';
import { BlogSidebar } from '../../components/blog/BlogSidebar';
import { BreadCrumbV2 } from '../../components/BreadCrumbV2';
import findFootnotes from '../../components/findFootnotes';
import footnoteSerializer from '../../components/footnoteSerializer';
import { BlogHeader } from '../../components/blog/BlogHeader';
import { Keywords } from '../../components/Keywords';
import { Newsletter } from '../../components/general/newsletter/Newsletter';
import { AboutAuthor } from '../../components/blog/AboutAuthor';
import { Disclaimers } from '../../components/Disclaimers';
import { ShareOpen } from '../../components/general/social/ShareOpen';
import { PhotoCaptionCredit } from '../../components/PhotoCaptionCredit';
import { useEffect } from 'react';
import Footer from '../../components/general/footer/Footer';


const littlefootActivator = () => {
  const littlefoot = require('littlefoot').default;
  littlefoot();
};

const isPar = p => (p.children && p.style === 'normal' ? true : false);

const getFirstPart = content => {
  const firstPart = [];
  const countPar = [];
  content.forEach(b => {
    if (countPar.length < 2) {
      firstPart.push(b);
      if (isPar(b) === true) {
        countPar.push(b);
      }
    } else {
      return firstPart;
    }
  });
  return firstPart;
};

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

  const blocks = content.filter(block => !['reference'].includes(block._type));
  const footnotes = findFootnotes(blocks);
  const footNotesKeys = Object.keys(footnotes);

  useEffect(() => littlefootActivator(), []);

  const topBlocks = getFirstPart(content);
  //console.log(topBlocks.length);
  const belowBlocks = content.slice(topBlocks.length);
  //console.log(belowBlocks.length);

  return (
   <Layout
      headComponentConfig={{
        title,
        description: standfirst || lead,
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
                {topBlocks ? (
                  <div className="c-blog-entry__main-text u-drop-cap c-blog-entry__first-p">
                    <BlockContent blocks={topBlocks} serializers={serializers} />
                  </div>
                ) : null}
                <div className="c-newsletter-v2">
                  <Newsletter />
                </div>
                {belowBlocks ? (
                  <div className="c-blog-entry__main-text">
                    <BlockContent blocks={belowBlocks} serializers={serializers} />
                    <div className="footnotes">
                      <ol>
                        {footNotesKeys.map(key => (
                          <div key={key}>
                            <BlockContent
                              blocks={footnotes[key]}
                              serializers={footnoteSerializer(key)}
                            />
                          </div>
                        ))}
                      </ol>
                    </div>
                  </div>
                ) : null}
                <div className="c-blog-entry__additional-content">
                  {keywords.length > 0 ? (
                    <Keywords title={false} keywords={keywords} hr={false} />
                  ) : null}
                  <ShareOpen text={title} />
                  <AboutAuthor authors={authors} />
                  <Disclaimers />
                  {headsUp && (
                    <div className="c-blog-entry __heads-up">
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
      <Footer />
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
