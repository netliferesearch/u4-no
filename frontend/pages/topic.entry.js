import React, { Component } from 'react';
import { Link } from '../routes';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';

import { Layout, ExtendedBlockContent, Accordion, Team } from '../components';
import { DownArrowButton, RightArrowButton } from '../components/buttons';
import { Basics, Picture, Publication, Resources, ArrowRight } from '../components/icons';
import LinkBox from '../components/LinkBox';

const teamMembers = [
  {
    id: 1,
    featuredImage: {
      asset: {
        url:
          'https://cdn.sanity.io/images/1f1lcoov/production/t3Yvuyac5OKZbUz1Sc6HFKeW-684x892.jpg',
      },
    },
    name: 'Kendra Dupuy',
    position: 'SENIOR PROGRAMME ADVISOR',
    phone: '+47 479 38 073',
    email: 'aled.williams@cmi.no',
  },
  {
    id: 2,
    featuredImage: {
      asset: {
        url:
          'https://cdn.sanity.io/images/1f1lcoov/production/t3Yvuyac5OKZbUz1Sc6HFKeW-684x892.jpg',
      },
    },
    name: 'Kendra Dupuy',
    position: 'SENIOR PROGRAMME ADVISOR',
    phone: '+47 479 38 073',
    email: 'aled.williams@cmi.no',
  },
];

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
          <a>← Topic overview</a>
        </Link>
      </p>
      <h1 className="c-topic-page_title">{title}</h1>
      <h2 className="c-topic-page__longTitle">{longTitle}</h2>
      <div className="u-margin-bottom">
        <DownArrowButton text="Browse our resources" />
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
            onClick={() => console.log('clicked!')}
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
          params={{ slug: slug.current, topicPart: 'basics', refid: _id }}
        />
        <LinkBox
          title="Get the bigger picture"
          text="Read our research and policy agenda to see where things are at with this topic world wide."
          icon={Picture}
          route="topic.article"
          params={{ slug: slug.current, topicPart: 'agenda', refid: _id }}
        />
      </section>

      <h2 className="c-topic-section__title">
        Inform your anti-corrupion work with handpicked topic related publications, insights and
        ideas.
      </h2>
      <section>
        <h2 className="c-statement">
          Inform your anti-corruption work with handpicked topic related publications, insights and
          ideas.
        </h2>
        <div className="o-wrapper-medium c-mosaic">
          {resources.length ? (
            <div
              className="c-mosaic_item"
              style={{
                backgroundImage: `url(${resources[0].imageUrl})`,
              }}
            >
              >
            </div>
          ) : null}
          {resources.map(
            ({ title = '', _id = '', _type = '', imageUrl = '', titleColor = '#FFF' }, index) => (
              <a
                href={`/publications/${_id}`}
                className={`c-mosaic_item ${index % 4 === 2
                  ? 'c-mosaic_item--backgroundImage'
                  : ''} ${index % 4 === 2 && titleColor === '#000'
                  ? 'c-mosaic_item--backgroundImage-invert'
                  : ' '}`}
                style={{
                  backgroundImage: `url(${index % 4 === 2 ? imageUrl : ''})`,
                }}
              >
                <div className="c-mosaic_item-content">
                  <div
                    className="c-mosaic_item-content__meta"
                    style={{
                      color: index % 4 === 2 ? titleColor : ' ',
                    }}
                  >
                    {_type}
                  </div>
                  <div>
                    <h3
                      style={{
                        color: index % 4 === 2 ? titleColor : ' ',
                      }}
                    >
                      {title}
                    </h3>
                  </div>
                </div>
              </a>
            ),
          )}
        </div>
        <h2 className="c-statement">
          <a href="#">Explore all our resources -></a>
        </h2>
      </section>
    </div>

    <Team title="We’re the team developing this topic" members={teamMembers} />

    <Head>
      <style>
        {`
        .c-mosaic_item{
          position:relative;
        }
        .c-mosaic_item--backgroundImage::after {
        content: "";
        position: absolute;
        display: block;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        opacity: .3;

      }
      `}
      </style>
    </Head>
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
