import React from 'react';
import { Link } from '../routes';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';

const classes = BEMHelper({
  name: 'boxOnImage',
  prefix: 'c-',
});

const BoxOnImage = ({ text = '', image }) => (
  <div {...classes()}>
    <figure {...classes('figure')}>
      { image && <img alt="" src={image.asset.url} /> }
    </figure>
    <div {...classes('body')}>
      <BlockContent blocks={text} />
    </div>
  </div>
);

export default BoxOnImage;
