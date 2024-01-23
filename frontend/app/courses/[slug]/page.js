import Layout from '@/app/components/layout/Layout';
import getMetadata from '@/app/lib/getMetadata';
import { fetchAndMaterialize } from '@/app/lib/sanity/fetchAndMaterialize';
import hasContent from '@/app/lib/util/hasContent';
import Link from 'next/link';
import BlockContent from '@sanity/block-content-to-react';
import { CourseHeader } from 'components/courses/CourseHeader';
import { BreadCrumbV2 } from 'components/general/BreadCrumbV2';
import { CourseSidebar } from 'components/courses/CourseSidebar';
import { ShareOpen } from 'components/general/social/ShareOpen';
import serializers from 'components/serializers/serializers';
import { PersonBasic } from 'components/PersonBasic';
import LogoU4 from 'components/icons/LogoU4';
import { RegisterForm } from 'components/courses/RegisterForm';
import Footer from 'components/general/footer/Footer';
import { Team } from 'components/general/team/Team';
import { PERSON_CARD_TYPE } from 'components/general/person/PersonCard';
import { groq } from 'next-sanity';

export default async function Course({ params }){

  const data = await getData(params);
  const {
    title = '',
    featuredImage = {},
    lead = '',
    content = [],
    contact = [],
    courseType = 18,
    method = '',
    cost = '',
    duration = '',
    commitment = '',
    // coordinator = [],
    expert = [],
    language = 'en_US',
    startDate = null,
    endDate = null,
  } = data;

  return (
    <Layout>
      <div className="c-course-entry" dir={language === 'ar_AR' ? 'rtl' : 'ltr'}>

        <section className="o-wrapper-medium">
          <BreadCrumbV2 title="Online Courses" parentSlug="/online-courses" home />
          <CourseHeader data={data} />
        </section>

        <hr className="u-section-underline--no-margins" />

        <section className="o-wrapper-medium">
          <div className="c-course-entry__content">
            <div className="c-longform u-margin--course-top c-article__col">
              {content ? <BlockContent blocks={content} serializers={serializers} /> : null}
              <div className="c-course-entry__btn-row">
                <RegisterForm courseType={courseType.waitingListId} language={language} />
                <ShareOpen text={title} language={language} />
              </div>
            </div>
            <div className="c-article__side c-article__col">
              <CourseSidebar data={data} />
            </div>
          </div>
        </section>

        <section className="o-wrapper-medium u-bottom-margin--24">
          <hr className="u-section-underline--no-margins" />
          <div className="o-grid-container--2">
            {hasContent(expert) && (
              <Team type={PERSON_CARD_TYPE.IMAGE_TOP} heading="Experts" members={expert} />
            )}
            {hasContent(contact) && (
              <Team type={PERSON_CARD_TYPE.IMAGE_TOP} heading="Coordinators" members={contact} />
            )}
          </div>
        </section>
        <div />

        {/*
          {courseType !== 15 && courseType !== 16 && (
            <div className="o-wrapper-inner u-margin-top u-margin-bottom-large">
              <div>
                <iframe
                  title="signup"
                  src={`https://partner.u4.no/signup/?course=${courseType}`}
                  width="100%"
                  height="450px"
                  scrolling="auto"
                  style={{ border: 0, overflow: 'hidden' }}
                >
                  Your browser seems to have problems with our sign-up form. Send an e-mail to
                  course@u4.no if you wish to sign up for this course.
                </iframe>
              </div>
            </div>
          )}

          {courseType === 15 && (
            <iframe
              title="Course"
              src="https://partner.u4.no/course/brick1/"
              width="100%"
              height="600px"
              scrolling="no"
              style={{ border: 0, overflow: 'hidden' }}
            >
              Your browser seems to have problems with iframes. Please try a different browser!
            </iframe>
          )}

          {courseType === 16 && (
            <iframe
              title="Course"
              src="https://partner.u4.no/course/brick1-fr/"
              width="100%"
              height="600px"
              scrolling="no"
              style={{ border: 0, overflow: 'hidden' }}
            >
              Your browser seems to have problems with iframes. Please try a different browser!
            </iframe>
          )} */}

        <div id="modal" />
      </div>
    </Layout>
  );
};

export async function generateMetadata({ params }) {

  const data = await getData(params);
  const {
    title = '',
    lead = '',
    featuredImage = '',
  } = data;

  return getMetadata({
    title: title,
    description: lead,
    image: featuredImage?.asset?.url
  });
}

const sanityQuery = groq`*[_type=="course" && slug.current == $slug][0]{
  _id, 
  title, 
  language, 
  link, 
  startDate{"utc": local}, 
  endDate{"utc": local}, 
  lead, 
  content, 
  "slug": slug.current, 
  method, 
  cost, 
  duration, 
  commitment,
  "courseType": courseType->{ 
    title, 
    waitingListId
  },
  "contact": contact[]->{
    _id,
    title,
    "image": image.asset->{"asset": { "url": url}},
    position,
    firstName,
    surname,
    email,
    "slug": slug.current,         
  },
  "coordinator": coordinator[]->{
    _id,
    title,
    "image": image.asset->{"asset": { "url": url}},
    position,
    firstName,
    surname,
    email,
    "slug": slug.current, 
  },
  "expert": expert[]->{
    _id,
    title,
    "image": image.asset->{"asset": { "url": url}},
    position,
    firstName,
    surname,
    email,
    "slug": slug.current,
  },
  otherLanguages[]->{
    _id, 
    title, 
    language, 
    "slug": slug.current
  },
  topics[]->{
    _id, 
    title, 
    "slug": slug.current
  },
  keywords,
  featuredImage{_type,asset->{url,altText,metadata{lqip,dimensions{width,height}}}},
  vimeo,
  pdfAsset
}`;

async function getData(params) {
  const data = await fetchAndMaterialize({
    query: sanityQuery,
    params,
    tags: [`course:${params.slug}`],
    materializeDepth: 2
  });
  return data;
};

export async function generateStaticParams() {
  const sanityQuery = groq`*[_type == 'course']{ "slug": slug.current } | order(_updatedAt desc) [0..1000]`;
  const data = await fetchAndMaterialize({ query: sanityQuery, materializeDepth: 0 });
  return data;
};