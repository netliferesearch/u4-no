import React from 'react';

const Feature = ({ title = '', text = '', imageUrl = '' }) => (
  <div className="c-feature">
    {/* {icon && <div className="c-features__icon">{icon()}</div>} */}
    {imageUrl && (
      <div className="c-features__icon">
        <img src={imageUrl} alt={title} loading="lazy" width="90" />
      </div>
    )}
    {title && <h2 className="u-secondary-h2 u-text--light-blue">{title}</h2>}
    {text && <p className="u-body u-text--light-blue">{text}</p>}
  </div>
);

export default Feature;
