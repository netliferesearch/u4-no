import React from 'react';
import { SearchIcon } from '../../icons/SearchIcon';
import { MenuIcon } from '../../icons/MenuIcon';
import { ArrowDownCollapsible } from '../../icons/ArrowDownCollapsible';
import { CloseIcon } from '../../icons/CloseIcon';
import { SocialFollow } from '../social/SocialFollow';
import { socialItems } from '../social/socialItems';
import { menuItems } from './menuItems';
import { MainMenuMobileItem } from './MainMenuMobileItem';
import { SubMenuItem } from './SubMenuItem';
import { Accordion } from '../accordion/Accordion';
import { CloseSearch } from '../../icons/CloseSearch';
import SearchFieldV2 from '../../search/SearchField-v2';

export const MenuMobile = props => {
  const {
    data,
    triggerSearchMenu,
    setSearchOpen,
    activeSearchMenu,
    searchOpen,
    searchData,
    activeMenu,
    setActiveMenu,
  } = props;

  const triggerMenu = e => {
    e.preventDefault();
    setActiveMenu(!activeMenu);
    if (searchOpen) {
      setSearchOpen(false);
    }
  };

  return (
    <div className="c-menu--mobile">
      <div className="c-menu__items">
        <div className="c-menu--mobile__item">
          {!searchOpen ? (
            <button
              className="c-menu--mobile__button"
              onClick={e => {
                e.preventDefault();
                setSearchOpen(!searchOpen);
                if (activeMenu) {
                  setActiveMenu(false);
                }
              }}
            >
              <SearchIcon />
            </button>
          ) : (
            <CloseSearch setSearchOpen={setSearchOpen} searchOpen={searchOpen} />
          )}
        </div>
        <div className="c-menu--mobile__item">
          <button className="c-menu--mobile__button" onClick={triggerMenu}>
            {activeMenu ? (
              <div>
                <CloseIcon />
              </div>
            ) : (
              <div>
                <MenuIcon />
              </div>
            )}
          </button>
        </div>
      </div>
      {activeMenu ? (
        <div className="c-menu--mobile__backdrop c-menu--mobile__submenu">
          <Accordion
            trigger={
              <div className="c-menu--mobile__trigger-box">
                <MainMenuMobileItem item={menuItems[0]} />
                <ArrowDownCollapsible />
              </div>
            }
          >
            {data && (
              <ul className="c-menu__list">
                {menuItems[0].items.slice(0, 27).map(topic => (
                  <SubMenuItem
                    key={topic._id}
                    label={topic.title}
                    slug={`/topics/${topic.slug.current}`}
                  />
                ))}
              </ul>
            )}
          </Accordion>
          <div className="c-menu--mobile__trigger-box">
            <MainMenuMobileItem item={menuItems[1]} />
          </div>
          <div className="c-menu--mobile__trigger-box">
            <MainMenuMobileItem item={menuItems[2]} />
          </div>
          <Accordion
            trigger={
              <div className="c-menu--mobile__trigger-box">
                <MainMenuMobileItem item={menuItems[3]} />
                <ArrowDownCollapsible />
              </div>
            }
          >
            <ul className="c-menu__list">
              {menuItems[3].sections.map((s, index) =>
                s.items.map((i, index) => <SubMenuItem key={index} label={i.label} slug={i.slug} />)
              )}
            </ul>
          </Accordion>
          <Accordion
            trigger={
              <div className="c-menu--mobile__trigger-box">
                <MainMenuMobileItem item={menuItems[4]} />
                <ArrowDownCollapsible />
              </div>
            }
          >
            <ul className="c-menu__list">
              {menuItems[4].sections.map((s, index) =>
                s.items.map((i, index) => <SubMenuItem key={index} label={i.label} slug={i.slug} type={i._id !== 'frontpage' ? s.type : ''}/>)
              )}
            </ul>
          </Accordion>
          <SocialFollow footer items={socialItems} />
        </div>
      ) : null}
      {searchOpen ? (
        <div className="c-menu--mobile__backdrop c-menu--mobile__submenu">
          <div className="c-menu--mobile__trigger-box">
            <SearchFieldV2
              isOpen={activeSearchMenu}
              isAlwaysOpen={true}
              triggerSearchMenu={triggerSearchMenu}
              searchData={searchData}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
