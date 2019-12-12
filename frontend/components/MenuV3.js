import React, { Component } from 'react';
import BEMHelper from 'react-bem-helper';
import sanityClient from '@sanity/client';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { SearchIcon, MenuIcon } from './icons';

const classes = BEMHelper({
  name: 'top-bar',
  prefix: 'c-',
});

const menuClasses = BEMHelper({
  name: 'menu',
  prefix: 'c-',
});

class MenuV3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMenu: false,
      activeExpand: false,
      data: '',
      activeItem: 0,
    };
    this.triggerMenu = this.triggerMenu.bind(this);
    this.triggerExpand = this.triggerExpand.bind(this);
  }

  componentDidMount() {
    if (this.state.data) {
      return; // no need to fetch data if we got link data passed in.
    }
    const client = sanityClient({
      projectId: '1f1lcoov',
      dataset: 'production',
      token: '',
      useCdn: true,
    });
    const sanityQuery = '*[_type == "topics"] | order(title){_id, title, slug}';
    client.fetch(sanityQuery, {}).then(data => {
      this.setState({
        data,
      });
    });
    Router.onRouteChangeStart = () => {
      this.setState({
        activeMenu: false,
        activeItem: 1,
      });
    };
  }

  triggerMenu(e) {
    e.preventDefault();
    this.setState({
      activeMenu: !this.state.activeMenu,
      activeItem: 1,
    });
  }

  triggerExpand(e) {
    e.preventDefault();
    this.setState({
      activeExpand: !this.state.activeExpand,
    });
  }

  render() {
    const topics = this.state.data;
    const { noSearch, triggerSearchMenu, activeSearchMenu } = this.props;
    return (
      <div>
        <ul {...classes('menu', 'fixed')}>
          {!noSearch && !activeSearchMenu && (
            <li {...classes('menu-item')}>
              <button onClick={triggerSearchMenu}>
                Search
                <span {...classes('menu-icon', 'fixed')}>
                  <SearchIcon />
                </span>
              </button>
            </li>
          )}
          <li {...classes('menu-item', 'fixed')}>
            <button
              onClick={this.triggerMenu}
              {...classes('menu-button', this.state.activeMenu && 'active')}
            >
              Menu
              <span {...classes('menu-icon', 'fixed')}>
                {this.state.activeMenu ? (
                  <img alt="Close icon" src="/static/close.svg" />
                ) : (
                  <MenuIcon />
                )}
              </span>
            </button>
          </li>
        </ul>
        {this.state.activeMenu ? (
          <div>
            <button onClick={this.triggerMenu} {...menuClasses('backdrop', 'fixed')} />
            <div {...menuClasses('', 'fixed')}>
              <div {...menuClasses('section')}>
                <div {...menuClasses('resources')}>
                  <h4 {...menuClasses('heading', 'fixed')}>
                    <span {...menuClasses('heading-bg', 'fixed')}>Resources &amp; learning</span>
                  </h4>
                  <ul {...menuClasses('list', 'fixed')}>
                    <li {...menuClasses('list-item')}>
                      <a
                        {...menuClasses('link', 'fixed')}
                        href="/search?filters=publications-only&sort=year-desc"
                      >
                        All publications &amp; resources
                      </a>
                    </li>
                    <li {...menuClasses('list-item')}>
                      <a
                        {...menuClasses('link', 'fixed')}
                        href="/search?filters=publications-only%2Cpub-U4%20Blog&sort=year-desc"
                      >
                        Blog
                      </a>
                    </li>
                    <li {...menuClasses('list-item')}>
                      <a {...menuClasses('link', 'fixed')} href="/terms">
                        Glossary
                      </a>
                    </li>
                  </ul>
                  <ul {...menuClasses('list')}>
                    <li {...menuClasses('list-item')}>
                      <a {...menuClasses('link', 'fixed')} href="/helpdesk">
                        Helpdesk - Ask your question
                      </a>
                    </li>
                    <li {...menuClasses('list-item')}>
                      <a {...menuClasses('link', 'fixed')} href="/online-courses">
                        Online courses
                      </a>
                    </li>
                    <li {...menuClasses('list-item')}>
                      <a {...menuClasses('link', 'fixed')} href="/workshops-and-events">
                        Workshops and events
                      </a>
                    </li>
                  </ul>
                </div>
                <div {...menuClasses('about')}>
                  <h4 {...menuClasses('heading', 'fixed')}>
                    <span {...menuClasses('heading-bg', 'fixed')}>About</span>
                  </h4>
                  <ul {...menuClasses('list')}>
                    <li {...menuClasses('list-item')}>
                      <a {...menuClasses('link', 'fixed')} href="/about-u4">
                        About U4
                      </a>
                    </li>
                    <li {...menuClasses('list-item')}>
                      <a {...menuClasses('link', 'fixed')} href="/u4-partner-agencies">
                        Partner agencies
                      </a>
                    </li>
                    <li {...menuClasses('list-item')}>
                      <a {...menuClasses('link', 'fixed')} href="/the-team">
                        People
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {topics && (
                <div {...menuClasses('topics')}>
                  <h4 {...menuClasses('heading', 'fixed')}>
                    <span {...menuClasses('heading-bg', 'fixed')}>Corruption by topic</span>
                  </h4>
                  <ul {...menuClasses('list')}>
                    {topics.slice(0, 6).map(topic => (
                      <li {...menuClasses('list-item')} key={topic._id}>
                        <a href={`/topics/${topic.slug.current}`} {...menuClasses('link', 'fixed')}>
                          {topic.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <ul {...menuClasses('list')}>
                    {topics.slice(6, 12).map(topic => (
                      <li {...menuClasses('list-item')} key={topic._id}>
                        <a href={`/topics/${topic.slug.current}`} {...menuClasses('link', 'fixed')}>
                          {topic.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <ul {...menuClasses('list')}>
                    {topics.slice(12, 18).map(topic => (
                      <li {...menuClasses('list-item')} key={topic._id}>
                        <a href={`/topics/${topic.slug.current}`} {...menuClasses('link', 'fixed')}>
                          {topic.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div {...menuClasses('contact')}>
                <a {...menuClasses('link', 'fixed')} href="/the-team">
                  Contact
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

MenuV3.defaultProps = {
  noSearch: false,
};
MenuV3.propTypes = {
  noSearch: PropTypes.bool,
};

export default MenuV3;
