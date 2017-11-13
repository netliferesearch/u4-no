import React, { Component } from 'react';
import { Link } from '../routes';
import { SearchField } from '../components';
import { ArrowRight } from '../components/icons';
import BEMHelper from 'react-bem-helper';
import sanityClient from '@sanity/client';
import PropTypes from 'prop-types';

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
      <div>
        <ul {...classes('menu')}>
          <li {...classes('menu-item')}>
            <button onClick={this.triggerMenu}>Menu</button>
          </li>
          {!noSearch &&
            <li {...classes('menu-item')}>
              <button onClick={this.triggerSearchMenu}>Search</button>
            </li>
          }
        </ul>
        {this.state.activeMenu ? (
          <div>
            <button onClick={this.triggerMenu} {...menuClasses('backdrop')} />
            <div {...menuClasses()}>

              <ul {...classes('menu', 'active')}>
                <li {...classes('menu-item', this.state.activeItem == 1 && 'active')}>
                  <button onClick={this.triggerMenu}>Close</button>
                </li>
                {!noSearch &&
                  <li {...classes('menu-item', this.state.activeItem == 3 && 'active')}>
                    <button onClick={this.triggerSearchMenu}>Search</button>
                  </li>
                }
              </ul>

              {topics && (
                <div>
                  <h4 {...menuClasses('heading')}>
                    <span {...menuClasses('heading-bg')}>Corruption by topic</span>
                  </h4>
                  <ul {...menuClasses('list')}>
                    {topics.slice(0, 5).map(topic => (
                      <li {...menuClasses('list-item')} key={topic._id}>
                        <button {...menuClasses('clean-btn')} onClick={this.triggerMenu}>
                          <Link route="topic.entry" params={{ slug: topic.slug.current }}>
                            <a {...menuClasses('link')}>{topic.title}</a>
                          </Link>
                        </button>
                      </li>
                    ))}
                    {this.state.activeExpand &&
                      topics.slice(5, 50).map(topic => (
                        <li {...menuClasses('list-item')} key={topic._id}>
                          <button {...menuClasses('clean-btn')} onClick={this.triggerMenu}>
                            <Link route="topic.entry" params={{ slug: topic.slug.current }}>
                              <a {...menuClasses('link')}>{topic.title}</a>
                            </Link>
                          </button>
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
                <li {...menuClasses('list-item')}>Publications</li>
                <li {...menuClasses('list-item')}>Helpdesk answers</li>
                <li {...menuClasses('list-item')}>
                  <Link to={'/terms'}>
                    <a {...menuClasses('link')}>Glossary</a>
                  </Link>
                </li>
              </ul>

              <h4 {...menuClasses('heading')}>
                <span {...menuClasses('heading-bg')}>General information</span>
              </h4>
              <ul {...menuClasses('list')}>
                <li {...menuClasses('list-item')}>
                  <button {...menuClasses('clean-btn')} onClick={this.triggerMenu}>
                    <Link to={'/about-u4'}>
                      <a {...menuClasses('link')}>About U4</a>
                    </Link>
                  </button>
                </li>
                <li {...menuClasses('list-item')}>
                  <button {...menuClasses('clean-btn')} onClick={this.triggerMenu}>
                    <Link to={'/the-team'}>
                      <a {...menuClasses('link')}>People</a>
                    </Link>
                  </button>
                </li>
                <li {...menuClasses('list-item')}>
                  <Link to={'/partner-agencies'}>
                    <a {...menuClasses('link')}>Partner agencies</a>
                  </Link>
                </li>
              </ul>

              <h4 {...menuClasses('heading')}>
                <span {...menuClasses('heading-bg')}>Services</span>
              </h4>
              <ul {...menuClasses('list')}>
                <li {...menuClasses('list-item')}>
                  <button {...menuClasses('clean-btn')} onClick={this.triggerMenu}>
                    <Link to={'/online-courses'}>
                      <a {...menuClasses('link')}>Online courses</a>
                    </Link>
                  </button>
                </li>
                <li {...menuClasses('list-item')}>
                  <button {...menuClasses('clean-btn')} onClick={this.triggerMenu}>
                    <Link to={'/workshops-and-events'}>
                      <a {...menuClasses('link')}>Workshops and events</a>
                    </Link>
                  </button>
                </li>
                <li {...menuClasses('list-item')}>
                  <button {...menuClasses('clean-btn')} onClick={this.triggerMenu}>
                    <Link to={'/helpdesk'}>
                      <a {...menuClasses('link')}>Anti-corruption helpdesk</a>
                    </Link>
                  </button>
                </li>
              </ul>

              <div {...menuClasses('links--round')}>
                <Link to={'/helpdesk'}>
                  <a {...menuClasses('link-round')}>Helpdesk</a>
                </Link>

                <Link to={'/the-team'}>
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
                <li {...classes('menu-item', this.state.activeItem == 3 && 'active')}>
                  <button onClick={this.triggerSearchMenu}>Close</button>
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

Menu.PropTypes = {
  noSearch: false,
};

export default Menu;
