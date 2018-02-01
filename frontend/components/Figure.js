import React from 'react';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import serializers from './serializers'

const classes = BEMHelper({
  name: 'article',
  prefix: 'c-',
});

const renderCaption = (caption) => {
  if (Array.isArray(caption)) {
    return <BlockContent blocks={caption}  serializers={serializers} />
  } else {
    return caption
  }
}
const renderLicensor = ({ license = '', licensor = '', sourceUrl = '' }) => {
  if(sourceUrl) {
    return <p className="c-longform-grid__standard">Photo by: <a href={sourceUrl}>{licensor}</a></p>
  }
  return <p className="c-longform-grid__standard">Photo by: {licensor}</p>
}

const figureOutFigureClass = (size) => {
  if (size === 'narrow') {
    return 'c-figure--narrow c-longform-grid__standard ';
  } else if (size === 'small') {
    return 'c-figure--small c-longform-grid__standard ';
  } else if (size === 'normal') {
    return 'c-figure--normal c-longform-grid__large';
  } else if (size === 'wide') {
    return 'c-figure--wide c-longform-grid__full';
  }

  return 'c-figure--medium c-longform-grid__large';
};

const Figure = ({
  asset, caption = {}, license = '', licensor = '', size, sourceUrl
}) => (
  <figure {...classes('figure', null, figureOutFigureClass(size))}>
    <img {...classes('figure-img')} src={asset.url} alt={asset.altText} />
    {caption.length > 0 && <figcaption {...classes('figure-figcaption')}>
      {renderCaption(caption)}
      {licensor &&  renderLicensor({ license, licensor, sourceUrl })}
    </figcaption>}
  </figure>
);

export default Figure;
