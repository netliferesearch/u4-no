import React from 'react';
import PropTypes from 'prop-types';
import DataLoader from '../../../helpers/data-loader';
import Footer from '../../../components/general/footer/Footer';
import Layout from '../../../components/Layout';
import { Team } from '../../../components/general/team/Team';
import { LinkBox } from '../../../components/general/link-box/LinkBox';
import { FeaturedPosts } from '../../../components/front-page/FeaturedPosts';
import { PostCarousel } from '../../../components/front-page/PostCarousel';
import { POST_TYPE } from '../../../components/general/post/Post';
import { TopicCardList } from '../../../components/general/topics/TopicCardList';
import { CARD_TYPE } from '../../../components/general/blue-card/BlueCard';
import { Hero } from '../../../components/general/Hero';
import { PERSON_CARD_TYPE } from '../../../components/general/person/PersonCard';
import { LearningEvents } from '../../../components/front-page/LearningEvents';

const TopicEntry = ({ data: { topic = {} } }) => {
  const {
    title = '',
    longTitle = '',
    explainerText = '',
    featuredImage = {},
    relatedTopics = [],
    relatedPublications = [],
    relatedBlogPosts = [],
    furtherResources = [],
    resourceCollections = [],
    parent = {},
    slug = {},
    introduction = [],
    agenda = [],
    advisors = [],
    resources = [],
    relatedEvents = [],
    relatedUrl = {},
    url = {},
  } = topic;
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
            contentType="topic"
            image={featuredImage}
            parentSlug="/topics"
            parentTitle="Topics"
            title={title}
            text={longTitle}
            topics={relatedTopics}
          />
        </section>
        <section className="o-wrapper-medium">
          {introduction.length + agenda.length > 0 && (
            <div className="c-linkbox-wrapper">
              {introduction.length > 0 && (
                <LinkBox
                  title="Basic guide"
                  text={`Read our introduction to corruption and anti-corruption efforts in ${title.toLowerCase()}.`}
                  // icon={BasicGuide}
                  _type="topicsBasics"
                  slug={slug}
                  color={`${agenda.length > 0 ? 'white' : 'lighter-blue--full'}`}
                />
              )}
              {agenda.length > 0 && (
                <LinkBox
                  title="Research and policy agenda"
                  text={`Discover what U4 and others do to advance research and reduce corruption in ${title.toLowerCase()}.`}
                  // icon={ResearchAgenda}
                  _type="topicsAgenda"
                  slug={slug}
                  color="dark-blue"
                />
              )}
            </div>
          )}
        </section>
        <section className="o-wrapper-full u-bg--lighter-blue">
          <div className="o-wrapper-medium">
            <FeaturedPosts
              featured={resources.filter(i => Object.keys(i).length !== 0).slice(0, 5)}
            />
          </div>
        </section>
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
        {furtherResources.length > 0 && (
          <div className="o-wrapper-medium o-wrapper-mobile-full">
            <PostCarousel
              posts={furtherResources}
              type={POST_TYPE.CARD}
              buttonPath={`/search?search=${title}`}
              title="Further Resources"
              minPosts={3}
            />
          </div>
        )}

        {resourceCollections.length > 0 && (
          <section className="o-wrapper-full u-bg--light-blue--top">
            <div className="o-wrapper-medium o-wrapper-mobile-full">
              <PostCarousel
                posts={resourceCollections}
                type={POST_TYPE.CARD}
                buttonPath="/collections"
                title="Resource Collections"
                minPosts={3}
              />
            </div>
          </section>
        )}
        {advisors.length > 0 && (
          <div id="advisors" className="o-wrapper-medium">
            <hr className="u-section-underline--no-margins" />

            <Team
              type={PERSON_CARD_TYPE.IMAGE_TOP}
              heading="Topic Experts"
              members={advisors}
              linkLabel="Read full bio"
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

TopicEntry.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DataLoader(TopicEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
      "topic": *[slug.current == $slug && _type=='topics']{
        ...,
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
        "advisors": advisors[]->{
          _id,
          title,
          "image": image.asset->{"asset": { "url": url}},
          position,
          firstName,
          surname,
          email,
          slug,
          bio
        },
        "relatedTopics":
          *[_type == 'topics' && _id != ^._id && (_id==coalesce(^.parent._ref,^._id) || (parent._ref == coalesce(^.parent._ref,^._id)))]{
            _id,
            _type,
            title,
            "slug": slug.current,
            longTitle,
            _updatedAt,
          },
        "resources": resources[]->{
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
        "furtherResources": further_resources[]->{
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
        "relatedPublications": *[_type == 'publication' && references(^._id)] | order(date.utc desc) {_id, _type, title, date, standfirst, "publicationType": publicationType->title, authors[]->{firstName, surname}, topics[]->{title, slug}, "imageUrl": featuredImage.asset->url, "slug": slug.current, "pdfFile": pdfFile.asset->url}[0..8],
        "relatedBlogPosts": *[_type == 'blog-post' && references(^._id)] | order(date.utc desc) {_id, _type, title, date, standfirst, authors[]->{firstName, surname}, topics[]->{title, slug}, "imageUrl": featuredImage.asset->url, "slug": slug.current}[0..8],
        "relatedEvents": *[_type in ["course", "event"] && references(^._id)] | order(startDate.utc desc) {_type, title, startDate, lead, "slug": slug.current, topics[]->{title}, eventType},
        "resourceCollections": *[_type == 'collection' && references(^._id)] {_type, title, "slug": slug.current},
    }[0]}`,
    param: { slug },
  }),
  materializeDepth: 3,
});
