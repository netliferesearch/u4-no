import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import Image from 'next/image';
import sanityImageLoader from '../helpers/sanityImageLoader';

import BlockContent from '@sanity/block-content-to-react';
import serializers from './serializers/serializers';
import imageUrl from '../helpers/imageUrl';

const classes = BEMHelper({
  name: 'article',
  prefix: 'c-',
});

const renderCaption = caption => {
  if (Array.isArray(caption)) {
    return <BlockContent blocks={caption} serializers={serializers} />;
  }
  return caption;
};

const renderCredit = ({ credit = '', sourceUrl = '', license = '' }) => (
  <p className="c-longform-grid__standard credit">
    {sourceUrl && credit ? (
      <span>
        Credit: <a href={sourceUrl}>{credit}</a> {license}
      </span>
    ) : (
      ''
    )}
    {!sourceUrl && credit ? (
      <span>
        Credit: {credit} {license}
      </span>
    ) : (
      ''
    )}
  </p>
);

renderCredit.propTypes = {
  credit: PropTypes.string.isRequired,
  sourceUrl: PropTypes.string.isRequired,
  license: PropTypes.string.isRequired,
};

const figureOutFigureClass = size => {
  if (size === 'narrow') {
    return 'c-figure--narrow c-longform-grid__standard ';
  } else if (size === 'small') {
    return 'c-figure--small c-longform-grid__standard ';
  } else if (size === 'normal') {
    return 'c-figure--normal c-longform-grid__large';
  } else if (size === 'wide') {
    return 'c-figure--wide c-longform-grid__larger';
  } else if (size === 'fullwidth') {
    return 'c-figure--wide c-longform-grid__full';
  }

  return 'c-figure--wide c-longform-grid__large';
};

const Figure = ({
  asset = {},
  altText = '',
  crop,
  hotspot,
  caption = [],
  title,
  heading = '',
  credit = '',
  size,
  sourceUrl,
  license,
}) => (
  <figure {...classes('figure', null, figureOutFigureClass(size))}>
    {(title || heading) && <p className="c-figure__title">{title || heading}</p>}
    {asset.url ? (
      <Image
        loader={sanityImageLoader}
        src={asset.url}
        alt={altText}
        width={asset.metadata.dimensions.width}
        height={asset.metadata.dimensions.height}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    ) : (
      <div>(image unavailable)</div>
    )}

    {(caption.length > 0 || credit || sourceUrl || license) && (
      <figcaption className="c-figure__caption">
        {renderCaption(caption)}
        {renderCredit({ credit, sourceUrl, license })}
      </figcaption>
    )}
  </figure>
);

Figure.propTypes = {
  asset: PropTypes.shape({
    url: PropTypes.string,
    altText: PropTypes.string,
  }).isRequired,
  title: PropTypes.string,
  heading: PropTypes.string,
  license: PropTypes.string,
  size: PropTypes.string,
  sourceUrl: PropTypes.string,
};

Figure.defaultProps = {
  title: '',
  heading: '',
  caption: [],
  license: '',
  size: '',
  sourceUrl: '',
};

export default Figure;
