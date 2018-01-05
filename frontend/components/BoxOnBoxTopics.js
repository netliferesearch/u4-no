import React from 'react';
import { Link } from '../routes';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import { OnlineTraining, Workshops, Helpdesk } from './icons';

const classes = BEMHelper({
  name: 'boxOnBox-topics',
  prefix: 'c-',
});

const BoxOnBoxTopics = ({ left = '', right = '' }) => (
  <div {...classes()}>
    <div {...classes('left')}>
      <BlockContent blocks={left} />
    </div>
    <div {...classes('right')}>
      <BlockContent blocks={right} />
    </div>
  </div>
);

export default BoxOnBoxTopics;
