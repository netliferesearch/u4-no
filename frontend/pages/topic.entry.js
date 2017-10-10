import React, { Component } from 'react';
import { Link } from '../routes';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';

import { Layout, ExtendedBlockContent, Accordion } from '../components';
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
        <h2 className="c-statement">Inform your anti-corruption work with handpicked topic related publications, insights and ideas.</h2>
        <div className="o-wrapper-medium c-mosaic">
          {resources.length ?
            <div
              className="c-mosaic_item"
              style={{
                backgroundImage: `url(${resources[0].imageUrl})`,
              }}
            >></div>
            : null }
          {resources.map(({ title = '', _id = '', _type = '', imageUrl = '', titleColor = '#FFF' }, index) => (
            <a
              href={`/publications/${_id}`}
              className={`c-mosaic_item ${(index % 4) === 2 ? 'c-mosaic_item--backgroundImage' : ''} ${(index % 4) === 2 && titleColor === '#000' ? 'c-mosaic_item--backgroundImage-invert' : ' '}`}
              style={{
                backgroundImage: `url(${(index % 4) === 2 ? imageUrl : ''})`,
              }}
            >
              <div className="c-mosaic_item-content">
                <div
                  className="c-mosaic_item-content__meta"
                  style={{
                    color: (index % 4) === 2 ? titleColor : ' ',
                  }
                  }
                >{_type}</div>
                <div>
                  <h3 style={{
                    color: (index % 4) === 2 ? titleColor : ' ',
                  }
                  }
                  >{title}</h3>
                </div>
              </div>
            </a>
          ))}
        </div>
        <h2 className="c-statement"><a href="#">Explore all our resources -></a></h2>
      </section>

    </div>
    <section className="c-team">
      <div className="o-wrapper">
        <h2 className="c-team__title">Hi!<br />We’re the team developing this topic</h2>
      </div>
      <div className="o-wrapper c-team-wrapper">

        <div className="c-team__item">
          {featuredImage && (
            <figure className="c-team__item-figure">
              <img alt={featuredImage.asset.altText} src={featuredImage.asset.url} />
            </figure>
          )}
          <div className="c-team__item-body">
            <h3 className="c-team__item-title">Kendra Dupuy</h3>
            <small className="c-team__item-subtitle">Senior Programme Advisor</small>
            <div className="c-team__item-meta">
                +47 479 38 073<br />
                aled.williams@cmi.no
            </div>
            <Link>
              <a>
                <span className="c-team__item-link">Bio</span>  <ArrowRight />
              </a>
            </Link>
          </div>
        </div>

        <div className="c-team__item">
          {featuredImage && (
            <figure className="c-team__item-figure">
              <img alt={featuredImage.asset.altText} src={featuredImage.asset.url} />
            </figure>
          )}
          <div className="c-team__item-body">
            <h3 className="c-team__item-title">Kendra Dupuy</h3>
            <small className="c-team__item-subtitle">Senior Programme Advisor</small>
            <div className="c-team__item-meta">
              +47 479 38 073<br />
              aled.williams@cmi.no
            </div>
            <Link>
              <a>
                <span className="c-team__item-link">Bio</span>  <ArrowRight />
              </a>
            </Link>
          </div>
        </div>

      </div>
      <div className="o-wrapper">
        <h2 className="c-statement"><a href="#">The whole U4 team -></a></h2>
      </div>
    </section>


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
    sanityQuery: '{ "topic": *[_id == $id]{...,"resources": resources[]->{_id,_type, title,"slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title,  "imageUrl": featuredImage.asset->url}}[0]}',
    param: { id },
  }),
  materializeDepth: 2,
});
