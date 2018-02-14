import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'features',
  prefix: 'c-',
});

const Feature = ({ title = '', icon = () => null, iconUrl = '' }) => (
  <div {...classes('item')}>
    {icon && <div {...classes('icon')}>{icon()}</div>}
    {iconUrl && <div {...classes('icon')}><img src={iconUrl} alt={title} /></div>}
    {title}
  </div>
);

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.func,
  iconUrl: PropTypes.string,
};

Feature.defaultProps = {
  icon: () => null,
  iconUrl: '',
};

export default Feature;
