import React from 'react';
import Link from 'next/link';

export const MainMenuMobileItem = ({ item = {} }) => {
  return item.slug ? (
    <Link href={item.slug}>
      <a className="c-menu__link u-no-underline">
        <h3 className="c-menu__heading">{item.label}</h3>
      </a>
    </Link>
  ) : (
    <h3 className="c-menu__heading">{item.label}</h3>
  );
};
