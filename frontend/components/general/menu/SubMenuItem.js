import React from 'react';
import Link from 'next/link';

export const SubMenuItem = ({ label = '', slug = '' }) => {
  return (
    <Link href={slug}>
      <li className="c-menu__list-item">
        <a className="c-menu__link u-no-underline u-body--white">{label}</a>
      </li>
    </Link>
  );
};
