import React from 'react';
import Link from 'next/link';
import { ArrowNext } from '../icons/ArrowNext';

export const CTA = ({ img = '' }) => {
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
      <div className="o-wrapper-medium">
        <h1 className="u-primary-heading u-text--white">
          Inform your work with U4’s quality research and practical guidance
        </h1>
        <p className="c-cta-paragraph">
          Sustainable and inclusive development starts where corruption ends
        </p>
        <Link href="/about-u4">
          <a className="c-btn c-btn--link c-btn--link--dark c-cta__hyperlink">
            Learn more about u4
            <ArrowNext />
          </a>
        </Link>
      </div>
    </div>
  );
};