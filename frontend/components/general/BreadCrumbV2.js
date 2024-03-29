import React from 'react';
import Link from 'next/link';
import { ChevronGrey } from '../icons/ChevronGrey';

/**
 * Functional BreadCrumb component based on original BreadCrmb class
 * Can provide "home > parent > current" type breadcrumbs depending on props provided.
 * It is a simplified version of the original BreadCrumb, which has more capabilities.
 */

export const BreadCrumbV2 = ({
  parentSlug = '',
  title = '',
  home = true,
  onDark = false,
  currentSlug = '',
  currentTitle = '',
  grandParentSlug = '',
  grandParentTitle = '',
}) => {
  return (
    <div className={`c-breadcrumb c-breadcrumb--${onDark ? 'onDark' : ''}`} dir="ltr">
      <div className="c-breadcrumb-inner">
        {home ? (
          <div className="c-breadcrumb__item">
            <Link href="/" className="c-breadcrumb__link c-btn--link">
              Home
            </Link>
          </div>
        ) : null}
        {grandParentSlug && grandParentTitle ? (
          <div className="c-breadcrumb__item">
            <ChevronGrey color={onDark ? '#ffffff' : '#333333'} />
            <Link href={grandParentSlug} className="c-breadcrumb__link c-btn--link">

              <span>{grandParentTitle}</span>

            </Link>
          </div>
        ) : null}
        {parentSlug && title ? (
          <div className="c-breadcrumb__item">
            <ChevronGrey color={onDark ? '#ffffff' : '#333333'} />
            <Link href={parentSlug} className="c-breadcrumb__link c-btn--link">

              <span>{title}</span>

            </Link>
          </div>
        ) : null}

        {currentTitle ? (
          <div className="c-breadcrumb__item">
            <ChevronGrey color={onDark ? '#ffffff' : '#333333'} />
            <span className="c-breadcrumb__link c-btn--link  c-breadcrumb__item--current">
              {currentTitle}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
