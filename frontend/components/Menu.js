import React, { Component } from 'react';
import { Link } from '../routes';
import { SearchField } from '../components';
import { ArrowRight } from '../components/icons';
import BEMHelper from 'react-bem-helper';
import sanityClient from '@sanity/client';

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
    const sanityQuery = '*[_type == "topics"]{_id, title, slug}';
    client.fetch(sanityQuery, {}).then((data) => {
      this.setState({
        data,
      });
    });
  }

  triggerMenu(e) {
    e.preventDefault();
    this.setState({
      activeMenu: !this.state.activeMenu,
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
    return (
      <div>
        <ul {...classes('menu')}>
          <li {...classes('menu-item')}>
            <button onClick={this.triggerMenu}>Menu</button>
          </li>
          <li {...classes('menu-item')}>A-Z</li>
          <li {...classes('menu-item')}>
            <button onClick={this.triggerSearchMenu}>Search</button>
          </li>
        </ul>
        {this.state.activeMenu ? (
          <div>
            <button onClick={this.triggerMenu} {...menuClasses('backdrop')} />
            <div {...menuClasses()}>

              <ul {...classes('menu', 'active')}>
                <li {...classes('menu-item', this.state.activeItem == 1 && 'active')}>
                  <button onClick={this.triggerMenu}>Menu</button>
                </li>
                <li {...classes('menu-item')}>A-Z</li>
                <li {...classes('menu-item', this.state.activeItem == 3 && 'active')}>
                  <button onClick={this.triggerSearchMenu}>Search</button>
                </li>
              </ul>

              {topics && (
                <div>
                  <h4 {...menuClasses('heading')}>
                    <span {...menuClasses('heading-bg')}>Corruption by topic</span>
                  </h4>
                  <ul {...menuClasses('list')}>
                    {topics.slice(0, 5).map(topic => (
                      <li key={topic._id}>
                        <Link route="topic.entry" params={{ slug: topic.slug.current }}>
                          <a {...menuClasses('link')}>{topic.title}</a>
                        </Link>
                      </li>
                    ))}
                    {this.state.activeExpand &&
                      topics.slice(5, 50).map(topic => (
                        <li key={topic._id}>
                          <Link route="topic.entry" params={{ slug: topic.slug.current }}>
                            <a {...menuClasses('link')}>{topic.title}</a>
                          </Link>
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
                <li>Publications</li>
                <li>Expert answers</li>
              </ul>

              <h4 {...menuClasses('heading')}>
                <span {...menuClasses('heading-bg')}>People</span>
              </h4>
              <ul {...menuClasses('list')}>
                <li>
                  <Link to={'/the-team'}>
                    <a {...menuClasses('link')}>U4 staff</a>
                  </Link>
                </li>
                <li>
                  <Link to={'/'}>
                    <a {...menuClasses('link')}>Partner Agencies</a>
                  </Link>
                </li>
              </ul>

              <h4 {...menuClasses('heading')}>
                <span {...menuClasses('heading-bg')}>Online training</span>
              </h4>

              <h4 {...menuClasses('heading')}>
                <span {...menuClasses('heading-bg')}>Workshops & events</span>
              </h4>

              <div {...menuClasses('links--round')}>
                <Link to={'/'}>
                  <a {...menuClasses('link-round')}>Partner Helpdesk</a>
                </Link>

                <Link to={'/'}>
                  <a {...menuClasses('link-round')}>Contact</a>
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        {this.state.activeSearchMenu ? (
          <div>
            <button onClick={this.triggerSearchMenu} {...menuClasses('backdrop')} />
            <div {...menuClasses()}>

              <ul {...classes('menu', 'active')}>
                <li {...classes('menu-item', this.state.activeItem == 1 && 'active')}>
                  <button onClick={this.triggerMenu}>Menu</button>
                </li>
                <li {...classes('menu-item')}>A-Z</li>
                <li {...classes('menu-item', this.state.activeItem == 3 && 'active')}>
                  <button onClick={this.triggerSearchMenu}>Search</button>
                </li>
              </ul>

              <SearchField modifier="small" />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Menu;
