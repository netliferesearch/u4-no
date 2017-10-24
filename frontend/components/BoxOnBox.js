import React from 'react';
import { Link } from '../routes';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';

const classes = BEMHelper({
  name: 'boxOnBox',
  prefix: 'c-',
});

const BoxOnBox = ({ left = '', right = '' }) => (
  <div {...classes()}>
    <div {...classes('left')}>
      <BlockContent blocks={left} />
    </div>
    <div {...classes('right')}>
      <BlockContent blocks={right} />
    </div>
  </div>
);

export default BoxOnBox;
