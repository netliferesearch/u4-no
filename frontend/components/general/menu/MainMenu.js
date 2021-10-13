import React from 'react';
import { menuItems } from './menuItems';
import { MainMenuItem } from './MainMenuItem';
import SearchFieldV3 from '../../search/SearchField-v2';
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
                  setSearchOpen={setSearchOpen}
                  searchOpen={searchOpen}
                />
              ))
            : null}
        </>
      ) : (
        <div className="c-menu__search-holder">
          <SearchFieldV3
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
