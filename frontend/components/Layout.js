import React from 'react';
import { connect } from 'react-redux';
import { Link } from '../routes';
import { HeadComponent, Logo } from '../components';

export default connect(({ showLoadingScreen }) => ({
  showLoadingScreen,
}))(({ showLoadingScreen = false, showTopTab = true, title, description, children = [] }) => (
  <div
    style={{
      transition: 'all 0.1s ease-out',
      opacity: showLoadingScreen ? 0 : 1,
    }}
  >
    <HeadComponent title={title} description={description} />
    {showTopTab && (
      <div className="o-wrapper">
        <div className="c-top-bar">
          <Link route="/">
            <a className="c-top-bar__logo">
              <Logo />
            </a>
          </Link>
        </div>
      </div>
    )}
    {children}
  </div>
));
