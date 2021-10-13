import React from 'react';
import LinkToItem from '../LinkToItem';

export const SubMenuItem = ({ label = '', slug = '', type = '' }) => {
  return (
    <li className="c-menu__list-item">
      <LinkToItem type={type} slug={slug}>
        <a className="c-menu__link u-no-underline u-body--white">{label}</a>
      </LinkToItem>
    </li>
  );
};
