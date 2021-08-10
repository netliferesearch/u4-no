import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import PicoSanity from 'picosanity';
import SearchIcon from '../icons/SearchIcon';
import { menuItems } from './menuItems';
import { MainMenuItem } from './MainMenuItem';
import SearchFieldV2 from '../SearchField-v2';
import { CloseSearch } from '../icons/CloseSearch';
import { SubMenu } from './SubMenu';
import { SubMenuSection } from './SubMenuSection';
import { TopicsMenu } from './TopicsMenu';

export const Menu = props => {
  const {
    noSearch,
    triggerSearchMenu,
    setSearchOpen,
    activeSearchMenu,
    searchOpen,
    searchData,
  } = props;
  const [data, setData] = useState('');
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [activeItemData, setActiveItemData] = useState(null);

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

  useEffect(() => {
    Router.onRouteChangeStart = () => {
      setActiveMenu(false);
      setSearchOpen(false);
    };
  }, []);

  useEffect(
    () => {
      setActiveItemData(menuItems.find(i => i.id === activeItem));
    },
    [activeItem]
  );

  return (
    <div className="c-menu__main-menu-box">
      <div className="c-menu__items">
        {searchOpen === false ? (
          <>
            {menuItems
              ? menuItems.map(item => (
                  <MainMenuItem
                    item={item}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    activeMenu={activeMenu}
                    setActiveMenu={setActiveMenu}
                  />
                ))
              : null}
            <span
              onClick={e => {
                e.preventDefault();
                setSearchOpen(!searchOpen);
              }}
              className="c-menu__heading"
              style={{ marginRight: '0' }}
            >
              <SearchIcon />
            </span>
          </>
        ) : (
          <div className="c-menu__search-holder">
            <SearchFieldV2
              isOpen={activeSearchMenu}
              isAlwaysOpen={true}
              triggerSearchMenu={triggerSearchMenu}
              searchData={searchData}
            />

            <CloseSearch setSearchOpen={setSearchOpen} searchOpen={searchOpen} />
          </div>
        )}
      </div>

      {!!activeItem && activeMenu ? (
        <SubMenu activeItem={activeItem}>
          {menuItems[0].items && activeItem === 'topics' ? (
            <TopicsMenu topics={menuItems[0].items} />
          ) : null}
          {activeItemData && activeItemData.sections
            ? activeItemData.sections.map((s, index) => <SubMenuSection key={index} section={s} />)
            : null}
        </SubMenu>
      ) : null}
    </div>
  );
};

// //TO BE DELETED
// import React, { Component } from 'react';
// import BEMHelper from 'react-bem-helper';
// import PicoSanity from 'picosanity';
// import PropTypes from 'prop-types';
// import Router from 'next/router';

// import ArrowRight from './icons/ArrowRight';
// import SearchIcon from './icons/SearchIcon';
// import MenuIcon from './icons/MenuIcon';

// const classes = BEMHelper({
//   name: 'top-bar',
//   prefix: 'c-',
// });

// const menuClasses = BEMHelper({
//   name: 'menu',
//   prefix: 'c-',
// });

// class MenuV2 extends Component {
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
//     const client = new PicoSanity({
//       projectId: '1f1lcoov',
//       dataset: 'production',
//       token: '',
//       useCdn: true,
//     });
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
//     };
//   }

//   triggerMenu(e) {
//     e.preventDefault();
//     this.setState({
//       activeMenu: !this.state.activeMenu,
//       activeItem: 1,
//     });
//   }

//   triggerExpand(e) {
//     e.preventDefault();
//     this.setState({
//       activeExpand: !this.state.activeExpand,
//     });
//   }

//   render() {
//     const topics = this.state.data;
//     const { noSearch, triggerSearchMenu, activeSearchMenu } = this.props;
//     return (
//       <div>
//         <ul className="c-menu__menu">
//           {!noSearch && !activeSearchMenu && (
//             <li className="c-menu__menu-item">
//               <button onClick={triggerSearchMenu}>
//                 <span className="c-menu__menu-icon">
//                   <SearchIcon />
//                 </span>
//                 Search
//               </button>
//             </li>
//           )}
//           <li className="c-menu__menu-item">
//             <button onClick={this.triggerMenu}>
//               <span className="c-menu__menu-icon">
//                 <MenuIcon />
//               </span>
//               Menu
//             </button>
//           </li>
//         </ul>
//         {this.state.activeMenu ? (
//           <div>
//             <button onClick={this.triggerMenu} className="c-menu__backdrop" />
//             <div {...menuClasses()}>
//               <ul className="c-menu__menu', 'active">
//                 <li className="c-menu__menu-item', this.state.activeItem === 1 && 'active">
//                   <button onClick={this.triggerMenu}>Close</button>
//                 </li>
//               </ul>

