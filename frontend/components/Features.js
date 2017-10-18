import React from 'react';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'features',
  prefix: 'c-',
});

const Features = ({ content }) => (
  <div {...classes()}>
    { content.map(item =>
      (<div {...classes('item')}>
        {item.title}
      </div>),
    )}
  </div>
);

export default Features;
