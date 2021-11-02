import React from 'react';
import Link from 'next/link';

export const SectionIntro = ({ title = '', text = '', slug = '', label = '' }) => {
  return (
    <div className={`c-section-intro ${text ? 'c-section-intro--with-text' : ''}`}>
      <div>
        <h4 className="u-secondary-heading u-secondary-h1 u-detail--blue">{title}</h4>
        {text && <p className=" u-text--grey">{text}</p>}
      </div>
      <div>
        {/* <Link href={slug}>
          <a className="c-btn c-btn--ter">
            <span>{label}</span>
          </a>
        </Link> */}
      </div>
    </div>
  );
};
