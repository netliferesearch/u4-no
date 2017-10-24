import React, { Component } from 'react';
import { Link } from '../routes';
import sanityClient from '@sanity/client';
import DataLoader from '../helpers/data-loader';
import Head from 'next/head';

import { BoxOnBox, Footer, Layout, ExtendedBlockContent, Accordion, LinkList, Newsletter, ServiceArticle } from '../components';
import { Feature, Mosaic, LinkBox } from '../components';
import { DownArrowButton, RightArrowButton } from '../components/buttons';
import { Basics, Picture, Publication, Resources, ResearchAgenda, ArrowRight } from '../components/icons';

const linkListContent = [
  {
    title: 'Talk to Sofie',
    link: '#',
  },
];

const Services = (props) => {
  const {
    title = '',
    lead = '',
    slug = props.slug,
    content,
  } = props;
  return (
    <Layout>

      {console.log(props.service)}

      <h2 className="c-topic-page__longTitle">{title}</h2>

      <section className="c-boxOnImage">
        <figure className="c-boxOnImage__figure">
          <img alt="" src={props.service.featuredImage.asset.url} />
        </figure>
        <div className="c-boxOnImage__body">
          <p className="c-boxOnImage__lead">We facilitate local dialouge
          </p>
          {props.service.lead.split('\n').map(i => <p>{i}</p>)}
        </div>
      </section>


      <ServiceArticle blocks={props.service.content} />


      <section className="c-topic-section">
        <section className="c-linkbox-wrapper" />

        <h2 className="c-topic-section__cta">
          <a href="#">Talk to us &nbsp;<ArrowRight /></a>
        </h2>
      </section>


      <Newsletter />

      <Footer />
    </Layout>
  );
};
export default DataLoader(Services, {
  queryFunc: ({ query: { slug = '' } }) => ({
    sanityQuery: '{ "service": *[slug.current == $slug]{...,"resources": resources[]->{_id,_type, content, title,"slug": slug.current,"titleColor": featuredImage.asset->metadata.palette.dominant.title,  "imageUrl": featuredImage.asset->url}}[0]}',
    param: { slug },
  }),
  materializeDepth: 3,
});
