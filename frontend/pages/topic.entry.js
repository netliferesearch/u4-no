import React, { Component } from 'react';
import { Link } from '../routes';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';

import { Layout, ExtendedBlockContent, Accordion } from '../components';
import { DownArrowButton, RightArrowButton } from '../components/buttons';
import { Basics, Picture, Publication, Resources } from '../components/icons';
import LinkBox from '../components/LinkBox';

const TopicEntry = ({
  topic: {
    title = '',
    longTitle = '',
    explainerText = 'Topic has no explainerText',
    featuredImage,
    parent = {},
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
      <h2 className="c-topic-page__longTitle u-margin-bottom">{longTitle}</h2>
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
          <ul>
            See also
            <li>Area 1 ></li>
            <li>Area 2 ></li>
            <li>Area 3 ></li>
          </ul>
          <DownArrowButton
            modifier="secondary"
            text="Contact one of our advisors"
            onClick={() => console.log('clicked!')}
          />
        </div>
      </section>

      <section className="c-linkbox-wrapper">
        <LinkBox
          title="Read our essential guide"
          text="Let us walk you through the basics of this topic"
          icon={Basics}
          route="topic.article"
          params={{ id: _id, topicPart: 'basics', refid: _id }}
        />
        <LinkBox
          title="Get the bigger picture"
          text="Read our research and policy agenda to see where things are at with this topic world wide."
          icon={Picture}
          route="topic.article"
          params={{ id: _id, topicPart: 'agenda', refid: _id }}
        />
      </section>

      <section>
<<<<<<< HEAD
        <h2 className="c-topic-page__subTitle">Inform your anti-corruption work with handpicked topic related publications, insights and ideas.</h2>
        <div className="c-mosaic">
          <div className="c-mosaic_item" style={{
              backgroundImage: `url(${resources[0].imageUrl})`,
            }}>></div>
          {resources.map(({title = '', _id = '', _type = '', imageUrl= '', titleColor = '#FFF' }, index) => (
            <a href={`/publications/${_id}`}
              className={`c-mosaic_item ${(index % 4) === 2 ? "c-mosaic_item--backgroundImage"  : ''  } ${(index % 4) === 2 && titleColor === "#000" ? "c-mosaic_item--backgroundImage-invert"  : ' '  }` }
              style={{
                  backgroundImage: `url(${(index % 4) === 2 ? imageUrl  : '' })`,
                }}>
              <div className="c-mosaic_item-content">
                <div className="c-mosaic_item-content__meta" style={{
                    color: (index % 4) === 2 ? titleColor  : ' ' ,
                  }
                  }>{_type}</div>
                <div>
                  { console.log()}
                  <h3 style={{
                      color: (index % 4) === 2 ? titleColor  : ' ' ,
                    }
                    }>{title}</h3>
=======
        <h2>Publications, insights, and ideas to inform your anti-corruption work.</h2>
        {resources.length > 0 && (
          <div className="c-mosaic">
            <div
              className="c-mosaic_item"
              style={{
                backgroundImage: `url(${resources[0].imageUrl})`,
              }}
            >
              >
            </div>
            {resources.map(({ title = '', _id = '', _type = '', imageUrl = '' }, index) => (
              <a
                href={`/publications/${_id}`}
                className="c-mosaic_item"
                style={{
                  backgroundImage: `url(${index % 4 === 2 ? imageUrl : ''})`,
                }}
              >
                <div className="c-mosaic_item-content">
                  <div className="c-mosaic_item-content__meta">{_type}</div>
                  <div>
                    <h3>{title}</h3>
                  </div>
>>>>>>> 6dadc3e9dc68afe2c75b5241366e8032f81885df
                </div>
              </a>
            ))}
          </div>
<<<<<<< HEAD
          <a href="#">Explore all our resources -></a>
      </section>
        <p>Hi! We’re the team developing this topic</p>


      <section>


=======
        )}
>>>>>>> 6dadc3e9dc68afe2c75b5241366e8032f81885df
      </section>
    </div>

    <Head>
      <style>{`
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
  queryFunc: ({ query: { id = '' } }) => ({
<<<<<<< HEAD
    sanityQuery: '{ "topic": *[_id == $id]{...,"resources": resources[]->{_id,_type, title,"slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title,  "imageUrl": featuredImage.asset->url}}[0]}',
=======
    sanityQuery:
      '{ "topic": *[_id == $id]{...,"resources": resources[]->{_id,_type, title,"slug": slug.current,"imageUrl": featuredImage.asset->url}}[0]}',
>>>>>>> 6dadc3e9dc68afe2c75b5241366e8032f81885df
    param: { id },
  }),
  materializeDepth: 2,
});
