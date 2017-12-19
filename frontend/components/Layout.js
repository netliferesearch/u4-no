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
  children = [],
  noSearch = false,
  headComponentConfig = {},
  hideLogo = false,
}) => (
  <div
    className="u-print-width o-wrapper-page"
    style={{
      transition: 'all 0.1s ease-out',
      opacity: showLoadingScreen ? 0 : 1,
    }}
  >
    <HeadComponent {...headComponentConfig} />
    {showTopTab && (
      <div {...classes('', '', 'u-z-index-xx u-bg-white')}>
        {!hideLogo && (
          <Link route="/">
            <a {...classes('logo')}>
              <Logo />
            </a>
          </Link>
        )}
        {hideLogo && <div />}
        <Menu noSearch={noSearch} />
      </div>
    )}
    {children}
  </div>
);
