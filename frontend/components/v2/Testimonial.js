import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Link } from '../../routes';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../serializers';

export const Testimonial = ({ testimonial }) => {
    console.log(testimonial)
  return (
    <div className="c-testimonial">
      <div
        className="c-person__item-body-img"
        style={{
          backgroundImage: `url(${testimonial.image &&
            testimonial.image.asset &&
            testimonial.image.asset.url}?w=160&h=160&fit=crop&crop=top)`,
        }}
      />
      <div>
        <BlockContent blocks={testimonial.text} serializers={serializers} />
        <span>{testimonial.cite}</span>
      </div>
    </div>
  );
};
