import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../../serializers/serializers';
import Image from 'next/image';
import sanityImageLoader from '../../../helpers/sanityImageLoader';

export const TextImage = ({ text = '', image = {}, imagePosition = true }) => (
  <div className={`c-text-image ${imagePosition ? 'c-text-image--right' : 'c-text-image--left'}`}>
    <div className="c-text-image__image">
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
    <div className="c-text-image__body">
      <BlockContent blocks={text} serializers={serializers} />
    </div>
  </div>
);
