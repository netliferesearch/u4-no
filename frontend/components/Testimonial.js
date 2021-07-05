import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from './serializers';

export const Testimonial = ({ testimonial }) => {
  return (
    <div className="c-testimonial">
      <div
        className="c-testimonial__image"
        style={{
          backgroundImage: `url(${testimonial.image &&
            testimonial.image.asset &&
            testimonial.image.asset.url}?w=160&h=160&fit=crop&crop=top)`,
        }}
      />
      <div className="c-testimonial__text">
        <h3 className="u-primary-heading">What participant say</h3>
        <BlockContent blocks={testimonial.text} serializers={serializers} />
        <p className="c-testimonial__cite">{testimonial.cite}</p>
      </div>
    </div>
  );
};
