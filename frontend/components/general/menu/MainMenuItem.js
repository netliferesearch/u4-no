import React from 'react';
import Link from 'next/link';
import { SearchIcon } from '../../icons/SearchIcon';

export const MainMenuItem = ({
  item = {},
  activeItem = '',
  setActiveItem = () => null,
  activeMenu,
  setActiveMenu = () => null,
  setSearchOpen = () => null,
  searchOpen = false,
}) => {
  const handleClick = (e, id) => {
    e.preventDefault();
    if (item.id !== 'search') {
      setActiveMenu(!activeMenu);
    }
    if (item.id !== activeItem && item.id !== 'search') {
      setActiveMenu(true);
    }
    if (item.id === 'search') {
      setSearchOpen(!searchOpen);
    }
    setActiveItem(id);
  };
  return item.slug ? (
    (<Link href={item.slug} className="c-btn c-menu__link u-no-underline">

      <h3
        className={`c-menu__heading c-menu__heading${activeItem === item.id ? '--active' : ''}`}
      >
        {item.label}
      </h3>

    </Link>)
  ) : (
    <h3
      onClick={e => handleClick(e, item.id)}
      className={`c-menu__heading c-menu__heading${activeItem === item.id ? '--active' : ''} c-menu__heading${item.id === 'search' ? '--search' : ''}`}
    >
      {item.label}
      {item.id === 'search' && <SearchIcon />}
    </h3>
  );
};
