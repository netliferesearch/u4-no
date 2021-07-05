import React, { Component, useEffect, useState } from 'react';
import BEMHelper from 'react-bem-helper';
import PropTypes from 'prop-types';
import Router from 'next/router';
import PicoSanity from 'picosanity';
import { SearchIcon } from './icons/SearchIconV2';
import  MenuIcon from './icons/MenuIcon';
import  FbRound  from './icons/FbRound';
import  TwitterRound  from './icons/TwitterRound';
import  LinkedInRound  from './icons/LinkedInRound';

const classes = BEMHelper({
  name: 'top-bar-v2',
  prefix: 'c-',
});

const menuClasses = BEMHelper({
  name: 'menu-v2',
  prefix: 'c-',
});

export const Menu = props => {
  const { noSearch, triggerSearchMenu, setSearchOpen, activeSearchMenu } = props;
  const [activeMenu, setActiveMenu] = useState(false);
  const [data, setData] = useState('');
  const triggerMenu = e => {
    e.preventDefault();
    setActiveMenu(!activeMenu);
    setSearchOpen(activeMenu);
  };

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

  useEffect(() => {
    Router.onRouteChangeStart = () => {
      setActiveMenu(false);
      setSearchOpen(true);
    };
  }, []);

  return (
    <div>
      <ul {...classes('menu')}>
        {!noSearch && !activeSearchMenu && (
          <li {...classes('menu-item')}>
            <button onClick={triggerSearchMenu}>
              Search
              <span {...classes('menu-icon')}>
                <SearchIcon />
              </span>
            </button>
          </li>
        )}
        <li {...classes('menu-item')}>
          <button onClick={triggerMenu} {...classes('menu-button', activeMenu && 'active')}>
            Menu
            <span {...classes('menu-icon')}>
              {activeMenu ? <img alt="Close icon" src="/static/close.svg" /> : <MenuIcon />}
            </span>
          </button>
        </li>
      </ul>
      {activeMenu ? (
        <div>
          <button onClick={triggerMenu} {...menuClasses('backdrop')} />
          <div {...menuClasses('')}>
            <div {...menuClasses('section')}>
              {data && (
                <div {...menuClasses('topics')}>
                  <h4 {...menuClasses('heading', 'border-left')}>Corruption by topic</h4>
                  <div {...menuClasses('border-left')}>
                    <ul {...menuClasses('list')}>
                      {data.slice(0, 14).map(topic => (
                        <li {...menuClasses('list-item')} key={topic._id}>
                          <a href={`/topics/${topic.slug.current}`} {...menuClasses('link')}>
                            {topic.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ul {...menuClasses('list', '', 'rest-topics')}>
                    {data.slice(14, 22).map(topic => (
                      <li {...menuClasses('list-item')} key={topic._id}>
                        <a href={`/topics/${topic.slug.current}`} {...menuClasses('link')}>
                          {topic.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div {...menuClasses('resources')}>
                <div {...menuClasses('border-left')}>
                  <h4 {...menuClasses('heading')}>Resources</h4>
                  <ul {...menuClasses('list')}>
                    <li {...menuClasses('list-item')}>
                      <a
                        {...menuClasses('link')}
                        href="/search?filters=publications-only&sort=year-desc"
                      >
                        All publications &amp; resources
                      </a>
                    </li>
                    <li {...menuClasses('list-item')}>
                      <a {...menuClasses('link')} href="/blog">
                        Blog
                      </a>
                    </li>
                    <li {...menuClasses('list-item')}>
                      <a {...menuClasses('link')} href="/terms">
                        Glossary
                      </a>
                    </li>
                  </ul>
                </div>
                <div {...menuClasses('border-left')}>
                  <h4 {...menuClasses('heading')}>Learning &amp; events</h4>
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
                        Events
                      </a>
                    </li>
                    <li {...menuClasses('list-item')}>
                      <a {...menuClasses('link')} href="/u4-in-country-workshop-topics">
                        Workshops
                      </a>
                    </li>
                  </ul>
                </div>
                <div {...menuClasses('border-left')}>
                  <h4 {...menuClasses('heading')}>About</h4>
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
                  </ul>
                </div>
              </div>
            </div>

            <div {...menuClasses('contact')}>
              <a href="https://www.linkedin.com/showcase/u4-anti-corruption-resource-centre/">
                <LinkedInRound {...classes('some-icon')} />
              </a>
              <a href="https://twitter.com/U4_ACRC">
                <TwitterRound {...classes('some-icon')} />
              </a>
              <a href="https://www.facebook.com/U4anticorruption/">
                <FbRound {...classes('some-icon')} />
              </a>
              <a {...menuClasses('link')} href="/the-team">
                Contact
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

// class Menu extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       activeMenu: false,
//       activeExpand: false,
//       data: '',
//       activeItem: 0,
//     };
//     this.triggerMenu = this.triggerMenu.bind(this);
//     this.triggerExpand = this.triggerExpand.bind(this);
//   }

//   componentDidMount() {
//     if (this.state.data) {
//       return; // no need to fetch data if we got link data passed in.
//     }
//     const sanityQuery = '*[_type == "topics"] | order(title){_id, title, slug}';
//     client.fetch(sanityQuery, {}).then(data => {
//       this.setState({
//         data,
//       });
//     });
//     Router.onRouteChangeStart = () => {
//       this.setState({
//         activeMenu: false,
//         activeItem: 1,
//       });
//       this.props.setSearchOpen(true);
//     };
//   }

//   triggerMenu(e) {
//     e.preventDefault();
//     this.setState({
//       activeMenu: !this.state.activeMenu,
//       activeItem: 1,
//     });
//     this.props.setSearchOpen(this.state.activeMenu ? true : false);
//   }

//   triggerExpand(e) {
//     e.preventDefault();
//     this.setState({
//       activeExpand: !this.state.activeExpand,
//     });
//   }

//   render() {
//     const topics = this.state.data;
//     const { noSearch, triggerSearchMenu, setSearchOpen, activeSearchMenu } = this.props;
//     return (
//       <div>
//         <ul {...classes('menu')}>
//           {!noSearch && !activeSearchMenu && (
//             <li {...classes('menu-item')}>
//               <button onClick={triggerSearchMenu}>
//                 Search
//                 <span {...classes('menu-icon')}>
//                   <SearchIcon />
//                 </span>
//               </button>
//             </li>
//           )}
//           <li {...classes('menu-item')}>
//             <button
//               onClick={this.triggerMenu}
//               {...classes('menu-button', this.state.activeMenu && 'active')}
//             >
//               Menu
//               <span {...classes('menu-icon')}>
//                 {this.state.activeMenu ? (
//                   <img alt="Close icon" src="/static/close.svg" />
//                 ) : (
//                   <MenuIcon />
//                 )}
//               </span>
//             </button>
//           </li>
//         </ul>
//         {this.state.activeMenu ? (
//           <div>
//             <button onClick={this.triggerMenu} {...menuClasses('backdrop')} />
//             <div {...menuClasses('')}>
//               <div {...menuClasses('section')}>
//                 {topics && (
//                   <div {...menuClasses('topics')}>
//                     <h4 {...menuClasses('heading', 'border-left')}>Corruption by topic</h4>
//                     <div {...menuClasses('border-left')}>
//                       <ul {...menuClasses('list')}>
//                         {topics.slice(0, 14).map(topic => (
//                           <li {...menuClasses('list-item')} key={topic._id}>
//                             <a href={`/topics/${topic.slug.current}`} {...menuClasses('link')}>
//                               {topic.title}
//                             </a>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     <ul {...menuClasses('list', '', 'rest-topics')}>
//                       {topics.slice(14, 22).map(topic => (
//                         <li {...menuClasses('list-item')} key={topic._id}>
//                           <a href={`/topics/${topic.slug.current}`} {...menuClasses('link')}>
//                             {topic.title}
//                           </a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//                 <div {...menuClasses('resources')}>
//                   <div {...menuClasses('border-left')}>
//                     <h4 {...menuClasses('heading')}>Resources</h4>
//                     <ul {...menuClasses('list')}>
//                       <li {...menuClasses('list-item')}>
//                         <a
//                           {...menuClasses('link')}
//                           href="/search?filters=publications-only&sort=year-desc"
//                         >
//                           All publications &amp; resources
//                         </a>
//                       </li>
//                       <li {...menuClasses('list-item')}>
//                         <a {...menuClasses('link')} href="/blog">
//                           Blog
//                         </a>
//                       </li>
//                       <li {...menuClasses('list-item')}>
//                         <a {...menuClasses('link')} href="/terms">
//                           Glossary
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                   <div {...menuClasses('border-left')}>
//                     <h4 {...menuClasses('heading')}>Learning &amp; events</h4>
//                     <ul {...menuClasses('list')}>
//                       <li {...menuClasses('list-item')}>
//                         <a {...menuClasses('link')} href="/online-courses">
//                           Online courses
//                         </a>
//                       </li>
//                       <li {...menuClasses('list-item')}>
//                         <a {...menuClasses('link')} href="/helpdesk">
//                           Helpdesk - Ask your question
//                         </a>
//                       </li>
//                       <li {...menuClasses('list-item')}>
//                         <a {...menuClasses('link')} href="/workshops-and-events">
//                           Events
//                         </a>
//                       </li>
//                       <li {...menuClasses('list-item')}>
//                         <a {...menuClasses('link')} href="/u4-in-country-workshop-topics">
//                           Workshops
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                   <div {...menuClasses('border-left')}>
//                     <h4 {...menuClasses('heading')}>About</h4>
//                     <ul {...menuClasses('list')}>
//                       <li {...menuClasses('list-item')}>
//                         <a {...menuClasses('link')} href="/about-u4">
//                           About us
//                         </a>
//                       </li>
//                       <li {...menuClasses('list-item')}>
//                         <a {...menuClasses('link')} href="/the-team">
//                           Staff
//                         </a>
//                       </li>
//                       <li {...menuClasses('list-item')}>
//                         <a {...menuClasses('link')} href="/u4-partner-agencies">
//                           Partner Information
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>

//               <div {...menuClasses('contact')}>
//                 <a href="https://www.linkedin.com/showcase/u4-anti-corruption-resource-centre/">
//                   <LinkedInRound {...classes('some-icon')} />
//                 </a>
//                 <a href="https://twitter.com/U4_ACRC">
//                   <TwitterRound {...classes('some-icon')} />
//                 </a>
//                 <a href="https://www.facebook.com/U4anticorruption/">
//                   <FbRound {...classes('some-icon')} />
//                 </a>
//                 <a {...menuClasses('link')} href="/the-team">
//                   Contact
//                 </a>
//               </div>
//             </div>
//           </div>
//         ) : null}
//       </div>
//     );
//   }
// }

// Menu.defaultProps = {
//   noSearch: false,
// };
// Menu.propTypes = {
//   noSearch: PropTypes.bool,
// };

// export default Menu;
