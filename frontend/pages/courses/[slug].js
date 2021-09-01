import React, { useRef, useState } from 'react';
import Link from 'next/link';
import DataLoader from '../../helpers/data-loader';
import BlockContent from '@sanity/block-content-to-react';
import Layout from '../../components/Layout';
import { useScrollInfo } from '../../helpers/useScrollInfo';
import { CourseHeader } from '../../components/courses/CourseHeader';
import { BreadCrumbV2 } from '../../components/general/BreadCrumbV2';
import { CourseSidebar } from '../../components/courses/CourseSidebar';
import { ShareOpen } from '../../components/general/social/ShareOpen';
import serializers from '../../components/serializers/serializers';
import { PersonBasic } from '../../components/PersonBasic';
import LogoU4 from '../../components/icons/LogoU4';
import { RegisterForm } from '../../components/courses/RegisterForm';
import Footer from '../../components/general/footer/Footer';
import { Team } from '../../components/general/team/Team';
import { PERSON_CARD_TYPE } from '../../components/general/person/PersonCard';

const CoursePage = ({ data: { course = {} }, url = {} }) => {
  const {
    title = '',
    featuredImage = {},
    lead = '',
    content = [],
    contact = [],
    courseType = 18,
    coordinator = [],
    developer = [],
  } = course;

  return (
    <Layout
      headComponentConfig={{
        title,
        description: lead,
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: {},
      }}
    >
      <div className="c-course-entry">
        <section className="o-wrapper-medium">
          <BreadCrumbV2 title={`Online Courses`} parentSlug={'/online-courses'} home={true} />
          <CourseHeader data={course} />
        </section>
        <hr className="u-section-underline--no-margins" />
        <section className="o-wrapper-medium">
          <div className="">
            <div className="c-longform c-article__col">
              {content ? <BlockContent blocks={content} serializers={serializers} /> : null}
            </div>
            <div className="c-article__side c-article__col">
              <CourseSidebar data={course} side={'right'} />
            </div>
          </div>
        </section>
        <section className="o-wrapper-medium u-top-margin--64">
          <hr className="u-section-underline--no-margins" />
          <div className="o-grid-container--2">
            {developer.length > 0 && (
              <Team
                type={PERSON_CARD_TYPE.IMAGE_LEFT}
                heading="Course experts"
                members={developer}
              />
            )}
            {coordinator.length > 0 ? (
              <Team
                type={PERSON_CARD_TYPE.IMAGE_LEFT}
                heading="Course coordinator"
                members={coordinator}
              />
            ) : contact.length > 0 ? (
              <Team
                type={PERSON_CARD_TYPE.IMAGE_LEFT}
                heading="Course coordinator"
                members={contact}
              />
            ) : null}
          </div>
        </section>

            {/* <h3 className="u-heading--2">Course experts</h3>
            {developer.length > 0
              ? developer.map((c, index) =>
                  c._id !== 'author-31' ? (
                    <div key={index}>
                      <h4 className="u-heading--3">Course developer & facilitator</h4>
                      <PersonBasic person={c} showEmail={false} />
                    </div>
                  ) : null
                )
              : null}
            {coordinator.length > 0
              ? coordinator.map((c, index) => (
                  <div key={index}>
                    <h4 className="u-heading--3">Course coordinator</h4>
                    <PersonBasic person={c} showEmail={false} />
                  </div>
                ))
              : contact.length > 0
              ? contact.map((c, index) =>
                  c._id === 'author-31' ? (
                    <div key={index}>
                      <h4 className="u-heading--3">Course coordinator</h4>
                      <PersonBasic person={c} showEmail={false} />
                    </div>
                  ) : null
                )
              : null} */}

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

      {/* {courseType.waitingListId !== 15 && courseType.waitingListId !== 16 && contact.length > 0 && (
        <div id="contacts" className="c-topic-section--lightblue o-wrapper-full-width">
          <Team
            title={
              contact.length > 1
                ? 'We’re the team responsible for this course'
                : 'I’m responsible for this course'
            }
            sayHi
            members={contact}
            linkLabel="Read full bio"
          />
        </div>
      )} */}
      <Footer />
    </Layout>
  );
};

export default DataLoader(CoursePage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
       "course": *[_type=="course" && slug.current == $slug][0]{title, language, link, startDate, endDate, lead, content, slug, cost, duration, commitment,
          "courseType": courseType->{ title, waitingListId},
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
        "coordinator": coordinator[]->{
          _id,
           title,
           "image": image.asset->{"asset": { "url": url}},
           image,
           position,
           firstName,
           surname,
           email,
           slug,
           bio
         },
         "developer": developer[]->{
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
        otherLanguages[]->{_id, title, language, slug},
        topics[]->{ _id, title, slug }, 
        keywords,  _id, 
        "featuredImage": {
          "asset": featuredImage.asset->{
            "altText": altText,
            "url": url
          }
        },
        vimeo,
        pdfAsset}}`,
    param: { slug },
  }),
  materializeDepth: 5,
});
