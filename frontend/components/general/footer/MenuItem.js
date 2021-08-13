
import React from 'react';
import Link from 'next/link';

export const MenuItem = ({ item }) => {
    return (
      <Link href={item.slug}>
        <a className="c-btn u-body--small u-text--light-blue c-footer-hyperlinks">
          <span>{item.label}</span>
        </a>
      </Link>
    );
  };