import React from 'react';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'article',
  prefix: 'c-',
});


const Figure = ({ asset, caption, license, licensor }) => (
  <figure {...classes('figure', null, 'c-longform-grid__full')}>
    <img {...classes('figure-img')} src={asset.url} alt={asset.altText} />
    <figcaption {...classes('figure-figcaption')}>
      {caption}
      {license}
      {licensor}
    </figcaption>
  </figure>
);

export default Figure;
