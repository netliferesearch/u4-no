import { Accordion } from 'components/general/accordion/Accordion';
import { MainMenuMobileItem } from 'components/general/menu/MainMenuMobileItem';
import { SubMenuItem } from 'components/general/menu/SubMenuItem';
import { menuItems } from 'components/general/menu/menuItems';
import { SocialFollow } from 'components/general/social/SocialFollow';
import { socialItems } from 'components/general/social/socialItems';
import { ArrowDownCollapsible } from 'components/icons/ArrowDownCollapsible';
import { CloseIcon } from 'components/icons/CloseIcon';
import { CloseSearch } from 'components/icons/CloseSearch';
import { MenuIcon } from 'components/icons/MenuIcon';
import { SearchIcon } from 'components/icons/SearchIcon';
import { SearchField } from '@/app/components/layout/SearchField';
import { initStore } from 'helpers/redux-store';
import { Provider } from 'react-redux';

export const MenuMobile = props => {
  const {
    triggerSearchMenu,
    setSearchOpen,
    activeSearchMenu,
    searchOpen,
    searchData,
    activeMenu,
    setActiveMenu,
  } = props;
  const store = initStore();
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
            {(
              <ul className="c-menu__list">
                {menuItems[0].items.map(topic => (
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
                s.items.map((i, index) => (
                  <SubMenuItem
                    key={index}
                    label={i.label}
                    slug={i.slug}
                    type={i._id !== 'frontpage' ? s.type : ''}
                  />
                ))
              )}
            </ul>
          </Accordion>
          <SocialFollow footer items={socialItems} />
        </div>
      ) : null}
      {searchOpen ? (
        <div className="c-menu--mobile__backdrop c-menu--mobile__submenu">
          <div className="c-menu--mobile__trigger-box">
            <Provider store={store}>
              <SearchField
                isOpen={activeSearchMenu}
                isAlwaysOpen={true}
                triggerSearchMenu={triggerSearchMenu}
                searchData={searchData}
                menu={true}
              />
            </Provider>
          </div>
        </div>
      ) : null}
    </div>
  );
};
