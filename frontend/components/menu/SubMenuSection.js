import React from 'react';
import { MenuItem } from './MenuItem';

export const SubMenuSection = ({ section }) => {
  return (
    <ul className="c-menu__list">
      <h3 className="c-menu__heading small-section-title">{section.subtitle}</h3>
      {section.items.map((i, index) => (
        <MenuItem key={index} label={i.label} slug={i.slug} />
      ))}
    </ul>
  );
};
