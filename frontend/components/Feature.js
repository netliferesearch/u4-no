import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import ImageUrl from '../helpers/imageUrl';

const classes = BEMHelper({
  name: 'features',
  prefix: 'c-',
});

const Feature = ({ title = '', text = '', icon = () => null, iconUrl = '' }) => (
  <div className="c-feature-list__item">
    {icon && <div {...classes('icon')}>{icon()}</div>}
    {iconUrl && (
      <div {...classes('icon')}>
        <img src={ImageUrl(iconUrl)} alt={title} />
      </div>
    )}
    {title && <h2 className="u-secondary-h2 u-text--white">{title}</h2>}
    {text && <p className="u-body u-text--grey c-topic-paragraph">{text}</p>}
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
