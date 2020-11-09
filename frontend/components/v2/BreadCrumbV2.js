import React from 'react';
//import PropTypes from 'prop-types';
//import buildUrl from '../../helpers/buildUrl';
//import client from '../helpers/sanity-client-config'
import { Link } from '../../routes';
import ArrowRightSmall from '../icons/ArrowRightSmall';
import ChevronGrey from '../icons/ChevronGrey';

/**
 * This is a functional BreadCrumb component based on original BreadCrmb class
 * Used in v2 pages for providing "home > parent" type breadcrumbs.
 * It is a simplified version of the original BreadCrumb, which has more capabilities.
 */

export const BreadCrumbV2 = ({ parentSlug = '', title = '' }) => {
  return (
    <div className="c-breadcrumb--v2">
      <div className="c-breadcrumb-inner o-wrapper-section">
        <ChevronGrey />
        <Link route={'/'}>
          <a className="c-breadcrumb__link u-no-underline">Home</a>
        </Link>
        {/* <ArrowRightSmall /> */}

        {parentSlug && title ? (
          <span>
            <ChevronGrey />
            <Link route={parentSlug}>
              <a className="c-breadcrumb__link u-no-underline"> {title}</a>
            </Link>
          </span>
        ) : null}
      </div>
    </div>
  );
};
