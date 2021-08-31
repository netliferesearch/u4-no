import React from 'react';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../serializers/serializers';
import Image from 'next/image';
import sanityImageLoader from '../../../helpers/sanityImageLoader';

const classes = BEMHelper({
  name: 'text-image',
  prefix: 'c-',
});

export const TextImage = ({ text = '', image = {}, imagePosition = 'right', wide = false }) => (
  <div className={`c-text-image ${imagePosition ? 'c-text-image--right' : 'c-text-image--left'}`}>
    <div {...classes('image')}>
      {image && (
        <Image
          loader={sanityImageLoader}
          src={image.asset.url}
          alt=""
          loading="lazy"
          layout="fill"
          objectFit="cover"
        />
      )}
    </div>
    <div {...classes('body', wide ? 'wide' : null)}>
      <BlockContent blocks={text} serializers={serializers} />
    </div>
  </div>
);
