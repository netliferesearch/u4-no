import React from 'react';
import Link from 'next/link';
import { ArrowNext } from '../icons/ArrowNext';

export const CTA = ({ img = '', data = {} }) => {
  return (
    <div
      className="c-cta"
      style={{
        backgroundImage: `linear-gradient(
          90deg
          , rgb(0 0 0 / 57%) 2.51%, rgb(11 11 11 / 54%) 25.95%, rgb(11 11 11 / 59%) 45.68%, rgba(255, 255, 255, 0) 99.64%),url(${img})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      <div className="o-wrapper-medium c-cta__content">
        <h1 className="u-primary-heading u-text--white">{data.title}</h1>
        <p className="c-cta__paragraph">{data.text} </p>
        <Link href="/about-u4">
          <a className="c-btn c-btn--link c-btn--link--whiteOnDark c-cta__link">
            <span className="u-hidden--tablet">{data.labelLong}</span>
            <span className="u-hidden--desktop">{data.labelShort}</span>
            <ArrowNext />
          </a>
        </Link>
      </div>
    </div>
  );
};
