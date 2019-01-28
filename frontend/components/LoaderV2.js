import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Loading } from './icons';

const classes = BEMHelper({
  name: 'loader-v2',
  prefix: 'c-',
});

const LoaderV2 = () => (
  <div {...classes()}>
    <Loading />
  </div>

);

export default LoaderV2;
