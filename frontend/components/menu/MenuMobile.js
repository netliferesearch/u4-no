import React, { Component, useEffect, useState } from 'react';
import BEMHelper from 'react-bem-helper';
import PropTypes from 'prop-types';
import Router from 'next/router';
import PicoSanity from 'picosanity';
import SearchIcon from '../icons/SearchIcon';
import MenuIcon from '../icons/MenuIcon';
import Collapsible from 'react-collapsible';

import FbRound from '../icons/FbRound';
import TwitterRound from '../icons/TwitterRound';
import LinkedInRound from '../icons/LinkedInRound';
import SearchFieldV2 from '../SearchField-v2';
import { CloseSearch } from '../icons/CloseSearch';
import ArrowDownCollapsible from '../icons/ArrowDownCollapsible';
import CloseIcon from '../icons/CloseIcon';
import { EmailIcon, FacebookIcon, LinkedInIcon, TwitterIcon } from '../icons/SocialIcons';

const menuClasses = BEMHelper({
  name: 'mobile-menu-v2',
  prefix: 'c-',
});

export const MenuMobile = props => {
  const {
    noSearch,
    triggerSearchMenu,
    setSearchOpen,
    activeSearchMenu,
    searchOpen,
    searchData,
  } = props;
  const [activeMenu, setActiveMenu] = useState(false);

  const triggerMenu = e => {
    e.preventDefault();
    setActiveMenu(!activeMenu);
  };

  const [data, setData] = useState('');
  useEffect(
    () => {
      if (data) {
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

      {activeMenu ? (
        <div {...menuClasses('backdrop')}>
          <Collapsible
            overflowWhenOpen="scroll"
            trigger={
              <div className="c-mobile-menu-v2__collapsible-trigger-box">
                <p className="c-mobile-menu-v2__collapsible-text">Research topics</p>
                <ArrowDownCollapsible />
              </div>
            }
          >
            {data && (
              <div {...menuClasses('topics')}>
                <ul {...menuClasses('list')}>
                  {data.slice(0, 27).map(topic => (
                    <li {...menuClasses('list-item')} key={topic._id}>
                      <a href={`/topics/${topic.slug.current}`} {...menuClasses('link')}>
                        {topic.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Collapsible>
          <Collapsible
            trigger={
              <div className="c-mobile-menu-v2__collapsible-trigger-box">
                <p className="c-mobile-menu-v2__collapsible-text">LEARNING & EVENTS</p>
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
              <div className="c-mobile-menu-v2__collapsible-trigger-box">
                <p className="c-mobile-menu-v2__collapsible-text">About us</p>{' '}
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
          <Collapsible
            trigger={
              <div className="c-mobile-menu-v2__collapsible-trigger-box">
                <p className="c-mobile-menu-v2__collapsible-text">The U4 Blog</p>
                <ArrowDownCollapsible />
              </div>
            }
          >
            <p style={{ color: 'white' }}>
              This is the collapsible content. It can be any element or React component you like.
            </p>
            <p style={{ color: 'white' }}>
              It can even be another Collapsible component. Check out the next section!
            </p>
          </Collapsible>
          <div {...menuClasses('share-holder')}>
            <a {...menuClasses('share-button')} href="https://www.facebook.com/U4anticorruption/">
              <FacebookIcon />
            </a>
            <a
              {...menuClasses('share-button')}
              href="https://www.linkedin.com/showcase/u4-anti-corruption-resource-centre/"
            >
              <LinkedInIcon />
            </a>

            <a {...menuClasses('share-button')} href="https://twitter.com/U4_ACRC">
              <TwitterIcon />
            </a>
            <a {...menuClasses('share-button')} href="https://twitter.com/U4_ACRC">
              <EmailIcon />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
};
