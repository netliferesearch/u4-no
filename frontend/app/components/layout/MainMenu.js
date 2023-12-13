import React from 'react';
import { menuItems } from 'components/general/menu/menuItems';
import { MainMenuItem } from 'components/general/menu/MainMenuItem';
import { SearchField } from '@/app/components/layout/SearchField';
import { CloseSearch } from 'components/icons/CloseSearch';
import { Provider } from 'react-redux';
import { initStore } from 'helpers/redux-store';

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
  const store = initStore();
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
          <Provider store={store}>
            <SearchField
              isOpen={activeSearchMenu}
              isAlwaysOpen={true}
              triggerSearchMenu={triggerSearchMenu}
              searchData={searchData}
              menu={true}
            />
          </Provider>
          <CloseSearch setSearchOpen={setSearchOpen} searchOpen={searchOpen} />
        </div>
      )}
    </div>
  );
};
