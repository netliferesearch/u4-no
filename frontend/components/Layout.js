import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import BEMHelper from 'react-bem-helper';
import Link from 'next/link';
import HeadComponent from './HeadComponent';
import { Menu } from './menu/Menu';
//import { SearchField } from './SearchField';
import { LogoCMI } from './icons/LogoCMI';
import { LogoMobile } from './icons/LogoMobile';
import LogoU4White from './icons/LogoU4White';
import SearchFieldV2 from './SearchField-v2';
import { useRouter } from 'next/router';
import { MenuMobile } from './menu/MenuMobile';

const classes = BEMHelper({
  name: 'top-bar-v2',
  prefix: 'c-',
});
export const Layout = props => {
  const { asPath } = useRouter(); // window location pathname check

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
  } = props;
  const [activeSearchMenu, setActiveSearchMenu] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const triggerSearchMenu = e => {
    e.preventDefault();
    setActiveSearchMenu(!activeSearchMenu);
  };

  // console.log(searchOpen, 'searchopen');

  return (
    <div
      className={
        asPath === '/'
          ? 'u-print-width o-wrapper-page '
          : 'u-print-width o-wrapper-page o-wrapper-fixed-header'
      }
      style={{
        transition: 'all 0.1s ease-out',
        opacity: showLoadingScreen ? 0 : 1,
      }}
    >
      <HeadComponent {...headComponentConfig} />
      {showTopTab && (
        <>
          <div className="c-top-bar-v2-background-bar u-bg-transparent-blue" />
          <div {...classes('', 'fixed')}>
            {/* <a href="#" {...classes('logo-cmi')}>
              <LogoCMI />
            </a> */}
            <div className="o-wrapper-medium fixed-header-content">
              {!hideLogo && (
                <Link href="/">
                  <a {...classes('logo', 'fixed', searchOpen ? '' : 'logo-white')}>
                    <LogoU4White />
                    {/* <LogoMobile /> */}
                  </a>
                </Link>
              )}

              {/* {searchOpen ? (
                <SearchFieldV2
                  isOpen={activeSearchMenu}
                  isAlwaysOpen={true}
                  triggerSearchMenu={triggerSearchMenu}
                  searchData={searchData}
                />
              ) : null} */}
              {hideLogo && <div />}
              <MenuMobile
                noSearch={noSearch}
                triggerSearchMenu={triggerSearchMenu}
                setSearchOpen={setSearchOpen}
                activeSearchMenu={activeSearchMenu}
                searchOpen={searchOpen}
                isAlwaysOpen={true}
                searchData={searchData}
              />
              <Menu
                noSearch={noSearch}
                triggerSearchMenu={triggerSearchMenu}
                setSearchOpen={setSearchOpen}
                activeSearchMenu={activeSearchMenu}
                searchOpen={searchOpen}
                isAlwaysOpen={true}
                searchData={searchData}
              />
            </div>
          </div>
        </>
      )}
      {children}
    </div>
  );
};

export default Layout;

// import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
// import autobind from 'react-autobind';
// import BEMHelper from 'react-bem-helper';
// import Link from 'next/link';
// import HeadComponent from '../components/HeadComponent';
// import Logo from '../components/Logo';
// import MenuV2 from '../components/MenuV2';
// import SearchFieldV2 from '../components/SearchField-v2';

// const classes = BEMHelper({
//   name: 'top-bar',
//   prefix: 'c-',
// });

// class Layout extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeSearchMenu: false,
//     };
//     autobind(this);
//   }

//   triggerSearchMenu(e) {
//     e.preventDefault();
//     this.setState({
//       activeSearchMenu: !this.state.activeSearchMenu,
//     });
//   }

//   render() {
//     const {
//       showLoadingScreen = false,
//       showTopTab = true,
//       children = [],
//       noSearch = false,
//       searchV2 = false,
//       searchData = {},
//       isSearchPage = false,
//       headComponentConfig = {},
//       hideLogo = false,
//     } = this.props;

//     return (
//       <div
//         className="u-print-width o-wrapper-page"
//         style={{
//           transition: 'all 0.1s ease-out',
//           opacity: showLoadingScreen ? 0 : 1,
//         }}
//       >
//         <HeadComponent {...headComponentConfig} />
//         {showTopTab && (
//           <div {...classes('', '', 'u-z-index-xx u-bg-white')}>
//             {!hideLogo && (
//               <Link href="/">
//                 <a {...classes('logo')}>
//                   <Logo />
//                 </a>
//               </Link>
//             )}
//             {(this.state.activeSearchMenu || isSearchPage) && (
//               <SearchFieldV2
//                 isOpen={this.state.activeSearchMenu}
//                 isAlwaysOpen={isSearchPage}
//                 triggerSearchMenu={this.triggerSearchMenu}
//                 searchData={searchData}
//               />
//             )}
//             {hideLogo && <div />}
//             <MenuV2
//               noSearch={noSearch}
//               triggerSearchMenu={this.triggerSearchMenu}
//               activeSearchMenu={this.state.activeSearchMenu}
//             />
//           </div>
//         )}
//         {children}
//       </div>
//     );
//   }
// }

// Layout.propTypes = {
//   showLoadingScreen: PropTypes.bool,
//   showTopTab: PropTypes.bool,
//   children: PropTypes.node,
//   noSearch: PropTypes.bool,
//   searchV2: PropTypes.bool,
//   headComponentConfig: PropTypes.shape({
//     title: PropTypes.string,
//     description: PropTypes.string,
//     image: PropTypes.string,
//     url: PropTypes.string,
//     ogp: PropTypes.shape({
//       title: PropTypes.string,
//       image: PropTypes.string,
//       description: PropTypes.string,
//     }),
//   }),
//   hideLogo: PropTypes.bool,
// };

// Layout.defaultProps = {
//   showLoadingScreen: false,
//   showTopTab: true,
//   children: [],
//   noSearch: false,
//   searchV2: false,
//   headComponentConfig: {},
//   hideLogo: false,
// };

// export default Layout;
