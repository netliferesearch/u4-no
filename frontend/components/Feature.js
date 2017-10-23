import React from 'react';
import { Link } from '../routes';
import { DownArrowButton } from '../components/buttons';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'features',
  prefix: 'c-',
});

const Feature = ({ id, title, icon }) => (
  <div {...classes('item')}>
    {icon && <div {...classes('icon')}>{icon()}</div>}
    {title}
  </div>
);

export default Feature;
