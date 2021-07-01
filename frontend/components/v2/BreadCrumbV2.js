import React from 'react';
import Link from 'next/link';
import ChevronGrey from '../icons/ChevronGrey';

/**
 * Functional BreadCrumb component based on original BreadCrmb class
 * Used in v2 pages for providing "home > parent" type breadcrumbs.
 * It is a simplified version of the original BreadCrumb, which has more capabilities.
 */

export const BreadCrumbV2 = ({ parentSlug = '', title = '', home = true }) => {
  return (
    <div className="c-breadcrumb--v2">
      <div className="c-breadcrumb-inner o-wrapper-section">
        {home ? <div className="c-breadcrumb-item">
          <ChevronGrey />
          <Link href={'/'}>
            <a className="c-breadcrumb__link u-no-underline">Home</a>
          </Link>
        </div> : null}
        {parentSlug && title ? (
          <div className="c-breadcrumb-item">
            <ChevronGrey />
            <Link href={parentSlug}>
              <a className="c-breadcrumb__link u-no-underline"><span>{title}</span></a>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};
