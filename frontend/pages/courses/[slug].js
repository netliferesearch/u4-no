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

  const [scrolled, setScrolled] = useState(false);
  const introRef = useRef(null);

  useScrollInfo(
    ({ currPos }) => {
      const isScrolled = currPos.y < 70;
      if (scrolled !== isScrolled) {
        setScrolled(isScrolled);
      }
    },
    [scrolled],
    introRef,
    false,
    0
  );

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
      <div className="c-course-entry c-article-v2">
        {scrolled ? (
          <div className="c-header--fixed">
            <div className="u-scroll-bar">
              <div className="c-header--fixed__content ">
                <div>
                  <Link href="/">
                    <a className="u-no-underline">
                      <LogoU4 />
                    </a>
                  </Link>
                </div>
                <div className="u-flex-start-center">
                  <p className="u-text--grey u-hidden--tablet">
                    A one sentence upsell of the generic value of U4 Online courses
                  </p>
                  <RegisterForm courseType={courseType.waitingListId} />
                  <ShareOpen text={title} />
                </div>
              </div>
            </div>
            <hr className="u-section-underline--no-margins" />
          </div>
        ) : null}
        <section className="o-wrapper u-side-padding">
          <CourseHeader data={course} />
          <span ref={introRef} />
        </section>
        <hr className="u-section-underline--no-margins" />
        <section className="o-wrapper u-side-padding">
          <div className="o-wrapper-section c-article__row">
            <div className="c-article__side c-article__col">
              <CourseSidebar data={course} side={'left'} />
            </div>
            <div className="content c-article__col c-article__center">
              <div className="c-article-v2 o-wrapper-section c-article-v2__main-text">
                {content ? <BlockContent blocks={content} serializers={serializers} /> : null}
              </div>
              <hr className="u-section-underline--no-margins" />
              <div
                id="additional-info"
                className="c-article__additional-info-container o-wrapper-section"
              >
                <h3 className="u-heading--2">Course experts</h3>
                <p className="u-text--grey">Text about the value of U4 experts</p>
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
                  : null}
              </div>
            </div>
            <div className="c-article__side c-article__col">
              <CourseSidebar data={course} side={'right'} />
            </div>
          </div>
        </section>
        <div className="o-wrapper-inner u-margin-top u-margin-bottom-large">
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
        </div>
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