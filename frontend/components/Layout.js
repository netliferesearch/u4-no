import React, { useRef, useState } from 'react';
import BEMHelper from 'react-bem-helper';
import Link from 'next/link';
import HeadComponent from './HeadComponent';
import { Menu } from './general/menu/Menu';
import LogoU4White from './icons/LogoU4White';
import { useRouter } from 'next/router';
import { MenuMobile } from './general/menu/MenuMobile';
import { useOnClickOutside } from '../helpers/hooks';

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
    searchV2 = false,
    searchData = {},
    isSearchPage = false,
    headComponentConfig = {},
    hideLogo = false,
  } = props;
  const [activeSearchMenu, setActiveSearchMenu] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setActiveMenu(false));
  const triggerSearchMenu = e => {
    e.preventDefault();
    setActiveSearchMenu(!activeSearchMenu);
  };

  // console.log(searchOpen, 'searchopen');

  return (
    <div
      className={
        asPath === '/'
          ? 'u-print-width '
          : 'u-print-width o-wrapper-fixed-header'
      }
      style={{
        transition: 'all 0.1s ease-out',
        opacity: showLoadingScreen ? 0 : 1,
      }}
    >
      <HeadComponent {...headComponentConfig} />
      {showTopTab && (
        <>
          <div className={`c-top-bar__background ${activeMenu || searchOpen ? '' : 'u-bg--transparent-blue'}`} />
          <div {...classes('', 'fixed')}>
            <div className="o-wrapper-medium fixed-header-content" ref={ref}>
              {!hideLogo && (
                <Link href="/">
                  <a {...classes('logo', 'fixed', searchOpen ? '' : 'logo-white')}>
                    <LogoU4White />
                  </a>
                </Link>
              )}
              {hideLogo && <div />}
              <MenuMobile
                triggerSearchMenu={triggerSearchMenu}
                setSearchOpen={setSearchOpen}
                activeSearchMenu={activeSearchMenu}
                searchOpen={searchOpen}
                isAlwaysOpen={true}
                searchData={searchData}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              <Menu
                triggerSearchMenu={triggerSearchMenu}
                setSearchOpen={setSearchOpen}
                activeSearchMenu={activeSearchMenu}
                searchOpen={searchOpen}
                isAlwaysOpen={true}
                searchData={searchData}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
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