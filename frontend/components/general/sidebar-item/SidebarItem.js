import React from 'react';

export const SidebarItem = ({ label = '', content = '', children }) => (
  <div className="c-article-sidebar__item">
    <h4 className="u-secondary-heading u-secondary-h4">{label}</h4>
    <hr className="u-section-underline--grey" />
    {content && <p className="u-text--grey">{content}</p>}
    {children && <div>{children}</div>}
  </div>
);