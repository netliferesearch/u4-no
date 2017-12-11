import React, { Component } from 'react';
import Head from 'next/head';
import { Link } from '../routes';
import DataLoader from '../helpers/data-loader';

import {
  Footer,
  Layout,
  Accordion,
  Team,
  Person,
  Mosaic,
  Newsletter,
  PartnerPromo,
  LinkList,
} from '../components';
import { DownArrowButton, RightArrowButton } from '../components/buttons';
import {
  BasicGuide,
  ResearchAgenda,
  Picture,
  Publication,
  Resources,
  ArrowRight,
} from '../components/icons';
import LinkBox from '../components/LinkBox';

const TopicEntry = ({
  topic: {
    title = '',
    longTitle = '',
    explainerText = '',
    featuredImage,
    linkListContent = false,
    parent = {},
    slug = {},
    introduction = [],
    agenda = [],
    advisors = [],
    resources = [],
    relatedUrl = {},
    _id = '',
    _type = '',
    url = {},
  } = {},
}) => (
  <Layout
    headComponentConfig={Object.assign(
      {
        title,
        description: explainerText,
        image: featuredImage && featuredImage.asset ? featuredImage.asset.url : '',
        url: url.asPath ? `beta.u4.no${url.asPath}` : '',
        ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
      },
      relatedUrl,
    )}
  >
    <div>
      <h1 className="c-topic-page_title">{title}</h1>
      <h2 className="c-topic-page__longTitle">{longTitle}</h2>
      <section className="c-boxOnImage u-margin-bottom-huge">
        {featuredImage ? (
          <figure className="c-boxOnImage__figure">
            <img
              alt={featuredImage.asset.altText}
              src={`${featuredImage.asset.url}?w=1600&h=800&fit=crop&crop=focalpoint`}
            />
            {featuredImage.caption && (
              <span className="c-boxOnImage__caption">{featuredImage.caption}</span>
            )}
          </figure>
        ) : null}
        <div className="c-boxOnImage__body">
          <p>{explainerText}</p>
          {linkListContent && <LinkList title="Related topics" content={linkListContent} />}
        </div>
      </section>
      {introduction.length + agenda.length > 0 && (
        <div>
          <h2 className="c-topic-section__title c-topic-section__title--large">
            From basic guides to indepth perspectives, all in one place.
          </h2>
          <section className="c-linkbox-wrapper">
            {introduction.length > 0 && (
              <LinkBox
                title="Basic guide"
                text={`Read our introduction to corruption and anti-corruption efforts in ${title.toLowerCase()}.`}
                icon={BasicGuide}
                route={introduction.length ? 'topic.article' : '#'}
                params={{ slug: slug.current, topicPart: 'basics' }}
              />
            )}
            {agenda.length > 0 && (
              <LinkBox
                title="Research and policy agenda"
                text={`Discover what U4 and others do to advance research and reduce corruption in ${title.toLowerCase()}.`}
                icon={ResearchAgenda}
                route={agenda.length ? 'topic.article' : '#'}
                params={{ slug: slug.current, topicPart: 'agenda' }}
              />
            )}
          </section>
        </div>
      )}
      {resources.length ? (
        <div>
          <h2 className="c-topic-section__title">
            Inform your anti-corruption work with handpicked topic related publications, insights
            and ideas.
          </h2>

          <section className="c-topic-section u-padding-top-none">
            <div id="resources" className="o-wrapper-medium">
              <Mosaic resources={resources} />
            </div>
            <h2 className="c-topic-section__cta">
              <a href="/search">
                Explore all our resources &nbsp;<ArrowRight />
              </a>
            </h2>
          </section>
        </div>
      ) : null}
    </div>

    {advisors.length ? (
      <div id="advisors" className="c-topic-section--lightblue o-wrapper-full-width">
        <Team
          title={
            advisors.length > 1
              ? 'We’re the team developing this topic.'
              : 'I’m developing this topic.'
          }
          members={advisors}
          linkLabel="Read full bio"
        />
        <h2 className="c-topic-section__cta">
          <a href="/the-team">
            The whole U4 team &nbsp;<ArrowRight />
          </a>
        </h2>
      </div>
    ) : null}

    <div id="partners" className="c-topic-section">
      <PartnerPromo />
    </div>

    <Newsletter />

    <Footer />
  </Layout>
);
export default DataLoader(TopicEntry, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery:
      '{"topic": *[slug.current == $slug]{...,"advisors": advisors[]->{_id, title, image, position, firstName, surname, email, slug, bio}, "linkListContent": coalesce(*[_type == "topics" && references(^._id)]{title, "link": slug.current},parent->{title, "link": slug.current}), "resources": resources[]->{_id,_type, "publicationType": publicationType->title, title,"slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title,  "imageUrl": featuredImage.asset->url}}[0]}',
    param: { slug },
  }),
  materializeDepth: 4,
});
