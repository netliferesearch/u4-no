import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import BEMHelper from 'react-bem-helper';
import { Link } from '../routes';
import { HeadComponent, Logo } from '../components';
import { LogoCMI } from '../components/LogoCMI';
import MenuV3 from './MenuV3';
import SearchFieldV3 from './SearchFieldV3';
const classes = BEMHelper({
  name: 'top-bar',
  prefix: 'c-',
});

class LayoutV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSearchMenu: true,
    };
    autobind(this);
  }

  triggerSearchMenu(e) {
    e.preventDefault();
    this.setState({
      activeSearchMenu: !this.state.activeSearchMenu,
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
                  <a {...classes('logo', 'fixed')}>
                    <Logo />
                    <img className="logo-mobile" src="/static/logo_mobile.svg" alt="Logo mobile" />
                  </a>
                </Link>
              )}
              <SearchFieldV3
                isOpen={this.state.activeSearchMenu}
                isAlwaysOpen={true}
                triggerSearchMenu={this.triggerSearchMenu}
                searchData={searchData}
              />
              {hideLogo && <div />}
              <MenuV3
                noSearch={noSearch}
                triggerSearchMenu={this.triggerSearchMenu}
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

LayoutV2.propTypes = {
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

LayoutV2.defaultProps = {
  showLoadingScreen: false,
  showTopTab: true,
  children: [],
  noSearch: false,
  searchV2: false,
  headComponentConfig: {},
  hideLogo: false,
};

export default LayoutV2;
