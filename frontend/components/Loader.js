import React from 'react';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'loader',
  prefix: 'c-',
});

const Loader = () => (
  <div className="c-loader__wrapper">
    <div className="c-loader">
      <div />
    </div>
  </div>
);

export default Loader;
