import React, { Component } from 'react';
import Link from 'next/link';
import DataLoader from '../../helpers/data-loader';
import languageName from '../../helpers/languageName';

import { Footer, Layout, Newsletter, ServiceArticle } from '../../components';
import { Team } from '../../components';

const CoursePage = ({ data: { course = {} }, url = {} }) => {
  const {
    title = '',
    language = '',
    link = '',
    startDate = {},
    endDate = {},
    featuredImage = {},
    lead = '',
    content = [],
    contact = [],
    relatedContent = [],
    topics = [],
    keywords = [],
    courseType = 18,
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
      <div className="c-oneColumnBox c-oneColumnBox__darkOnWhite">
        <div className="o-wrapper-inner u-margin-top u-margin-bottom-large">
          <div>
            <p className="c-longform-grid__standard">
              <a href="/online-courses">Online courses</a>
            </p>
            <h2 className="c-longform-grid__standard">{title}</h2>
            {lead && <p className="c-longform-grid__standard">{lead}</p>}
            {false && startDate.utc && (
              <p className="c-longform-grid__standard">
                {startDate.utc.split('T')[0]} {endDate.utc && `${endDate.utc.split('T')[0]}`}
              </p>
            )}
            {false && language && (
              <p className="c-longform-grid__standard">
                Language: {languageName({ langcode: language })}
              </p>
            )}
          </div>
          {content ? <ServiceArticle blocks={content} /> : null}

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
          )}

          {false && topics.length > 0 && (
            <p className="c-longform-grid__standard">
              Related topics:{' '}
              {topics.map(({ _ref = '', target = {} }) => (
                <Link key={_ref} href={`/topics/${target.slug.current}`} >
                  <a className="c-article-header__link-item">{target.title}</a>
                </Link>
              ))}
            </p>
          )}
        </div>
      </div>

      {courseType !== 15 && courseType !== 16 && contact.length > 0 && (
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
      )}
      <Newsletter />
      <Footer />
    </Layout>
  );
};

export default DataLoader(CoursePage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
       "course": *[_type=="course" && slug.current == $slug][0]{title, language, link, startDate, endDate, lead, content, slug,
          "courseType": courseType->waitingListId,
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
        topics, keywords,  _id, "featuredImage": featuredImage.asset->url}}`,
    param: { slug },
  }),
  materializeDepth: 5,
});
