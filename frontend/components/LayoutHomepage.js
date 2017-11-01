import React from 'react';
import { Link } from '../routes';
import { HeadComponent, Logo, Menu } from '../components';

export default ({
  showLoadingScreen = false,
  showTopTab = true,
  title,
  description,
  topics = {},
  children = [],
}) => (
  <div
    className="u-print-width o-wrapper-page"
    style={{
      transition: 'all 0.1s ease-out',
      opacity: showLoadingScreen ? 0 : 1,
    }}
  >
    <HeadComponent title={title} description={description} />
    {showTopTab && (
      <div className="c-top-bar">
        <div />
        <Menu topics={topics} />
      </div>
    )}
    {children}
  </div>
);
