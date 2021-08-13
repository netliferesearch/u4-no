import React from 'react';
import { SearchIcon } from '../../icons/SearchIcon';
import { menuItems } from './menuItems';
import { MainMenuItem } from './MainMenuItem';
import SearchFieldV2 from '../../SearchField-v2';
import { CloseSearch } from '../../icons/CloseSearch';

export const MainMenu = ({
  searchOpen,
  activeItem,
  setActiveItem,
  activeMenu,
  setActiveMenu,
  activeSearchMenu,
  triggerSearchMenu,
  searchData,
  setSearchOpen,
}) => {
  return (
    <div className="c-menu__items c-main-menu">
      {searchOpen === false ? (
        <>
          {menuItems
            ? menuItems.map(item => (
                <MainMenuItem
                  key={item.id}
                  item={item}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                />
              ))
            : null}
          <span
            onClick={e => {
              e.preventDefault();
              setSearchOpen(!searchOpen);
            }}
            className="c-menu__heading"
            style={{ marginRight: '0' }}
          >
            <SearchIcon />
          </span>
        </>
      ) : (
        <div className="c-menu__search-holder">
          <SearchFieldV2
            isOpen={activeSearchMenu}
            isAlwaysOpen={true}
            triggerSearchMenu={triggerSearchMenu}
            searchData={searchData}
          />
          <CloseSearch setSearchOpen={setSearchOpen} searchOpen={searchOpen} />
        </div>
      )}
    </div>
  );
};
