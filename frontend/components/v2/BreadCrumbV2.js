import React, { Component } from 'react';
import PropTypes from 'prop-types';
import buildUrl from '../../helpers/buildUrl';
//import client from '../helpers/sanity-client-config'
import Link from 'next/link';
import ArrowRightSmall from '../icons/ArrowRightSmall';

/**
 * This is a functional BreadCrumb component based on original BreadCrmb class
 * Used in v2 pages for providing "home > parent/current" type breadcrumbs.
 * It is a simplified version of the original BreadCrumb, which has more capabilities.
 */

export const BreadCrumbV2 = ({ parentSlug = '', title = '' }) => {
  return (
    <div className="c-breadcrumb--v2">
      {parentSlug && (
        <div className="c-breadcrumb-inner o-wrapper-section">
          <Link href="/">
            <a className="c-breadcrumb__link">Home</a>
          </Link>
          <ArrowRightSmall />
          <Link href={parentSlug}>
            <a className="c-breadcrumb__link">{title}</a>
          </Link>
        </div>
      )}
    </div>
  );
};
