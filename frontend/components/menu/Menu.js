import React, { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import PicoSanity from 'picosanity';
import SearchIcon from '../icons/SearchIcon';
import { menuItems } from './menuItems';
import { MainMenuItem } from './MainMenuItem';
import SearchFieldV2 from '../SearchField-v2';
import { CloseSearch } from '../icons/CloseSearch';
import { SubMenu } from './SubMenu';
import { useOnClickOutside } from '../../helpers/hooks';
import { MainMenu } from './MainMenu';

export const Menu = props => {
  const {
    noSearch,
    triggerSearchMenu,
    setSearchOpen,
    activeSearchMenu,
    searchOpen,
    searchData,
  } = props;
  const [data, setData] = useState('');
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [activeItemData, setActiveItemData] = useState(null);
  const ref = useRef();
  useOnClickOutside(ref, () => setActiveMenu(false));

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
    <div className="c-menu" ref={ref}>
      <MainMenu
        searchOpen={searchOpen}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isOpen={activeSearchMenu}
        triggerSearchMenu={triggerSearchMenu}
        searchData={searchData}
      />

      {!!activeItem && activeMenu ? (
        <SubMenu activeItem={activeItem} activeItemData={activeItemData} />
      ) : null}
    </div>
  );
};
