import React from 'react';

export const SideBox = ({ title, children }) => {
  return (
    <div className="c-side-box">
      {title && (
        <h4 className={`u-secondary-heading u-secondary-h4 u-detail--blue--small u-text--white`}>
          {title}
        </h4>
      )}
      <div className="c-side-box__content">{children}</div>
    </div>
  );
};
