import { ScrollToAnchor } from '@/app/components/general/ScrollToAnchor';
import Layout from '@/app/components/layout/Layout';
import getMetadata from '@/app/lib/getMetadata';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import BlockContent from '@sanity/block-content-to-react';
import { LearningEvents } from 'components/front-page/LearningEvents';
import { PageIntro } from 'components/general/PageIntro';
import { Banner } from 'components/general/banner/Banner';
import { CARD_TYPE } from 'components/general/blue-card/BlueCard';
import { PERSON_CARD_TYPE } from 'components/general/person/PersonCard';
import { SideBox } from 'components/general/side-box/SideBox';
import { Team } from 'components/general/team/Team';
import { Testimonial } from 'components/general/testimonial/Testimonial';
import { TextImage } from 'components/general/text-image/TextImage';
import serializers from 'components/serializers/serializers';
import { groq } from 'next-sanity';

export default async function Page({params}) {

  const data = await getData( params );
  const  {
    title = '',
    longTitle = '',
    featuredImage = '',
    lead = [],
    sections = [],
    relatedUrl = {},
    persons = {},
    resources = [],
  } = data;

  const featuresHeading = sections.slice(0, 1);
  const features = sections.slice(1, 2);
  const courses1 = sections.filter(i => i._type === 'courses')[0].coursesRef;
  const courses2 = sections.filter(i => i._type === 'courses')[1].coursesRef;
  const courses3 = sections.filter(i => i._type === 'courses')[2].coursesRef;
  const courses4 = sections.filter(i => i._type === 'courses')[3].coursesRef;
  const courses5 = sections.filter(i => i._type === 'courses')[4].coursesRef;
  const courses6 = sections.filter(i => i._type === 'courses')[5].coursesRef;
  const boxAndImg1 = sections.filter(i => i._type === 'boxOnImageRef')[0];
  const boxAndImg2 = sections.filter(i => i._type === 'boxOnImageRef')[1];
  const twoCols = sections.filter(i => i._type === 'twoColumns')[0];
  const defaultTestimonial = {
    text: [  {
      "_type": "block",
      "style": "normal",
      "children": [{
        "_type": "span",
        "marks": [],
        "text": "This course has allowed me to explore aspects of corruption that I had never been confronted with. I now have a new vision regarding the factors and risks of fighting corruption in the health sector."
      }],
      "markDefs": []
      }],
    cite: "Participant, 2022"
  }
  return (
    <Layout>
      <div className="c-service-page c-courses-page">

        <section className="o-wrapper-medium">
          <div className="c-service-page__top">
            <div className="c-service-page__intro">
              <PageIntro
                title={longTitle}
                text={<BlockContent blocks={lead} serializers={serializers} />}
              />
              <div className="c-btn c-btn--primary c-btn--child-link">
                <ScrollToAnchor to="#courses" >
                  Start for free
                </ScrollToAnchor>
              </div>
            </div>
            <SideBox>
              <BlockContent blocks={featuresHeading} serializers={serializers} />
              <BlockContent blocks={features} serializers={serializers} />
            </SideBox>
          </div>
        </section>

        <hr className="u-section-underline--no-margins" />

        <section id="courses" className="o-wrapper-medium">
          <LearningEvents
            events={courses1}
            type={courses1.length > 1 ? CARD_TYPE.MEDIUM : CARD_TYPE.FULL}
            title="Anti-corruption basics (open for everyone)"
            text="1-hour, self-paced course available in four languages"
          />
        </section>

        <hr className="u-section-underline--no-margins" />

        <section className="o-wrapper-medium">
          <LearningEvents
            events={courses5}
            type={courses5.length > 1 ? CARD_TYPE.MEDIUM : CARD_TYPE.FULL}
            title="Illicit financial flows (open for everyone)"
            text="Self-paced courses"
          />
        </section>

        <hr className="u-section-underline--no-margins" />

        <section className="o-wrapper-medium">
          <LearningEvents
            events={courses3}
            type={courses3.length > 1 ? CARD_TYPE.MEDIUM : CARD_TYPE.FULL}
            title="Natural resource sector (open for everyone)"
            text="1-hour, self-paced courses"
          />
        </section>

        <hr className="u-section-underline--no-margins" />

        <section className="o-wrapper-medium">
          <LearningEvents
            events={courses4}
            type={courses4.length > 1 ? CARD_TYPE.MEDIUM : CARD_TYPE.FULL}
            title="Health sector (open for everyone)"
            text="Self-paced courses"
          />
        </section>

        <hr className="u-section-underline--no-margins" />

        <section className="o-wrapper-medium">
          <LearningEvents
            events={courses5}
            type={courses5.length > 1 ? CARD_TYPE.MEDIUM : CARD_TYPE.FULL}
            title="Corruption risk management (open for everyone)"
            text="Self-paced courses"
          />
        </section>
        <hr className="u-section-underline--no-margins" />
        <section className="o-wrapper-medium">
          <LearningEvents
            events={courses2}
            type={courses2.length > 1 ? CARD_TYPE.MEDIUM : CARD_TYPE.FULL}
            title="Expert-led courses"
            text="In-depth, expert-led courses for our partner agencies"
          />
        </section>

        <section className="o-wrapper-medium o-wrapper-tablet-full">
          <Banner title={'What participants say'}>
            {resources.length > 0
              ? resources
                .filter(r => r._type === 'testimonial')
                .map(r => <Testimonial key={r._id} testimonial={r} />)
              : (<Testimonial key={1} testimonial={defaultTestimonial} />)
              }
          </Banner>
        </section>

        <div className="o-wrapper-medium u-top-margin--64">
          <TextImage text={boxAndImg1.block} image={boxAndImg1.img} imagePosition={true} />
          <TextImage text={boxAndImg2.block} image={boxAndImg2.img} imagePosition={false} />
        </div>

        <div className="o-wrapper-medium o-wrapper-tablet-full u-top-margin--48">
          <Banner onDark={false}>
            <BlockContent blocks={twoCols} serializers={serializers} />
          </Banner>
        </div>

        <div className="o-wrapper-medium u-top-margin--64">
          <hr className="u-section-underline--no-margins" />
          <div className="o-grid-container--2">
            {(persons.personLeft?.length > 0) &&
              <Team
                type={PERSON_CARD_TYPE.IMAGE_LEFT}
                heading={persons.headingLeft}
                members={persons.personLeft}
              />}
            {(persons.personRight?.length > 0) &&
              <Team
                type={PERSON_CARD_TYPE.IMAGE_LEFT}
                heading={persons.headingRight}
                members={persons.personRight}
              />}
          </div>
        </div>

      </div>

      <div id="modal" />
    </Layout>
  );
};

