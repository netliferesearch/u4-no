import React, { useEffect, useState } from 'react';
import PicoSanity from 'picosanity';
import { SearchIcon } from '../../icons/SearchIcon';
import { MenuIcon } from '../../icons/MenuIcon';
import { ArrowDownCollapsible } from '../../icons/ArrowDownCollapsible';
import { CloseIcon } from '../../icons/CloseIcon';
import { SocialFollow } from '../social/SocialFollow';
import { socialItems } from '../social/socialItems';
import { menuItems } from './menuItems';
import { MobileMainMenuItem } from './MobileMainMenuItem';
import { SubMenuItem } from './SubMenuItem';
import { Accordion } from '../accordion/Accordion';

export const MenuMobile = props => {
  const {
    triggerSearchMenu,
    setSearchOpen,
    activeSearchMenu,
    searchOpen,
    searchData,
    activeMenu,
    setActiveMenu,
  } = props;

  const triggerMenu = e => {
    e.preventDefault();
    setActiveMenu(!activeMenu);
  };

  const [data, setData] = useState('');

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
  return (
    <div className="c-menu--mobile c-menu--mobile__main-box" style={{ color: 'white' }}>
      <button className="c-menu--mobile__button" onClick={triggerMenu}>
        {activeMenu ? (
          <div>
            {/* <SearchFieldV2
              isOpen={activeSearchMenu}
              isAlwaysOpen={true}
              triggerSearchMenu={triggerSearchMenu}
              searchData={searchData}
            /> */}
            <span className="c-menu--mobile__search-icon-holder">
              <SearchIcon />
            </span>
            <span>
              <CloseIcon />
            </span>
          </div>
        ) : (
          <MenuIcon />
        )}
      </button>
      {activeMenu ? (
        <div className="c-menu--mobile__backdrop">
          <Accordion
            trigger={
              <div className="c-menu--mobile__trigger-box">
                <MobileMainMenuItem item={menuItems[0]} />
                <ArrowDownCollapsible />
              </div>
            }
          >
            {data && (
              <ul className="c-menu__list">
                {data.slice(0, 27).map(topic => (
                  <SubMenuItem
                    key={topic._id}
                    label={topic.title}
                    slug={`/topics/${topic.slug.current}`}
                  />
                ))}
              </ul>
            )}
          </Accordion>
          <Accordion
            trigger={
              <div className="c-menu--mobile__trigger-box">
                <MobileMainMenuItem item={menuItems[1]} />
                <ArrowDownCollapsible />
              </div>
            }
          >
            <ul className="c-menu__list">
              {menuItems[1].sections.map((s, index) =>
                s.items.map((i, index) => <SubMenuItem key={index} label={i.label} slug={i.slug} />)
              )}
            </ul>
          </Accordion>
          <Accordion
            trigger={
              <div className="c-menu--mobile__trigger-box">
                <MobileMainMenuItem item={menuItems[2]} />
                <ArrowDownCollapsible />
              </div>
            }
          >
            <ul className="c-menu__list">
              {menuItems[2].sections.map((s, index) =>
                s.items.map((i, index) => <SubMenuItem key={index} label={i.label} slug={i.slug} />)
              )}
            </ul>
          </Accordion>
          <div className="c-menu--mobile__trigger-box">
            <MobileMainMenuItem item={menuItems[3]} />
          </div>
          <SocialFollow items={socialItems} />
        </div>
      ) : null}
    </div>
  );
};
