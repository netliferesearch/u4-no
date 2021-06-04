import React, { Component } from 'react';

import dateToString from '../../helpers/dateToString';
import DataLoader from '../../helpers/data-loader';

import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import Newsletter from '../../components/Newsletter';
import ServiceArticle from '../../components/ServiceArticle';
import Team from '../../components/Team';
import LinkToItem from '../../components/LinkToItem';


const EventPage = ({ data: { event = {} }, url = {} }) => {
  const {
    title = '',
    eventType = '',
    location = '',
    startDate = {},
    endDate = {},
    organiser = '',
    featuredImage = {},
    leadText = '',
    content = [],
    eventLink = {},
    contact = [],
    relatedContent = [],
    topics = [],
    keywords = [],
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
      <div className="c-oneColumnBox c-oneColumnBox__darkOnWhite">
        <div className="o-wrapper-inner u-margin-top u-margin-bottom-large">
          <div>
            <p className="c-longform-grid__standard">
              <a href="/workshops-and-events">Workshops and events</a>
              {eventType === 'incountryworkshop' && ' - In-country workshop'}
              {eventType === 'hqworkshop' && ' - HQ workshop'}
            </p>
            <h2 className="c-longform-grid__standard">{title}</h2>
            {location && <p className="c-longform-grid__standard">{location}</p>}
            {startDate.local && (
              <p className="c-longform-grid__standard">
                {dateToString({
                  start: startDate.local,
                  end: endDate.local,
                  format: 'D MMMM, YYYY',
                })}
              </p>
            )}
            {organiser && <p className="c-longform-grid__standard">Organiser: {organiser}</p>}
            {leadText && <p className="c-longform-grid__standard">{leadText}</p>}
          </div>
          {content ? <ServiceArticle blocks={content} /> : null}

          {topics.length > 0 && (
            <p className="c-longform-grid__standard">
              Related topics:{' '}
              {topics.map(({ _ref = '', target = {} }) => (
                    <LinkToItem _type={target._type} slug={target.slug} >
                    <a className="c-article-header__link-item">{target.title}</a>
                    </LinkToItem>
                ))}
            </p>
          )}
        </div>
      </div>
      {contact.length > 0 && (
        <div id="contacts" className="c-topic-section--lightblue o-wrapper-full-width">
          <Team
            title={
              contact.length > 1
                ? 'We’re the team responsible for this event'
                : 'I’m responsible for this event'
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

export default DataLoader(EventPage, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: `{
       "event": *[_type=="event" && slug.current == $slug][0]{title, eventType, location, startDate, endDate, organiser, leadText, content, slug, eventLink,
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
        relatedContent, topics, keywords,  _id, "featuredImage": featuredImage.asset->url}}`,
    param: { slug },
  }),
  materializeDepth: 5,
});
