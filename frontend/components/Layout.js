import React, { useEffect, useRef, useState } from 'react';
import BEMHelper from 'react-bem-helper';
import Link from 'next/link';
import HeadComponent from './HeadComponent';
import { Menu } from './general/menu/Menu';
import LogoU4White from './icons/LogoU4WhiteMini';
import { useRouter } from 'next/router';
import { MenuMobile } from './general/menu/MenuMobile';
import { useOnClickOutside } from '../helpers/hooks';
import { useScrollInfo } from '../helpers/useScrollInfo';


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
  const [scrolled, setScrolled] = useState(false);
  const [activeSearchMenu, setActiveSearchMenu] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const ref = useRef();
  const menuRef = useRef(null);
  useOnClickOutside(ref, () => setActiveMenu(false));
  const triggerSearchMenu = e => {
    e.preventDefault();
    setActiveSearchMenu(!activeSearchMenu);
  };

  useScrollInfo(
    ({ currPos }) => {
      const isScrolled = currPos.y < -100;
      if (scrolled !== isScrolled) {
        setScrolled(isScrolled);
      }
    },
    [scrolled],
    menuRef,
    false,
    0
  );

  return (
    <div
      className={asPath === '/' ? 'u-print-width ' : 'u-print-width o-wrapper-fixed-header'}
      style={{
        transition: 'all 0.1s ease-out',
        opacity: showLoadingScreen ? 0 : 1,
      }}
    >
      <span ref={menuRef} />
      <HeadComponent {...headComponentConfig} />
      {showTopTab && (
        <>
          <div
            className={`c-top-bar__background ${
              activeMenu || searchOpen ? '' : 'u-bg--transparent-blue '
            } ${scrolled ? 'u-bg--blur' : ''}`}
          />
          <div {...classes('', 'fixed')}>
            <div className="o-wrapper-medium fixed-header-content" ref={ref}>
              {!hideLogo && (
                <Link href="/" {...classes('logo', 'fixed', searchOpen ? '' : 'logo-white')}>
                  <LogoU4White />
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
