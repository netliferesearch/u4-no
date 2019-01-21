import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import BEMHelper from 'react-bem-helper';
import { Link } from '../routes';
import { HeadComponent, Logo, Menu, MenuV2, SearchFieldV2 } from '../components';

const classes = BEMHelper({
  name: 'top-bar',
  prefix: 'c-',
});

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSearchMenu: false,
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
      isSearchPage = false,
      headComponentConfig = {},
      hideLogo = false,
    } = this.props;

    return (
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

            {searchV2 ? (
              <Fragment>
                <SearchFieldV2
                  isOpen={this.state.activeSearchMenu}
                  isAlwaysOpen={isSearchPage}
                  triggerSearchMenu={this.triggerSearchMenu}
                />
                {hideLogo && <div />}
                <MenuV2
                  noSearch={noSearch}
                  triggerSearchMenu={this.triggerSearchMenu}
                  activeSearchMenu={this.state.activeSearchMenu}
                />
              </Fragment>
            ) : (
              <Fragment>
                {hideLogo && <div />}
                <Menu noSearch={noSearch} />
              </Fragment>
            )}
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
