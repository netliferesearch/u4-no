import React from 'react';

export const PageIntro = ({
  title = '',
  text = '',
  contentType = '',
  type = 'basic',
  onDark = false,
}) => {
  return (
    <div className={`c-page-intro c-page-intro--${type}`}>
      {contentType && (
        <h4
          className={`u-secondary-heading u-secondary-h4 u-detail--blue--small ${
            onDark ? 'u-text--white' : ''
          }`}
        >
          {contentType}
        </h4>
      )}
      {title && (
        <h1
          className={`c-page-intro__h ${onDark ? 'u-primary-heading--white' : 'u-primary-heading'}`}
        >
          {title}
        </h1>
      )}
      {text && (
        <div className={`c-page-intro__p ${onDark ? ' u-body--white' : ' u-body--grey'}`}>
          {text}
        </div>
      )}
    </div>
  );
};
