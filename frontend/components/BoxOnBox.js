import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import serializers from './serializers';

const classes = BEMHelper({
  name: 'boxOnBox',
  prefix: 'c-',
});

const BoxOnBox = ({ left = [], right = [] }) => (
  <div {...classes()}>
    <div {...classes('left')}>
      <BlockContent blocks={left} serializers={serializers} />
    </div>
    <div {...classes('right')}>
      <BlockContent blocks={right} serializers={serializers} />
    </div>
  </div>
);

BoxOnBox.propTypes = {
  left: PropTypes.arrayOf(PropTypes.object).isRequired,
  right: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BoxOnBox;
