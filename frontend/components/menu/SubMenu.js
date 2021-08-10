import React from 'react';
import { menuItems } from './menuItems';

export const SubMenu = ({ activeItem = '', children }) => {
  const item = menuItems.find(i => i.id === activeItem);
  return (
    <div className="c-menu__backdrop">
      <div className="c-menu__content o-wrapper-medium">
        <h4 className="c-menu__section-title u-primary-heading--white">{item.headline}</h4>
        {children}
      </div>
    </div>
  );
};
