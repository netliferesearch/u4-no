import React from 'react';
import { SubMenuItem } from './SubMenuItem';

export const SubMenuSection = ({ section }) => {
  return (
    <ul className="c-menu__list">
      <h3 className="c-menu__heading c-sub-menu__heading">{section.subtitle}</h3>
      {section.items.map((i, index) => (
        <SubMenuItem key={index} label={i.label} slug={i.slug} />
      ))}
    </ul>
  );
};
