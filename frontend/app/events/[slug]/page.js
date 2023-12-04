import Layout from '@/app/components/layout/Layout';
import getMetadata from '@/app/lib/getMetadata';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import hasContent from '@/app/lib/util/hasContent';
import BlockContent from '@sanity/block-content-to-react';
import { EventHeader } from 'components/events/EventHeader';
import { EventSidebar } from 'components/events/EventSidebar';
import { PostCarousel } from 'components/front-page/PostCarousel';
import { BreadCrumbV2 } from 'components/general/BreadCrumbV2';
import { PERSON_CARD_TYPE } from 'components/general/person/PersonCard';
import { POST_TYPE } from 'components/general/post/Post';
import { Team } from 'components/general/team/Team';
import serializers from 'components/serializers/serializers';
import { groq } from 'next-sanity';

export default async function Event({ params }){

  const data = await getData(params);
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
  } = data;

  return (
    <Layout>
      <div className="c-event-entry">

        <section className="o-wrapper-medium">
          <BreadCrumbV2 title="Workshops & Events" parentSlug="/workshops-and-events" home />
          <EventHeader data={data} />
        </section>

        <div className="u-section-underline--no-margins" />
        
        <div className="o-wrapper-medium">
          <div className="c-course-entry__content ">
            <div className="c-persons__article c-longform u-margin--course-top">
              <BlockContent blocks={content} serializers={serializers} />
            </div>

            {(hasContent(topics) || startDate.utc || location ) && (
              <div className="c-article__side c-article__col">
                <EventSidebar data={data} />
              </div>
            )}

            <hr className="u-section-underline--no-margins" />
          </div>
        </div>

        {hasContent(contact) && (
          <section className="o-wrapper-medium u-bottom-margin--24">
            <hr className="u-section-underline--no-margins" />
            <Team type={PERSON_CARD_TYPE.IMAGE_TOP} heading="Related experts" members={contact} />
          </section>
        )}

        {hasContent(relatedResources) && (
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
        )}

      </div>

    </Layout>
  );
};

export async function generateMetadata({ params }) {

  const data = await getData(params);
  const {
    title = '',
    leadText = '',
    featuredImage = '',
  } = data;

  return getMetadata({
    title: title,
    description: leadText,
    image: featuredImage?.asset?.url
  });
}

const sanityQuery = groq`*[_type=="event" && slug.current == $slug][0]{
  _type, 
  title, 
  eventType, 
  location, 
  startDate, 
  endDate, 
  organiser, 
  leadText, 
  content, 
  "slug": slug.current, 
  eventLink, 
  eventType,
  "contact": contact[]->{
    _id,
      title,
      image{asset->{url}},
      position,
      firstName,
      surname,
      email,
      "slug": slug.current,
      bio
  },
  relatedContent, 
  topics[]->{title,"slug": slug.current}, 
  keywords,  
  _id,
  featuredImage{
    caption,
    credit,
    sourceUrl,
    license,
    asset->{
      url,
      altText,
      metadata{
        lqip,
        dimensions{width,height}
      }
    }
  },
}`;

async function getData(params) {
  const data = await fetchAndMaterialize({
    query: sanityQuery,
    params,
    tags: [`event:${params.slug}`],
    materializeDepth: 2
  });
  return data;
};

export async function generateStaticParams() {
  const sanityQuery = groq`*[_type == 'event']{ "slug": slug.current } | order(_updatedAt desc) [0..1000]`;
  const data = await fetchAndMaterialize({ query: sanityQuery, materializeDepth: 0 });
  return data;
};