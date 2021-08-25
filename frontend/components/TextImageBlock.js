import React from 'react';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import serializers from './serializers/serializers';

const classes = BEMHelper({
  name: 'text-image-block',
  prefix: 'c-',
});

export const TextImageBlock = ({
  text = '',
  image = {},
  wide = false,
}) => (
  <div {...classes()}>
    <div {...classes('image')}>{image && <img alt="" src={`${image.asset.url}?w=360&fit=crop`} />}</div>
    <div {...classes('body', wide ? 'wide' : null)}>
      <BlockContent blocks={text} serializers={serializers} />
    </div>
  </div>
);
