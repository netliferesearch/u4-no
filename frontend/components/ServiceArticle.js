import React, { Component } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';
import { BoxOnBox, BoxOnImage, WorkshopMosaic, Feature, SimpleMosaic } from './';

/**
 * Here we replace Sanity's react components for rendering basic things like
 * lists so that we can drop in our classnames
 * @type {Object}
 */
const serializers = {
  types: {
    heading: ({ node: { headingValue = '' } }) => (
      <h2 className="c-topic-section__title u-margin-bottom-none">
        {headingValue}
      </h2>
    ),
    cta: ({ node: { text = '', href = '' } }) => (
      <h2 className="c-topic-section__cta">
        <a href={href}>{text} &nbsp;<ArrowRight /></a>
      </h2>
    ),
    textBlock: ({ node: { text = '' } }) => (
      <div className="o-wrapper-inner u-margin-bottom-large">
        {text}
      </div>
    ),
    boxOnBoxRef: ({ node: { textLeft, textRight } }) => (
      <section className="c-topic-section">
        <BoxOnBox left={textLeft} right={textRight} />
      </section>
    ),
    boxOnImageRef: ({ node: { block, img } }) => (
      <section className="c-topic-section">
        <BoxOnImage text={block} image={img} />
      </section>
    ),
    workshops: ({ node: { workshopsRef } }) => (
      <div className="o-wrapper">
        <WorkshopMosaic resources={workshopsRef} />
      </div>
    ),
    courses: ({ node: { coursesRef } }) => (
      <div className="o-wrapper">
        <SimpleMosaic resources={coursesRef} cta="Register" />
      </div>
    ),
    features: ({ node: { featureArray } }) => (
      <section className="o-wrapper c-topic-section">
        <div className="c-features">
          {featureArray.map(item =>
            <Feature title={item.featureText} iconUrl={item.image.asset.url} />,
          )}
        </div>
      </section>
    ),
    block: ({ node, children }) => {
      const style = node.style || 'normal';

      // Heading?
      if (/^h\d/.test(style)) {
        const level = parseInt(style.slice(1), 10);
        const id = level === 2 || level === 3
          ? slugify(children[0], { lower: true })
          : undefined;

        return React.createElement(
          style,
          { id, className: 'o-grid-container__item-standard' },
          children,
        );
      }

      if (style === 'blockquote') {
        return (
          <blockquote className="o-grid-container__item-standard">
            {children}
          </blockquote>
        );
      }

      return (
        <p className="o-grid-container__item-standard">
          {children}
        </p>
      );
    },
  },
};

const ServiceArticle = ({ blocks }) =>
  // const newkid = blocks.filter(block => !['reference'].includes(block._type));
  //
  // if (!newkid.length) {
  //   return null;
  // }

  (
    <BlockContent blocks={blocks} serializers={serializers} />
  )
;

export default ServiceArticle;
