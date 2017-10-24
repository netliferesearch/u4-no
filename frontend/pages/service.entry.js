import React, { Component } from 'react';
import { Link } from '../routes';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';

import { BoxOnBox, Footer, Layout, ExtendedBlockContent, Accordion, LinkList, Newsletter } from '../components';
import { Feature, Mosaic, LinkBox } from '../components';
import { DownArrowButton, RightArrowButton } from '../components/buttons';
import { Basics, Picture, Publication, Resources, ResearchAgenda, ArrowRight } from '../components/icons';

const linkListContent = [
  {
    title: 'Talk to Sofie',
    link: '#',
  },
];

const Services = ({
  service: {
    title = '',
    lead = '',
    featuredImage,
    slug = {},
    // parent = {},
    _id = '',
    _type = '',
  } = {},
}) => (
  <Layout>

    {console.log(lead)}

    <h2 className="c-topic-page__longTitle">{title}</h2>

    <section className="c-boxOnImage">
      <figure className="c-boxOnImage__figure">
        <img alt="" src={featuredImage.asset.url} />
      </figure>
      <div className="c-boxOnImage__body">
        <p className="c-boxOnImage__lead">We facilitate local dialouge
        </p>
        {lead.split('\n').map(i => <p>{i}</p>)}
      </div>
    </section>


    <section className="c-topic-section">
      <h2 className="c-topic-section__title">Expect new knowledge and concrete advice.</h2>

      <BoxOnBox />

    </section>


    <section className="c-topic-section">
      <h2 className="c-topic-section__title">We understand how our work, and can contribute to internal processes and policy discussions.</h2>

      <section className="c-boxOnImage">
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

      <section className="c-linkbox-wrapper" />

      <h2 className="c-topic-section__cta">
        <a href="#">Talk to us &nbsp;<ArrowRight /></a>
      </h2>
    </section>


    <Newsletter />

    <Footer />
  </Layout>
);
export default DataLoader(Services, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '{ "service": *[slug.current == $slug]{...,"resources": resources[]->{_id,_type, title,"slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title,  "imageUrl": featuredImage.asset->url}}[0]}',
    param: { slug },
  }),
  materializeDepth: 2,
});
