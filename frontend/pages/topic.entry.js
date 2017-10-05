import React, { Component } from 'react';
import Link from 'next/link';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';

import { Layout, ExtendedBlockContent, Accordion } from '../components';
import { DownArrowButton } from '../components/buttons';
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
  } = {},
}) => (
  <Layout>
    <div className="o-wrapper">
      <p>
        Tilbake til {' '}
        <Link href={'/topics'}>
          <a>topics oversikt</a>
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
        <h2>Publications, insights, and ideas to inform your anti-corruption work.</h2>
        <div className="c-mosaic">
          <div className="c-mosaic_item">1</div>
          <div className="c-mosaic_item">
            <div className="c-mosaic_item-content">
              <div>U4 ISSUE I 2017</div>
              <div>
                <h3>Pay for Honesty? Lessons on Wages and Corruption from Public Hospitals</h3>
<<<<<<< HEAD
=======
                <DownArrowButton modifier="secondary" onClick={() => console.log('clicked!')} />
>>>>>>> 9f699aa2118812d7b1c600584837613ed689d3bc
              </div>
            </div>
          </div>
          <div className="c-mosaic_item">
            <div className="c-mosaic_item-content">
<<<<<<< HEAD
              <div>U4 ISSUE I 2017</div>
              <div>
                <h3>Pay for Honesty? Lessons on Wages and Corruption from Public Hospitals</h3>
=======
              <div className="c-mosaic_item-content-top">U4 ISSUE I 2017</div>
              <div className="c-mosaic_item-content-bottom">
                <h3>2 Hva handler denne artikkelen om?</h3>
                <DownArrowButton modifier="secondary" onClick={() => console.log('clicked!')} />
>>>>>>> 9f699aa2118812d7b1c600584837613ed689d3bc
              </div>
            </div>
          </div>
          <div className="c-mosaic_item">
            <div className="c-mosaic_item-content">
              <div>U4 ISSUE I 2017</div>
              <div>
                <h3>Pay for Honesty? Lessons on Wages and Corruption from Public Hospitals</h3>
<<<<<<< HEAD
              </div>
            </div>
          </div>
          <div className="c-mosaic_item">
            <div className="c-mosaic_item-content">
              <div>U4 ISSUE I 2017</div>
              <div>
                <h3>Pay for Honesty? Lessons on Wages and Corruption from Public Hospitals</h3>
              </div>
            </div>
          </div>
          <div className="c-mosaic_item">
=======
                <DownArrowButton modifier="secondary" onClick={() => console.log('clicked!')} />
              </div>
            </div>
          </div>
          <div className="c-mosaic_item c-mosaic_item-4">
>>>>>>> 9f699aa2118812d7b1c600584837613ed689d3bc
            <div className="c-mosaic_item-content">
              <div>U4 ISSUE I 2017</div>
              <div>
                <h3>Pay for Honesty? Lessons on Wages and Corruption from Public Hospitals</h3>
<<<<<<< HEAD
              </div>
            </div>
          </div>
          <div className="c-mosaic_item">
            <div className="c-mosaic_item-content">
              <div>U4 ISSUE I 2017</div>
              <div>
                <h3>Pay for Honesty? Lessons on Wages and Corruption from Public Hospitals</h3>
              </div>
            </div>
          </div>
          <div className="c-mosaic_item">
            <div className="c-mosaic_item-content">
              <div>U4 ISSUE I 2017</div>
              <div>
                <h3>Pay for Honesty? Lessons on Wages and Corruption from Public Hospitals</h3>
              </div>
            </div>
          </div>
          <div className="c-mosaic_item">
            <div className="c-mosaic_item-content">
              <div>U4 ISSUE I 2017</div>
              <div>
                <h3>Pay for Honesty? Lessons on Wages and Corruption from Public Hospitals</h3>
              </div>
            </div>
          </div>
=======
                <DownArrowButton modifier="secondary" onClick={() => console.log('clicked!')} />
              </div>
            </div>
          </div>
          <div className="c-mosaic_item c-mosaic_item-5">5</div>
          <div className="c-mosaic_item c-mosaic_item-6">6</div>
          <div className="c-mosaic_item c-mosaic_item-7">7</div>
          <div className="c-mosaic_item c-mosaic_item-8">8</div>
>>>>>>> 9f699aa2118812d7b1c600584837613ed689d3bc
        </div>
      </section>

    </div>
  </Layout>
);

export default DataLoader(TopicEntry, {
  queryFunc: ({ query: { id = '' } }) => ({
    sanityQuery: '{ "topic": *[_id == $id][0]}',
    param: { id },
  }),
  materializeDepth: 2,
});
