import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import PicoSanity from 'picosanity';
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
  const [data, setData] = useState('');
  const [activeItem, setActiveItem] = useState('');
  const [activeItemData, setActiveItemData] = useState(null);
  useEffect(
    () => {
      if (data) {
        menuItems[0].items = data;
        return; // no need to fetch data if we got link data passed in.
      }
      const client = new PicoSanity({
        projectId: '1f1lcoov',
        dataset: 'production',
        token: '',
        useCdn: true,
      });
      const sanityQuery = '*[_type == "topics"] | order(title){_id, title, slug}';
      client.fetch(sanityQuery, {}).then(data => {
        setData(data);
      });
    },

    [data]
  );
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
