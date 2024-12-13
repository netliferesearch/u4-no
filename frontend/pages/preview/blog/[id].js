import React, { useEffect } from 'react';
import serializers from '../../../components/serializers/serializers';
import DataLoaderPreview from '../../../helpers/data-loader-preview';
import BlockContent from '@sanity/block-content-to-react';
import { Layout } from '../../../components/Layout';
import { BreadCrumbV2 } from '../../../components/general/BreadCrumbV2';
import findFootnotes from '../../../components/findFootnotes';
import footnoteSerializer from '../../../components/footnoteSerializer';

import Footer from '../../../components/general/footer/Footer';
import { ArticleHeader } from '../../../components/general/article-header/ArticleHeader';
import { ArticleSidebar } from '../../../components/general/article-sidebar/ArticleSidebar';
import { PostCarousel } from '../../../components/front-page/PostCarousel';
import { POST_TYPE } from '../../../components/general/post/Post';
import { PublicationAdditionalInfo } from '../../../components/publication/PublicationAdditionalInfo';
import LongformArticle from '../../../components/LongformArticle';

const littlefootActivator = () => {
  const littlefoot = require('littlefoot').default;
  littlefoot();
};

const BlogEntry = ({ data: { blogEntry = {} }, url = {} }) => {
  const {
    _type = '',
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
    relatedResources = '',
    topics = '',
    keywords = '',
  } = blogEntry;

  const blocks = content.filter(block => !['reference'].includes(block._type));
  const footnotes = findFootnotes(blocks);
  const footNotesKeys = Object.keys(footnotes);

  useEffect(() => littlefootActivator(), []);

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
      <article className={`c-blog-entry ${featuredImage.asset ? '' : 'c-blog-entry--no-img'}`}>
        <section className="o-wrapper-medium">
          <BreadCrumbV2 title="Blog" parentSlug="/blog" home />
          <ArticleHeader data={blogEntry} />
        </section>
        <hr className="u-section-underline--no-margins" />
        <section className="o-wrapper-medium ">
          <div className="c-article__row">
            <div className="content c-article__col">
              <div className="u-margin--article-top">
                <LongformArticle content={content} title={title} />
              </div>

              {/* <div className="c-longform c-blog-entry__main-text">
                    <BlockContent blocks={content} serializers={serializers} />
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
                  </div> */}
            </div>
            <div className="c-article__side c-article__col">
              <ArticleSidebar data={blogEntry} />
            </div>
          </div>
        </section>

        <PublicationAdditionalInfo data={blogEntry} />
      </article>

      {relatedResources.length > 0 ? (
        <section className="">
          <div className="o-wrapper-medium o-wrapper-mobile-full">
            <PostCarousel
              posts={relatedResources}
              type={POST_TYPE.BLOG}
              buttonPath="/publications"
              title="Related Content"
              minPosts={3}
            />
            <hr className="u-section-underline--no-margins" />
          </div>
        </section>
      ) : null}

      <Footer />
      <div id="modal" />
    </Layout>
  );
};

export default DataLoaderPreview(BlogEntry, {
  queryFunc: ({ query: { id = '' } }) => ({
    sanityQuery: `{
      "blogEntry": *[_type  == "blog-post" && _id == $id][0] | order(date.utc desc) {_id, _type, _updatedAt, title, date, content, authors, editors,lead, standfirst, headsUp, topics[]->{title, slug}, keywords[]->{category, keyword}, "slug": slug.current, language, translation,basedonpublication->{_id,_type,title,"slug":slug.current},
        featuredImage{caption,credit,sourceUrl,license,asset->{altText,url,metadata{lqip}}},
        "translations": *[ _type == 'blog-post' && ( _id != ^._id ) && ( ( _id == ^.translation._ref) || translation._ref == coalesce(^.translation._ref, ^._id ))]{title, "slug": slug.current, language},
        "relatedResources": relatedContent[]->{_type, _id, title, publicationType->{ title }, articleType[0]->{ title }, "imageUrl": featuredImage.asset->url, startDate, date, standfirst, lead, "slug": slug.current, topics[]->{title}}[0..2]}
    }`,
    param: { id },
  }),
  materializeDepth: 2,
});
