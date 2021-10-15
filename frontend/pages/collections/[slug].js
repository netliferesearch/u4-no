import React from 'react';
import PropTypes from 'prop-types';
import DataLoader from '../../helpers/data-loader';
import Footer from '../../components/general/footer/Footer';
import Layout from '../../components/Layout';
import { Team } from '../../components/general/team/Team';
import { LinkBox } from '../../components/general/link-box/LinkBox';
import { FeaturedPosts } from '../../components/front-page/FeaturedPosts';
import { PostCarousel } from '../../components/front-page/PostCarousel';
import { POST_TYPE } from '../../components/general/post/Post';
import { TopicCardList } from '../../components/general/topics/TopicCardList';
import { CARD_TYPE } from '../../components/general/blue-card/BlueCard';
import { Hero } from '../../components/general/Hero';
import { PERSON_CARD_TYPE } from '../../components/general/person/PersonCard';
import { LearningEvents } from '../../components/front-page/LearningEvents';
import buildUrl from '../../helpers/buildUrl';

const CollectionEntry = ({ data: { collection = {} } }) => {
  const {
    title = '',
    longTitle = '',
    explainerText = '',
    featuredImage = {},
    relatedTopics = [],
    relatedPublications = [],
    relatedBlogPosts = [],
    parent = {},
    slug = {},
    introduction = [],
    agenda = [],
    advisors = [],
    resources = [],
    relatedEvents = [],
    relatedUrl = {},
    url = {},
  } = collection;
  return (
    <Layout
      headComponentConfig={Object.assign(
        {
          title,
          description: explainerText,
          image: featuredImage && featuredImage.asset ? featuredImage.asset.url : '',
          url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
          ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
        },
        relatedUrl
      )}
    >
      <div className="c-topic-page">
        <section className="o-wrapper-full">
          <Hero
            contentType="Resource collection"
            image={featuredImage}
            title={title}
            text={longTitle}
            topics={relatedTopics}
            onDark={false}
            parentSlug={relatedTopics[0] ? buildUrl(relatedTopics[0]) : ''}
            parentTitle={relatedTopics[0] ? relatedTopics[0].title : ''}
            grandParentSlug={relatedTopics[0] ? '/topics' : ''}
            grandParentTitle={relatedTopics[0] ? 'Topics' : ''}
          />
        </section>
        <hr className="u-section-underline--no-margins" />
        {relatedBlogPosts.length > 0 ? (
          <section className="">
            <div className="o-wrapper-medium o-wrapper-mobile-full">
              <PostCarousel
                posts={relatedBlogPosts}
                type={POST_TYPE.BLOG}
                buttonPath="/blog"
                title="From the blog"
                minPosts={3}
              />
              <hr className="u-section-underline--no-margins" />
            </div>
          </section>
        ) : null}

        {relatedEvents.length ? (
          <section className="">
            <div className="o-wrapper-medium">
              <LearningEvents
                events={relatedEvents}
                type={relatedEvents.length > 1 ? CARD_TYPE.MEDIUM : CARD_TYPE.FULL}
              />
            </div>
          </section>
        ) : null}
        {relatedPublications.length > 0 ? (
          <section className="">
            <div className="o-wrapper-medium o-wrapper-mobile-full">
              <PostCarousel
                posts={relatedPublications}
                type={POST_TYPE.PUBLICATION}
                buttonPath="/publications"
                title="Latest publications"
                minPosts={4}
              />
              <hr className="u-section-underline--no-margins" />
            </div>
          </section>
        ) : null}
        {resources.length > 0 && (
          <div className="o-wrapper-medium o-wrapper-mobile-full">
            <PostCarousel
              posts={resources}
              type={POST_TYPE.CARD}
              buttonPath={`/search?search=${title}`}
              title="Further Resources"
              minPosts={3}
            />
            <hr className="u-section-underline--no-margins" />
          </div>
        )}
        {relatedTopics.length > 0 ? (
          <section className="">
            <div className="o-wrapper-medium">
              <TopicCardList type={CARD_TYPE.TOPIC} topics={relatedTopics} title="Related topics" />
            </div>
          </section>
        ) : null}
      </div>
      <Footer />
    </Layout>
  );
};

CollectionEntry.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DataLoader(CollectionEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
      "collection": *[slug.current == $slug && _type=='collection']{
        ...,
        "relatedTopics": topics[]->{
            _id,
            _type,
            title,
            "slug": slug.current,
            longTitle,
            _updatedAt,
          },
        "resources": resources[]-> | [_type in ['resource','article']]{
          _id,
          _type,
          "publicationType": publicationType->title,
          "articleType": articleType[0]->title,
          title,
          date,
          standfirst,
          lead,
          "slug": slug.current,
          "titleColor": featuredImage.asset->metadata.palette.dominant.title,
          "imageUrl": featuredImage.asset->url,
          topics[]->{title},
        },
        "relatedPublications": resources[]-> | [_type == 'publication'] | order(date.utc desc) {_id, _type, title, date, standfirst, "publicationType": publicationType->title, authors[]->{firstName, surname}, topics[]->{title, slug}, "imageUrl": featuredImage.asset->url, "slug": slug.current, "pdfFile": pdfFile.asset->url}[0..8],
        "relatedBlogPosts": resources[]-> | [_type == 'blog-post'] | order(date.utc desc) {_id, _type, title, date, standfirst, authors[]->{firstName, surname}, topics[]->{title, slug}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0..8],
        "relatedEvents": resources[]-> | [_type in ["course", "event"]] | order(startDate.utc desc) {_type, title, startDate, lead, "slug": slug.current, topics[]->{title}},
    }[0]}`,
    param: { slug },
  }),
  materializeDepth: 3,
});
