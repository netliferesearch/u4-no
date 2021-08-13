import React from 'react';
import Link from 'next/link';

export const MobileMainMenuItem = ({ item = {} }) => {
  return item.slug ? (
    <Link href={item.slug}>
      <a className="c-menu__link">
        <h3 className="c-menu__heading">{item.label}</h3>
      </a>
    </Link>
  ) : (
    <h3 className="c-menu__heading">{item.label}</h3>
  );
};