//               {topics && (
//                 <div>
//                   <h4 className="c-menu__heading">
//                     <span className="c-menu__heading-bg">Corruption by topic</span>
//                   </h4>
//                   <ul className="c-menu__list">
//                     {topics.slice(0, 5).map(topic => (
//                       <li className="c-menu__list-item" key={topic._id}>
//                         <a href={`/topics/${topic.slug.current}`} className="c-menu__link">
//                           {topic.title}
//                         </a>
//                       </li>
//                     ))}
//                     {this.state.activeExpand &&
//                       topics.slice(5, 50).map(topic => (
//                         <li className="c-menu__list-item" key={topic._id}>
//                           <a href={`/topics/${topic.slug.current}`} className="c-menu__link">
//                             {topic.title}
//                           </a>
//                         </li>
//                       ))}
//                     {this.state.activeExpand ? (
//                       <button className="c-menu__clean-btn" onClick={this.triggerExpand}>
//                         <ArrowRight className="c-menu__arrowdown', 'flipped" /> Less
//                       </button>
//                     ) : (
//                       <button className="c-menu__clean-btn" onClick={this.triggerExpand}>
//                         <ArrowRight className="c-menu__arrowdown" /> More
//                       </button>
//                     )}
//                   </ul>
//                 </div>
//               )}

//               <h4 className="c-menu__heading">
//                 <span className="c-menu__heading-bg">Resources</span>
//               </h4>
//               <ul className="c-menu__list">
//                 <li className="c-menu__list-item">
//                   <a
//                     className="c-menu__link"
//                     href="/search?filters=publications-only&sort=year-desc"
//                   >
//                     Publications
//                   </a>
//                 </li>
//                 <li className="c-menu__list-item">
//                   <a
//                     className="c-menu__link"
//                     href="/search?filters=publications-only%2Cpub-U4%20Helpdesk%20Answer&sort=year-desc"
//                   >
//                     Helpdesk answers
//                   </a>
//                 </li>
//                 <li className="c-menu__list-item">
//                   <a className="c-menu__link" href="/terms">
//                     Glossary
//                   </a>
//                 </li>
//               </ul>

//               <h4 className="c-menu__heading">
//                 <span className="c-menu__heading-bg">General information</span>
//               </h4>
//               <ul className="c-menu__list">
//                 <li className="c-menu__list-item">
//                   <a className="c-menu__link" href="/about-u4">
//                     About U4
//                   </a>
//                 </li>
//                 <li className="c-menu__list-item">
//                   <a className="c-menu__link" href="/the-team">
//                     People
//                   </a>
//                 </li>
//                 <li className="c-menu__list-item">
//                   <a className="c-menu__link" href="/u4-partner-agencies">
//                     Partner agencies
//                   </a>
//                 </li>
//               </ul>

//               <h4 className="c-menu__heading">
//                 <span className="c-menu__heading-bg">Services</span>
//               </h4>
//               <ul className="c-menu__list">
//                 <li className="c-menu__list-item">
//                   <a className="c-menu__link" href="/online-courses">
//                     Online courses
//                   </a>
//                 </li>
//                 <li className="c-menu__list-item">
//                   <a className="c-menu__link" href="/workshops-and-events">
//                     Workshops and events
//                   </a>
//                 </li>
//                 <li className="c-menu__list-item">
//                   <a className="c-menu__link" href="/helpdesk">
//                     Anti-corruption helpdesk
//                   </a>
//                 </li>
//               </ul>

//               <div className="c-menu__links--round">
//                 <a className="c-menu__link-round" href="/helpdesk">
//                   Helpdesk
//                 </a>

//                 <a className="c-menu__link-round" href="/the-team">
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

// MenuV2.defaultProps = {
//   noSearch: false,
// };
// MenuV2.propTypes = {
//   noSearch: PropTypes.bool,
// };

// export default MenuV2;
