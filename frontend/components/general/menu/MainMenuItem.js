import React from 'react';
import Link from 'next/link';

export const MainMenuItem = ({
  item = {},
  activeItem = '',
  setActiveItem = () => null,
  activeMenu,
  setActiveMenu = () => null,
}) => {
  const handleClick = (e, id) => {
    e.preventDefault();
    if (item.id !== 'search') {
      setActiveMenu(!activeMenu);
    }
    if (item.id !== activeItem && item.id !== 'search') {
      setActiveMenu(true);
    }
    setActiveItem(id);
  };
  return item.slug ? (
    <Link href={item.slug}>
      <a className="c-btn c-menu__link u-no-underline">
        <h3
          className={`c-menu__heading c-menu__heading${activeItem === item.id ? '--active' : ''}`}
        >
          {item.label}
        </h3>
      </a>
    </Link>
  ) : (
    <h3
      onClick={e => handleClick(e, item.id)}
      className={`c-menu__heading c-menu__heading${activeItem === item.id ? '--active' : ''} `}
    >
      {item.label}
    </h3>
  );
};
