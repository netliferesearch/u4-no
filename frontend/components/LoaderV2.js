import React from 'react';
import BEMHelper from 'react-bem-helper';
import Loading from './icons/Loading';

const classes = BEMHelper({
  name: 'loader-v2',
  prefix: 'c-',
});

export const LoaderV2 = () => (
  <div {...classes()}>
    <Loading />
  </div>
);