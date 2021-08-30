import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../serializers/serializers';
import { PullQuote } from '../pull-quote/PullQuote';

export const Testimonial = ({ testimonial }) => {
  return (
    <div className="c-testimonial">
      {/* <div
        className="c-testimonial__image"
        style={{
          backgroundImage: `url(${testimonial.image &&
            testimonial.image.asset &&
            testimonial.image.asset.url}?w=160&h=160&fit=crop&crop=top)`,
        }}
      /> */}
      <div className="c-testimonial__text">
        <PullQuote>
          <BlockContent blocks={testimonial.text} serializers={serializers} />
        </PullQuote>
        <p className="c-testimonial__cite c-pullQuote__cite">{testimonial.cite}</p>
      </div>
    </div>
  );
};
