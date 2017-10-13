import React, { Component } from 'react';
import Head from 'next/head';
import { Link } from '../routes';
import DataLoader from '../helpers/data-loader';

import { Layout, ExtendedBlockContent, Accordion, Team, Person, Mosaic, Newsletter, PartnerPromo } from '../components';
import { DownArrowButton, RightArrowButton } from '../components/buttons';
import { Basics, Picture, Publication, Resources, ArrowRight } from '../components/icons';
import LinkBox from '../components/LinkBox';

const TopicEntry = ({
  topic: {
    title = '',
    longTitle = '',
    explainerText = 'Topic has no explainerText',
    featuredImage,
    parent = {},
    slug = {},
    introduction = [],
    agenda = [],
    advisors = [],
    resources = [],
    _id = '',
    _type = '',
  } = {},
}) => (
  <Layout>
    <div className="o-wrapper">
      <p>
        <Link route={'/topics'}>
          <a className="c-topic-page__back">← Topic overview</a>
        </Link>
      </p>
      <h1 className="c-topic-page_title">{title}</h1>
      <h2 className="c-topic-page__longTitle">{longTitle}</h2>
      <div className="u-margin-bottom">
        <DownArrowButton
          text="Browse our resources"
          onClick={() => document.getElementById('resources').scrollIntoView(true)}
        />
      </div>
      <section className="c-boxOnImage u-margin-bottom-huge">
        {featuredImage && (
          <figure className="c-boxOnImage__figure">
            <img alt={featuredImage.asset.altText} src={featuredImage.asset.url} />
          </figure>
        )}
        <div className="c-boxOnImage__body">
          <p>{explainerText}</p>
          <ul className="c-link-list">
            See also
            <li className="c-link-list__item">
              <Link>
                <a className="c-link-list__link">
                  Area 1 <ArrowRight className="c-link-list__icon" />
                </a>
              </Link>
            </li>
            <li className="c-link-list__item">
              <Link>
                <a className="c-link-list__link">
                  Area 2 <ArrowRight className="c-link-list__icon" />
                </a>
              </Link>
            </li>
            <li className="c-link-list__item">
              <Link>
                <a className="c-link-list__link">
                  Area 3 <ArrowRight className="c-link-list__icon" />
                </a>
              </Link>
            </li>
          </ul>
          <DownArrowButton
            modifier="secondary"
            text="Contact one of our advisors"
            onClick={() => document.getElementById('advisors').scrollIntoView(true)}
          />
        </div>
      </section>
      <h2 className="c-topic-section__title">
        From basic guides to indepth perspectives, all in one place.
      </h2>
      <section className="c-linkbox-wrapper">
        <LinkBox
          title="Read our essential guide"
          text="Let us walk you through the basics of this topic"
          icon={Basics}
          route="topic.article"
          params={{ slug, topicPart: 'basics' }}
        />
        <LinkBox
          title="Get the bigger picture"
          text="Read our research and policy agenda to see where things are at with this topic world wide."
          icon={Picture}
          route="topic.article"
          params={{ slug, topicPart: 'agenda' }}
        />
      </section>

      <h2 className="c-topic-section__title">
        Inform your anti-corruption work with handpicked topic related publications, insights and
        ideas.
      </h2>
      <section>
        <div id="resources" className="o-wrapper-medium">
          <Mosaic resources={resources} />
        </div>
        <h2 className="c-topic-section__cta">
          <a href="#">Explore all our resources &nbsp;<ArrowRight /></a>
        </h2>
      </section>
    </div>


    { advisors.length ?
      <div id="advisors" className="c-topic-section--lightblue">
        <div className="o-wrapper">
          <Team title="We’re the team developing this topic" members={advisors} linkLabel="Bio" />
          <h2 className="c-topic-section__cta">
            <a href="#">The whole U4 team &nbsp;<ArrowRight /></a>
          </h2>
        </div>
      </div>
      : null}

    <div id="partners" className="c-topic-section">
      <div className="o-wrapper">
        <PartnerPromo />
      </div>
    </div>

    <Newsletter />

  </Layout>
);
export default DataLoader(TopicEntry, {
  queryFunc: ({ query: { slug = '' } }) => {
    console.log('topic slug is this', slug);
    return {
      sanityQuery:
        '{ "topic": *[slug.current == $slug]{...,"resources": resources[]->{_id,_type, title,"slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title,  "imageUrl": featuredImage.asset->url}}[0]}',
      param: { slug },
    };
  },
  materializeDepth: 2,
});
