import React from 'react';
import Link from 'next/link';

export const SectionIntro = ({ title, text, slug, label }) => {
  return (
    <div className="c-section-intro">
      <div>
        <h2 className="u-heading--2">{title}</h2>
        <p className="u-text--18 u-text--grey">{text}</p>
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
