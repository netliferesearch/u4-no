import React, { Component } from 'react';
import { Link } from '../routes';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';

import { Footer, Layout, ExtendedBlockContent, Accordion, LinkList, Newsletter } from '../components';
import { Feature, Mosaic } from '../components';
import { DownArrowButton, RightArrowButton } from '../components/buttons';
import { Basics, Picture, Publication, Resources, ResearchAgenda, ArrowRight } from '../components/icons';

const linkListContent = [
  {
    title: 'Talk to Sofie',
    link: '#',
  },
];

const Workshops = ({
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

    <h2 className="c-topic-page__longTitle">Workshops, headquarter visits and events</h2>

    <section className="c-boxOnImage u-margin-bottom-huge">
      <figure className="c-boxOnImage__figure">
        <img alt="" src="/static/onlinetraining.png" />
      </figure>
      <div className="c-boxOnImage__body">
        <p className="c-boxOnImage__lead">We facilitate local dialouge
        </p>
        <p>Corruption is a sensitive topic. A neutral forum to discuss it openly helps different agents of change find each other. Our advisers facilitate dialogues between development partners at U4 in-country workshops. During the past decade we’ve held over 60 workshops for our partners and their local counterparts. </p>

        <p>We can also assist with staff training and policy advice at headquarters. Or would you like to meet us at a conference? We gladly share our insights at research and policy events, to help advance general anti-corruption knowledge.</p>
        <LinkList
          content={[{ title: 'Talk to Sofie', link: '#' }]}
          otherClasses="u-margin-top-none"
        />
      </div>
    </section>


    <section className="c-topic-section">
      <h2 className="c-topic-section__title">Expect new knowledge and concrete advice.</h2>


    </section>


    <section className="c-topic-section">
      <h2 className="c-topic-section__title">We understand how our work, and can contribute to internal processes and policy discussions.</h2>

      <section className="c-boxOnImage u-margin-bottom-huge">
        <figure className="c-boxOnImage__figure">
          <img alt="" src="/static/onlinetraining.png" />
        </figure>
        <div className="c-boxOnImage__body">
          <p className="c-boxOnImage__lead">Headquarter visits
          </p>
          <p>Our team understands how the U4 partners work, and can contribute to internal processes and policy discussions.</p>
          <LinkList
            content={[{ title: 'Read more', link: '#' }]}
            otherClasses="u-margin-top-none"
          />
        </div>
      </section>

    </section>


    <section className="c-topic-section">
      <h2 className="c-topic-section__title">Upcoming workshops</h2>


      <h2 className="c-topic-section__cta">
        <a href="#">Talk to us &nbsp;<ArrowRight /></a>
      </h2>
    </section>


    <Newsletter />

    <Footer />
  </Layout>
);
export default DataLoader(Workshops, {
  queryFunc: ({ query: { id = '' } }) => ({
    sanityQuery: '{ "topic": *[_id == $id]{...,"resources": resources[]->{_id,_type, title,"slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title,  "imageUrl": featuredImage.asset->url}}[0]}',
    param: { id },
  }),
  materializeDepth: 2,
});
