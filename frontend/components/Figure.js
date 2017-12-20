import React from 'react';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'article',
  prefix: 'c-',
});

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
  asset, caption, license, licensor, size,
}) => (
  <figure {...classes('figure', null, figureOutFigureClass(size))}>
    <img {...classes('figure-img')} src={asset.url} alt={asset.altText} />
    {caption && <figcaption {...classes('figure-figcaption')}>
      {caption} Photo by: {licensor}, licensed under {license}.
    </figcaption>}
  </figure>
);

export default Figure;
