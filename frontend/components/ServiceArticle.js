import React, { Component } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';
import { BoxOnBox, BoxOnImage } from './';

/**
 * Here we replace Sanity's react components for rendering basic things like
 * lists so that we can drop in our classnames
 * @type {Object}
 */
const serializers = {
  types: {
    boxOnBoxRef: ({ node: { textLeft, textRight } }) => (
      <section className="c-topic-section">
        <BoxOnBox left={textLeft} right={textRight} />
      </section>
    ),
    boxOnImageRef: ({ node: { block, img } }) => (
      <section className="c-topic-section">
        {console.log(block)}
        <BoxOnImage text={block} image={img} />
      </section>
    ),
    heading: ({ node: { headingValue = '' } }) => (
      <h2 className="c-topic-section__title u-margin-bottom-none">
        {headingValue}
      </h2>
    ),
  },
  //
  // list: ({ type, children }) => {
  //   if (type === 'bullet') {
  //     return <ul className="list-bullets c-longform-grid__standard ">{children}</ul>;
  //   }
  //
  //   return <ol className="list-numbered c-longform-grid__standard ">{children}</ol>;
  // },
};

const ServiceArticle = ({ blocks }) => (
  <BlockContent blocks={blocks} serializers={serializers} />
);

export default ServiceArticle;
