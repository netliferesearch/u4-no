import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import sanityImageLoader from '../../helpers/sanityImageLoader';
import { ArrowNext } from '../icons/ArrowNext';

export const CTA = ({ img = '', data = {} }) => {
  return (
    <div className="c-cta">
      <Image 
        loader={sanityImageLoader}
        src={img}
        layout="fill"
        objectFit="cover"
        priority="true"
        quality="60"
      />
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
