import React, { Component } from 'react';
import { Link } from '../routes';
import { ArrowRight } from '../components/icons';
import BEMHelper from 'react-bem-helper';


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
      activeExpand: false,
    };
    this.triggerMenu = this.triggerMenu.bind(this);
    this.triggerExpand = this.triggerExpand.bind(this);
  }

  triggerMenu(e) {
    e.preventDefault();
    this.setState({
      activeMenu: !this.state.activeMenu,
    });
  }

  triggerExpand(e) {
    e.preventDefault();
    this.setState({
      activeExpand: !this.state.activeExpand,
    });
  }

  render() {
    const {
      topics,
    } = this.props;

    return (
      <div>
        <ul {...classes('menu')}>
          <li {...classes('menu-item')}>
            <button onClick={this.triggerMenu}>
              Menu
            </button>
          </li>
          <li {...classes('menu-item')}>
            A-Z
          </li>
          <li {...classes('menu-item')}>
            <button>
              Search
            </button>
          </li>
        </ul>
        {this.state.activeMenu ?
          (
            <div>
              <button onClick={this.triggerMenu} {...menuClasses('backdrop')} />
              <div {...menuClasses()}>

                { topics &&
                <div>
                  <h4 {...menuClasses('heading')}>
                    <span {...menuClasses('heading-bg')}>
                  Corruption by topic
                    </span>
                  </h4>
                  <ul {...menuClasses('list')}>
                    {topics.slice(0, 5).map(topic =>
                      (<li>
                        <Link route="topic.entry" params={{ slug: topic.slug.current }}>
                          <a {...menuClasses('link')}>
                            {topic.title}
                          </a>
                        </Link>
                      </li>),
                    )
                    }
                    {this.state.activeExpand &&
                      topics.slice(5, 50).map(topic =>
                        (<li>
                          <Link route="topic.entry" params={{ slug: topic.slug.current }}>
                            <a {...menuClasses('link')}>
                              {topic.title}
                            </a>
                          </Link>
                        </li>),
                      )
                    }
                    {this.state.activeExpand ?
                      <button {...menuClasses('clean-btn')} onClick={this.triggerExpand}>
                        <ArrowRight {...menuClasses('arrowdown', 'flipped')} /> Less</button>
                      :
                      <button {...menuClasses('clean-btn')} onClick={this.triggerExpand}>
                        <ArrowRight {...menuClasses('arrowdown')} /> More</button>
                    }
                  </ul>


                </div>
                }

                <h4 {...menuClasses('heading')}>
                  <span {...menuClasses('heading-bg')}>
                Resources
                  </span>
                </h4>
                <ul {...menuClasses('list')}>
                  <li>
                    Publications
                  </li>
                  <li>
                    Expert answers
                  </li>
                </ul>

                <h4 {...menuClasses('heading')}>
                  <span {...menuClasses('heading-bg')}>
                People
                  </span>
                </h4>
                <ul {...menuClasses('list')}>
                  <li>
                    <Link to={'/the-team'}>
                      <a {...menuClasses('link')}>
                        U4 staff
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to={'/'}>
                      <a {...menuClasses('link')}>
                        Partner Agencies
                      </a>
                    </Link>
                  </li>
                </ul>


                <h4 {...menuClasses('heading')}>
                  <span {...menuClasses('heading-bg')}>
                Online training
                  </span>
                </h4>

                <h4 {...menuClasses('heading')}>
                  <span {...menuClasses('heading-bg')}>
                Workshops & events
                  </span>
                </h4>


              </div>
            </div>
          )
          : null}
      </div>
    );
  }
}

export default Menu;
