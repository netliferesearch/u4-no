import React from 'react';

export const Banner = ({ title = '', onDark = true, children }) => {
  return (
    <div className={`c-banner ${onDark ? 'u-bg--shifted' : 'u-bg--shifted--light'}`}>
      <div className="c-banner__content">
        {title && (
          <h4 className="u-secondary-heading u-secondary-h1 u-text--light-blue u-detail--blue--bright c-banner__title">
            {title}
          </h4>
        )}
        <div className="c-banner__body">{children}</div>
      </div>
    </div>
  );
};