export async function generateMetadata({ params }) {

  const data = await getData( params );
  const {
    title = '', 
    longTitle = '', 
    featuredImage = ''
  } = data;
 
  return getMetadata({
    title: title,
    description: longTitle,
    image: featuredImage
  });
}


const sanityQuery = groq`*[_type=="frontpage" && ((slug.current == "online-courses-NEW") || (_id == "BFLko89wLLImRF8IEozLT9"))][0]{ 
  title, 
  longTitle, 
  "slug": slug.current, 
  lead, 
  leadLinks, 
  _id, 
  sections[]{..., 
    personLeft[]->{_id,firstName,surname,email,position,twitter,linkedin,facebook,"slug": slug.current,image{asset->{url}}},
    personRight[]->{_id,firstName,surname,email,position,twitter,linkedin,facebook,"slug": slug.current,image{asset->{url}}}, 
    coursesRef[]->{
      _type,title,lead,language,startDate{utc,local},location,"slug": slug.current,courseType,
      "featuredImage": featuredImage.asset->url
    } 
  }, 
  "persons": sections[8]{
    ..., 
    personLeft[]->{_id,firstName,surname,email,position,twitter,linkedin,facebook,"slug": slug.current,image{asset->{url}}},
    personRight[]->{_id,firstName,surname,email,position,twitter,linkedin,facebook,"slug": slug.current,image{asset->{url}}}
  }, 
  resources[]->, 
  "featuredImage": featuredImage.asset->url
}`;

async function getData( params ) {
  const data = await fetchAndMaterialize( {
    query: sanityQuery, 
    params, 
    materializeDepth: 1,
    tags: ['frontpage:online-courses-NEW']
  });
  return data;
};