import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import BEMHelper from 'react-bem-helper';
import { Link } from '../../routes';
import { HeadComponent, Logo } from '../';
import { LogoCMI, Menu, SearchField, LogoMobile } from '.';
const classes = BEMHelper({
  name: 'top-bar-v2',
  prefix: 'c-',
});

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSearchMenu: true,
      searchOpen: true,
    };
    autobind(this);
  }

  triggerSearchMenu(e) {
    e.preventDefault();
    this.setState({
      activeSearchMenu: !this.state.activeSearchMenu,
    });
  }

  setSearchOpen(status) {
    this.setState({
      searchOpen: status,
    });
  }

  render() {
    const {
      showLoadingScreen = false,
      showTopTab = true,
      children = [],
      noSearch = false,
      searchV2 = false,
      searchData = {},
      isSearchPage = false,
      headComponentConfig = {},
      hideLogo = false,
    } = this.props;

    return (
      <div
        className="u-print-width o-wrapper-page o-wrapper-fixed-header"
        style={{ transition: 'all 0.1s ease-out', opacity: showLoadingScreen ? 0 : 1 }}
      >
        <HeadComponent {...headComponentConfig} />
        {showTopTab && (
          <div {...classes('', 'fixed', 'u-bg-white')}>
            <a href="#" {...classes('logo-cmi')}>
              <LogoCMI />
            </a>
            <div className="fixed-header-content">
              {!hideLogo && (
                <Link route="/">
                  <a {...classes('logo', 'fixed', this.state.searchOpen ? '' : 'logo-white')}>
                    <Logo />
                    <LogoMobile />
                  </a>
                </Link>
              )}
              {this.state.searchOpen &&
                <SearchField
                  isOpen={this.state.activeSearchMenu}
                  isAlwaysOpen={true}
                  triggerSearchMenu={this.triggerSearchMenu}
                  searchData={searchData}
                />}
              {hideLogo && <div />}
              <Menu
                noSearch={noSearch}
                triggerSearchMenu={this.triggerSearchMenu}
                setSearchOpen={this.setSearchOpen}
                activeSearchMenu={this.state.activeSearchMenu}
              />
            </div>
          </div>
        )}
        {children}
      </div>
    );
  }
}

Layout.propTypes = {
  showLoadingScreen: PropTypes.bool,
  showTopTab: PropTypes.bool,
  children: PropTypes.node,
  noSearch: PropTypes.bool,
  searchV2: PropTypes.bool,
  headComponentConfig: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    ogp: PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
      description: PropTypes.string,
    }),
  }),
  hideLogo: PropTypes.bool,
};

Layout.defaultProps = {
  showLoadingScreen: false,
  showTopTab: true,
  children: [],
  noSearch: false,
  searchV2: false,
  headComponentConfig: {},
  hideLogo: false,
};

export default Layout;
