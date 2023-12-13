import Layout from '@/app/components/layout/Layout';
import getMetadata from '@/app/lib/getMetadata';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import BlockContent from '@sanity/block-content-to-react';
import serializers from 'components/serializers/serializers';
import { PageIntro } from 'components/general/PageIntro';
import { SideBox } from 'components/general/side-box/SideBox';
import { LearningEvents } from 'components/front-page/LearningEvents';
import { TextImage } from 'components/general/text-image/TextImage';
import { Banner } from 'components/general/banner/Banner';
import { Team } from 'components/general/team/Team';
import { PERSON_CARD_TYPE } from 'components/general/person/PersonCard';
import { CARD_TYPE } from 'components/general/blue-card/BlueCard';
import { groq } from 'next-sanity';

export default async function Page({params}) {

  const data = await getData( params );

  const { 
    eventsAndWebinars = {}, 
    previousEvents = {}, 
    workshops = {}, 
    persons = {}, 
    service = {}
  } = data;
  
  const {
    title = '',
    longTitle = '',
    featuredImage = {},
    lead = '',
    leadLinks,
    relatedUrl = {},
    sections,
  } = service;

  const date = new Date().toJSON();
  const features = sections.slice(0, 1);
  const boxAndImg1 = sections.filter(i => i._type === 'boxOnImageRef')[0];
  const person = sections.filter(i => i._type === 'HelpdeskTeam')[0];
  const citationContent = sections[2].text[0].children[0].text;
  const citationAuthor = sections[2].text[1].children[0].text;

  return (
    <Layout>
      <div className="c-service-page c-events-page">

        <section className="o-wrapper-medium">
          <div className="c-service-page__top">
            <div className="c-service-page__intro">
              <PageIntro
                title={longTitle}
                text={<BlockContent blocks={lead} serializers={serializers} />}
              />
            </div>
            <SideBox>
              <h3 className="c-longform-grid__standard">Anti-corruption encounters</h3>
              <BlockContent blocks={features} serializers={serializers} />
            </SideBox>
          </div>
        </section>

        <hr className="u-section-underline--no-margins" />

        <section id="courses" className="o-wrapper-medium">
          <LearningEvents
            events={eventsAndWebinars}
            type={eventsAndWebinars.length > 1 ? CARD_TYPE.MEDIUM : CARD_TYPE.FULL}
            title="Events and webinars"
            text="Register for one of our upcoming events"
          />
        </section>

        <hr className="u-section-underline--no-margins" />

        <div className="o-wrapper-medium u-top-margin--64">
          <TextImage text={boxAndImg1.block} image={boxAndImg1.img} imagePosition />
        </div>

        <section id="courses" className="o-wrapper-medium">
          <LearningEvents
            events={workshops}
            type={workshops.length > 1 ? CARD_TYPE.MEDIUM : CARD_TYPE.FULL}
            title="Workshops"
            text="Upcoming workshops for our partner staff. "
          />
        </section>

        <section className="o-wrapper-medium o-wrapper-tablet-full">
          <Banner title="What participants say">
            <div className="c-testimonial">
              <div className="c-testimonial__text">
                <div className="c-pullQuote">
                  <p className="c-longform-grid__standard">{citationContent}</p>
                </div>
                <p className="c-testimonial__cite c-pullQuote__cite">{citationAuthor}</p>
              </div>
            </div>
          </Banner>
        </section>

        <section id="courses" className="o-wrapper-medium">
          <LearningEvents
            events={previousEvents}
            type={previousEvents.length > 1 ? CARD_TYPE.MEDIUM : CARD_TYPE.FULL}
            title="Previous events"
            text="Explore one of our previous events"
          />
        </section>

        <div className="o-wrapper-medium u-top-margin--64">
          <hr className="u-section-underline--no-margins" />
          <div className="o-grid-container--2">
            <Team
              type={PERSON_CARD_TYPE.IMAGE_LEFT}
              heading={person.headingLeft}
              members={person.personLeft}
            />
            {person.personRight && (
              <Team
                type={PERSON_CARD_TYPE.IMAGE_LEFT}
                heading={persons.headingRight}
                members={persons.personRight}
              />
            )}
          </div>
        </div>

      </div>

    </Layout>
  );
};

export async function generateMetadata({ params }) {

  const data = await getData( params );
  const {
    service: {
      title = '', 
      lead = '', 
      featuredImage = {},
    }
  } = data;
 
  return getMetadata({
    title: title,
    description: lead.length && lead[0].children.length ? lead[0].children[0].text : lead,
    image: featuredImage
  });
}

const sanityQuery = groq`{
    "service": *[_type == "frontpage" && ((slug.current == "workshops-and-events-NEW") || ( _id == "e2d9451d-a1ce-43fc-869c-7128ff603099"))][0]{
      title, 
      longTitle, 
      "slug": slug.current, 
      lead, 
      leadLinks, 
      _id,
      sections[]{
        ...,
        personLeft[]->{_id,firstName,surname,email,position,twitter,linkedin,facebook,"slug": slug.current,image{asset->{url}}},
        personRight[]->{_id,firstName,surname,email,position,twitter,linkedin,facebook,"slug": slug.current,image{asset->{url}}},
      },
      "persons": sections[4]{
        ...,
        personLeft[]->{_id,firstName,surname,email,position,twitter,linkedin,facebook,"slug": slug.current,image{asset->{url}}},
        personRight[]->{_id,firstName,surname,email,position,twitter,linkedin,facebook,"slug": slug.current,image{asset->{url}}}
      }, 
      "featuredImage": featuredImage.asset->url, 
    },
    "eventsAndWebinars": *[_type == "event" && (!startDate || startDate.utc > now()) && !(eventType in ['incountryworkshop','hqworkshop'])] | order(startDate.utc asc) {_type, eventType, title, startDate, location, lead, "slug": slug.current, topics[]->{title}},
    "workshops": *[_type == "event" && (!startDate || startDate.utc > now()) && (eventType in ['incountryworkshop','hqworkshop'])] | order(startDate.utc asc) {_type, eventType, title, startDate, location, lead, "slug": slug.current, topics[]->{title}},
    "previousEvents": *[_type == "event" && (startDate.utc < now())] | order(startDate.utc desc) {_type, eventType, title, startDate, location, lead, "slug": slug.current, topics[]->{title}},
  }`;

async function getData( params ) {
  const data = await fetchAndMaterialize( {
    query: sanityQuery, 
    params, 
    materializeDepth: 2,
    tags: ['frontpage:workshops-and-events-NEW']
  });
  return data;
};