import React from 'react';
import ImageUrl from '../helpers/imageUrl';

const Feature = ({ title = '', text = '', icon = () => null, iconUrl = {} }) => (
  <div className="c-feature">
    {icon && <div className="c-features__icon">{icon()}</div>}
    {iconUrl && (
      <div className="c-features__icon">
        <img src={ImageUrl(iconUrl)} alt={title} />
      </div>
    )}
    {title && <h2 className="u-secondary-h2 u-text--white">{title}</h2>}
    {text && <p className="u-body u-text--white">{text}</p>}
  </div>
);

// Feature.propTypes = {
//   title: PropTypes.string.isRequired,
//   icon: PropTypes.func,
//   iconUrl: PropTypes.string,
// };

// Feature.defaultProps = {
//   icon: () => null,
//   iconUrl: '',
// };

export default Feature;
