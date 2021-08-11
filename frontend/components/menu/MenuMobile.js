import React, { useEffect, useRef, useState } from 'react';
import BEMHelper from 'react-bem-helper';
import PicoSanity from 'picosanity';
import SearchIcon from '../icons/SearchIcon';
import MenuIcon from '../icons/MenuIcon';
import Collapsible from 'react-collapsible';
import ArrowDownCollapsible from '../icons/ArrowDownCollapsible';
import CloseIcon from '../icons/CloseIcon';
import { SocialFollow } from '../general/social/SocialFollow';
import { socialItems } from '../general/social/socialItems';
import { menuItems } from './menuItems';
import { MainMenuItem } from './MainMenuItem';
import { MobileMainMenuItem } from './MobileMainMenuItem';
import { SubMenuItem } from './SubMenuItem';
import { useOnClickOutside } from '../../helpers/hooks';

const menuClasses = BEMHelper({
  name: 'menu--mobile',
  prefix: 'c-',
});

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
  const [activeItem, setActiveItem] = useState('');
  // const refMobile = useRef();
  // useOnClickOutside(refMobile, () => setActiveMenu(false));

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
    <div {...menuClasses('main-box')} style={{ color: 'white' }}>
      <button {...menuClasses('button')} onClick={triggerMenu}>
        {activeMenu ? (
          <div>
            <span {...menuClasses('search-icon-holder')}>
              <SearchIcon />
            </span>
            <span>
              <CloseIcon />
            </span>{' '}
          </div>
        ) : (
          <MenuIcon />
        )}
      </button>
      {console.log(activeMenu)}
      {activeMenu ? (
        <div {...menuClasses('backdrop')}>
          <Collapsible
            overflowWhenOpen="scroll"
            trigger={
              <div className="c-menu--mobile__collapsible-trigger-box">
                <MobileMainMenuItem item={menuItems[0]} />
                <ArrowDownCollapsible />
              </div>
            }
          >
            {data && (
              <div {...menuClasses('topics')}>
                <ul {...menuClasses('list')}>
                  {data.slice(0, 27).map(topic => (
                    <SubMenuItem
                      key={topic._id}
                      label={topic.title}
                      slug={`/topics/${topic.slug.current}`}
                    />
                  ))}
                </ul>
              </div>
            )}
          </Collapsible>
          <Collapsible
            trigger={
              <div className="c-menu--mobile__collapsible-trigger-box">
                <MobileMainMenuItem item={menuItems[1]} />
                <ArrowDownCollapsible />
              </div>
            }
          >
            <div {...menuClasses('topics')}>
              {/* <h4 {...menuClasses('heading')}>Learning &amp; events</h4> */}
              <ul {...menuClasses('list')}>
                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/online-courses">
                    Online courses
                  </a>
                </li>
                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/helpdesk">
                    Helpdesk - Ask your question
                  </a>
                </li>

                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/workshops-and-events">
                    Workshops
                  </a>
                </li>

                <li {...menuClasses('list-item')}>
                  {' '}
                  <a {...menuClasses('link')} href="/workshops-and-events">
                    Public U4 Events
                  </a>
                </li>
                <li {...menuClasses('list-item')}>
                  {' '}
                  <a {...menuClasses('link')} href="/workshops-and-events">
                    Partners only events
                  </a>
                </li>
              </ul>
            </div>{' '}
          </Collapsible>
          <Collapsible
            trigger={
              <div className="c-menu--mobile__collapsible-trigger-box">
                <MobileMainMenuItem item={menuItems[2]} />
                <ArrowDownCollapsible />
              </div>
            }
          >
            <div {...menuClasses('topics')}>
              {' '}
              <ul {...menuClasses('list')}>
                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/about-u4">
                    About us
                  </a>
                </li>
                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/the-team">
                    Staff
                  </a>
                </li>
                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/u4-partner-agencies">
                    Partner Information
                  </a>
                </li>

                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/about-u4">
                    Funding Partners
                  </a>
                </li>
                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/the-team">
                    Expert Network
                  </a>
                </li>
                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/u4-partner-agencies">
                    Anti-Coruption helpdesk
                  </a>
                </li>

                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/about-u4">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </Collapsible>

          <div className="c-menu--mobile__collapsible-trigger-box">
            <MobileMainMenuItem item={menuItems[3]} />
          </div>

          <SocialFollow items={socialItems} />
        </div>
      ) : null}
    </div>
  );
};
