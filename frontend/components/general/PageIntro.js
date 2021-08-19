import React from 'react';

export const PageIntro = ({ title = '', text = '', type = 'basic' }) => {
  return (
    <div className={`c-page-intro c-page-intro--${type}`}>
      {title && <h1 className="c-page-intro__h u-primary-heading">{title}</h1>}
      {text && <p className="c-page-intro__p u-body--grey">{text}</p>}
    </div>
  );
};
