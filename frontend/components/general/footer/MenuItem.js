
import React from 'react';
import Link from 'next/link';

export const MenuItem = ({ item }) => {
    return (
      (<Link
        href={item.slug}
        className="c-btn u-no-underline u-body--small u-text--light-blue c-footer-hyperlink">

        <span>{item.label}</span>

      </Link>)
    );
  };