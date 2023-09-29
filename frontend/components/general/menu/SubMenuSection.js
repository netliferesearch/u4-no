import React from 'react';
import { SubMenuItem } from './SubMenuItem';
import Link from 'next/link';

export const SubMenuSection = ({ section }) => {
  return (
    <ul className="c-menu__list">
      {section.slug ? (
        (<Link
          href={section.slug}
          className="c-sub-menu__heading c-menu__link u-no-underline u-text--white">

          <h3 className="c-menu__heading">
            {section.subtitle}
          </h3>

        </Link>)
      ) : (
        <h3 className="c-menu__heading c-sub-menu__heading">{section.subtitle}</h3>
      )}

      {section.items.map((i, index) => (
        <SubMenuItem key={index} label={i.label} slug={i.slug} type={i._id !== 'frontpage' ? section.type : ''} />
      ))}
    </ul>
  );
};
