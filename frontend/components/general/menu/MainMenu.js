import React from 'react';
import { menuItems } from './menuItems';
import { MainMenuItem } from './MainMenuItem';
import { SearchField } from '../../search/SearchField';
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
          <SearchField
            isOpen={activeSearchMenu}
            isAlwaysOpen={true}
            triggerSearchMenu={triggerSearchMenu}
            searchData={searchData}
            menu={true}
          />
          <CloseSearch setSearchOpen={setSearchOpen} searchOpen={searchOpen} />
        </div>
      )}
    </div>
  );
};
