import React from 'react';

export const PageIntro = ({
  title = '',
  subtitle = '',
  text = '',
  contentType = '',
  type = 'basic',
  onDark = false,
  single = false,
}) => {
  return (
    <div className={`c-page-intro c-page-intro--${type} ${single ? 'c-page-intro--single' : ''}`}>
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
        <>
          {single ? (
            <h2
              className={`c-page-intro__h ${
                onDark ? 'u-primary-heading--white' : 'u-primary-heading'
              }`}
            >
              {title}
            </h2>
          ) : (
            <h1
              className={`c-page-intro__h ${
                onDark ? 'u-primary-heading--white' : 'u-primary-heading'
              }`}
            >
              {title}
            </h1>
          )}
        </>
      )}
      {subtitle && (
        <h4
          className={`c-page-intro__h ${onDark ? 'u-primary-heading--white' : 'u-primary-heading'}`}
        >
          {subtitle}
        </h4>
      )}
      {text && (
        <div
          className={`c-page-intro__p ${onDark ? 'u-text--white' : 'u-text--grey'} ${
            single ? 'u-body--large u-text--dark-grey' : 'u-body'
          }`}
        >
          {text}
        </div>
      )}
    </div>
  );
};
