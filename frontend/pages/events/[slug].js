import React from 'react';
import DataLoader from '../../helpers/data-loader';
import Footer from '../../components/general/footer/Footer';
import Layout from '../../components/Layout';
import { Team } from '../../components/general/team/Team';
import { BreadCrumbV2 } from '../../components/general/BreadCrumbV2';
import { EventHeader } from '../../components/events/EventHeader';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../components/serializers/serializers';
import { EventSidebar } from '../../components/events/EventSidebar';
import { PERSON_CARD_TYPE } from '../../components/general/person/PersonCard';
import { PostCarousel } from '../../components/front-page/PostCarousel';
import { POST_TYPE } from '../../components/general/post/Post';

const EventPage = ({ data: { event = {} }, url = {} }) => {
  const {
    title = '',
    location = '',
    startDate = {},
    featuredImage = {},
    leadText = '',
    content = [],
    contact = [],
    topics = [],
    organiser = '',
    relatedResources = [],
  } = event;
  return (
    <Layout
      headComponentConfig={{
        title,
        description: leadText,
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: {},
      }}
    >
      <div className="c-event-entry">
        <section className="o-wrapper-medium">
          <BreadCrumbV2 title="Workshops & Events" parentSlug="/workshops-and-events" home />
          <EventHeader data={event} />
        </section>
        <div className="u-section-underline--no-margins" />
        <div className="o-wrapper-medium">
          <div className="c-course-entry__content ">
            <div className="c-persons__article c-longform u-margin--course-top">
              <BlockContent blocks={content} serializers={serializers} />
            </div>
            {topics.length || startDate.utc || location ? (
              <div className="c-article__side c-article__col">
                <EventSidebar data={event} />
              </div>
            ) : null}

            <hr className="u-section-underline--no-margins" />
          </div>
        </div>
        {contact.length ? (
          <section className="o-wrapper-medium u-bottom-margin--24">
            <hr className="u-section-underline--no-margins" />
            <Team type={PERSON_CARD_TYPE.IMAGE_TOP} heading="Related experts" members={contact} />
          </section>
        ) : null}
        {relatedResources.length > 0 ? (
          <section>
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
      </div>
      <Footer />
    </Layout>
  );
};

export default DataLoader(EventPage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
           "event": *[_type=="event" && slug.current == $slug][0]{_type, title, eventType, location, startDate, endDate, organiser, leadText, content, slug, eventLink, eventType,
          "contact": contact[]->{
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
          relatedContent, topics[]->{title,slug}, keywords,  _id,
          "featuredImage": {
            "caption": featuredImage.caption,
            "credit": featuredImage.credit,
            "sourceUrl": featuredImage.sourceUrl,
            "license": featuredImage.license,
            "asset": featuredImage.asset->{
              "altText": altText,
              "url": url
            }
          }
        },
      }`,
    param: { slug },
  }),
  materializeDepth: 5,
});
