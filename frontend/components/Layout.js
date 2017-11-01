import React from 'react';
import { Link } from '../routes';
import { HeadComponent, Logo, Menu } from '../components';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'top-bar',
  prefix: 'c-',
});

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
      <div {...classes()}>
        <Link route="/">
          <a {...classes('logo')}>
            <Logo />
          </a>
        </Link>
        <Menu topics={topics} />
      </div>
    )}
    {children}
  </div>
);
