import React, { Component } from 'react';
import { Link } from '../routes';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';

import { Footer, Layout, ExtendedBlockContent, Accordion, LinkList, Features } from '../components';
import { DownArrowButton, RightArrowButton } from '../components/buttons';
import { Basics, Picture, Publication, Resources, ArrowRight } from '../components/icons';
import LinkBox from '../components/LinkBox';

const linkListContent = [
  {
    title: 'Register today',
    link: '#',
  },
  {
    title: 'Nominate',
    link: '#',
  },
];

const features = [
  {
    id: 1,
    title: 'Courses are donor-focused, led by a team of experts.',
  },
  {
    id: 2,
    title: 'Self-study, group discussions, and assignments in an online forum.',
  },
  {
    id: 3,
    title: '30–50 hours depending on the course.',
  },
  {
    id: 4,
    title: 'Log on from home or the office, any time of the day.',
  },
];

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

    <h1 className="c-topic-page_title">Online training</h1>
    <h2 className="c-topic-page__longTitle">Anti-corruption training for development practitioners</h2>

    <section className="c-boxOnImage u-margin-bottom-huge">
      <figure className="c-boxOnImage__figure">
        <img alt="" src="/static/onlinetraining.png" />
      </figure>
      <div className="c-boxOnImage__body">
        <p className="c-boxOnImage__lead">Be confident with anti-corruption initiatives in your work.
        </p>
        <p>At U4 we offer dynamic and time-efficient online courses to our U4 Partners or related embassy/foreign ministry. As a partner you can also nominate other development practitioners for a place, or read the course readers for any course, any time. Our Self-paced online course are free to take for everyone.</p>
        <LinkList content={linkListContent} otherClasses="u-margin-top-none" />
      </div>
    </section>

    <section className="c-topic-section--small">
      <Features content={features} />
    </section>

    <Footer />
  </Layout>
);
export default DataLoader(TopicEntry, {
  queryFunc: ({ query: { id = '' } }) => ({
    sanityQuery: '{ "topic": *[_id == $id]{...,"resources": resources[]->{_id,_type, title,"slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title,  "imageUrl": featuredImage.asset->url}}[0]}',
    param: { id },
  }),
  materializeDepth: 2,
});
