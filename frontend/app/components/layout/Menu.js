import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { menuItems } from 'components/general/menu/menuItems';
import { SubMenu } from 'components/general/menu/SubMenu';
import { MainMenu } from '@/app/components/layout/MainMenu';

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
  const pathname = usePathname()
 
  useEffect(
    () => {
      setActiveMenu(false);
      setSearchOpen(false);
    }, 
    [pathname]);
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
