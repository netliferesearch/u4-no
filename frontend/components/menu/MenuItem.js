import React from 'react';
import Link from 'next/link';

export const MenuItem = ({ label = '', slug = '' }) => {
  return (
    <Link href={slug}>
      <li className="c-menu__list-item">
        <a className="c-menu__link">{label}</a>
      </li>
    </Link>
  );
};
