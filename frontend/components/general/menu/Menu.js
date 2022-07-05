import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import { menuItems } from './menuItems';
import { SubMenu } from './SubMenu';
import { MainMenu } from './MainMenu';

export const Menu = props => {
  const {
    triggerSearchMenu,
    setSearchOpen,
    activeSearchMenu,
    searchOpen,
    searchData,
    activeMenu,
    setActiveMenu,
  } = props;
  const [activeItem, setActiveItem] = useState('');
  const [activeItemData, setActiveItemData] = useState(null);
 
  useEffect(() => {
    Router.onRouteChangeStart = () => {
      setActiveMenu(false);
      setSearchOpen(false);
    };
  }, []);
  useEffect(
    () => {
      setActiveItemData(menuItems.find(i => i.id === activeItem));
    },
    [activeItem]
  );

  return (
    <div className="c-menu">
      <MainMenu
        searchOpen={searchOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isOpen={activeSearchMenu}
        triggerSearchMenu={triggerSearchMenu}
        searchData={searchData}
        setSearchOpen={setSearchOpen}
      />

      {activeItem && activeItem !== 'search' && activeMenu ? (
        <SubMenu activeItem={activeItem} activeItemData={activeItemData} />
      ) : null}
    </div>
  );
};
