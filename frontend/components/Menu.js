import React, { Component } from 'react';
import BEMHelper from 'react-bem-helper';
import sanityClient from '@sanity/client';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Link } from '../routes';
import { SearchField, SearchFieldV2 } from '../components';
import { ArrowRight } from '../components/icons';

const classes = BEMHelper({
  name: 'top-bar',
  prefix: 'c-',
});

const menuClasses = BEMHelper({
  name: 'menu',
  prefix: 'c-',
});

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMenu: false,
      activeSearchMenu: false,
      activeExpand: false,
      data: '',
      activeItem: 0,
    };
    this.triggerMenu = this.triggerMenu.bind(this);
    this.triggerSearchMenu = this.triggerSearchMenu.bind(this);
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
    client.fetch(sanityQuery, {}).then((data) => {
      this.setState({
        data,
      });
    });
    Router.onRouteChangeStart = () => {
      this.setState({
        activeMenu: false,
        activeSearchMenu: false,
        activeItem: 1,
      });
    };
  }

  triggerMenu(e) {
    e.preventDefault();
    this.setState({
      activeMenu: !this.state.activeMenu,
      activeSearchMenu: false,
      activeItem: 1,
    });
  }

  triggerSearchMenu(e) {
    e.preventDefault();
    this.setState({
      activeSearchMenu: !this.state.activeSearchMenu,
      activeMenu: false,
      activeItem: 3,
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
    const { noSearch } = this.props;
    return (
      <div {...classes('wrapper')}>
        {this.state.activeSearchMenu ? (
          <SearchFieldV2 />
        ) : null}

        <ul {...classes('menu')}>
          {!noSearch && (
            <li {...classes('menu-item')}>
              <button onClick={this.triggerSearchMenu}>Search</button>
            </li>
          )}
          <li {...classes('menu-item')}>
            <button onClick={this.triggerMenu}>Menu</button>
          </li>

        </ul>
        {this.state.activeMenu ? (
          <div>
            <button onClick={this.triggerMenu} {...menuClasses('backdrop')} />
            <div {...menuClasses()}>
              <ul {...classes('menu', 'active')}>
                <li {...classes('menu-item', this.state.activeItem === 1 && 'active')}>
                  <button onClick={this.triggerMenu}>Close</button>
                </li>
              </ul>

              {topics && (
                <div>
                  <h4 {...menuClasses('heading')}>
                    <span {...menuClasses('heading-bg')}>Corruption by topic</span>
                  </h4>
                  <ul {...menuClasses('list')}>
                    {topics.slice(0, 5).map(topic => (
                      <li {...menuClasses('list-item')} key={topic._id}>
                        <a href={`/topics/${topic.slug.current}`} {...menuClasses('link')}>{topic.title}</a>
                      </li>
                    ))}
                    {this.state.activeExpand &&
                      topics.slice(5, 50).map(topic => (
                        <li {...menuClasses('list-item')} key={topic._id}>
                          <a href={`/topics/${topic.slug.current}`} {...menuClasses('link')}>{topic.title}</a>
                        </li>
                      ))}
                    {this.state.activeExpand ? (
                      <button {...menuClasses('clean-btn')} onClick={this.triggerExpand}>
                        <ArrowRight {...menuClasses('arrowdown', 'flipped')} /> Less
                      </button>
                    ) : (
                      <button {...menuClasses('clean-btn')} onClick={this.triggerExpand}>
                        <ArrowRight {...menuClasses('arrowdown')} /> More
                      </button>
                    )}
                  </ul>
                </div>
              )}

              <h4 {...menuClasses('heading')}>
                <span {...menuClasses('heading-bg')}>Resources</span>
              </h4>
              <ul {...menuClasses('list')}>
                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/search?filters=pub-type-0&search=*">
                    Publications
                  </a>
                </li>
                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/search?filters=pub-type-pubtype-3&search=*">
                    Helpdesk answers
                  </a>
                </li>
                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/terms">
                    Glossary
                  </a>
                </li>
              </ul>

              <h4 {...menuClasses('heading')}>
                <span {...menuClasses('heading-bg')}>General information</span>
              </h4>
              <ul {...menuClasses('list')}>
                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/about-u4">
                    About U4
                  </a>
                </li>
                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/the-team">
                    People
                  </a>
                </li>
                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/u4-partner-agencies">
                    Partner agencies
                  </a>
                </li>
              </ul>

              <h4 {...menuClasses('heading')}>
                <span {...menuClasses('heading-bg')}>Services</span>
              </h4>
              <ul {...menuClasses('list')}>
                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/online-courses">
                    Online courses
                  </a>
                </li>
                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/workshops-and-events">
                    Workshops and events
                  </a>
                </li>
                <li {...menuClasses('list-item')}>
                  <a {...menuClasses('link')} href="/helpdesk">
                    Anti-corruption helpdesk
                  </a>
                </li>
              </ul>

              <div {...menuClasses('links--round')}>
                <a {...menuClasses('link-round')} href="/helpdesk">
                  Helpdesk
                </a>

                <a {...menuClasses('link-round')} href="/the-team">
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

Menu.defaultProps = {
  noSearch: false,
};
Menu.propTypes = {
  noSearch: PropTypes.bool,
};

export default Menu;
