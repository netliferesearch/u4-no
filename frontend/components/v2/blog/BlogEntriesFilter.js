import React, { useState } from 'react';
import ClientOnlyPortal from '../ClinetOnlyPortal';
import { CloseButton, TextButton } from '../buttons';

/**
 * V2 - Blog filter component to be used in BlogPage component
 * @param {Array} topics
 * @param {function} setFilter
 * @param {Array} filters
 */

export const BlogEntriesFilter = ({ topics, setFilters, filters }) => {
  const [open, setOpen] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  // const toggleModal = index => {
  //   const newIndex = index === activeModal ? -1 : index;
  //   setOpen(newIndex);
  // };
  // console.log("rerender")

  const handleClick = () => {
    setFilters(selectedItems);
    setOpen(false);
  };

  const handleChange = (e, item) => {
    const currentItems = [...selectedItems];
    if (e.target.checked) {
      currentItems.push(item);
    } else {
      currentItems.splice(currentItems.indexOf(item), 1);
    }
    setSelectedItems(currentItems);
  };

  // onKeyDown = event => {
  //   if (event.keyCode === 27) {
  //     setOpen(false);
  //   }
  // };

  // onClickOutside = event => {
  //   if (this.modal && this.modal.contains(event.target)) return;
  //   setOpen(false);
  // };

  return (
    <div className={`c-modal${open ? ' open' : ''}`}>
      <TextButton onClick={() => setOpen(true)} text="Filter by topic" modifier="round"/>
      {open && (
        <ClientOnlyPortal selector="#modal">
          <div className="c-modal__container">
            <div className="c-modal__top">
              <h3 className="c-modal__title">Filter by topic</h3>
              <CloseButton onClick={e => setOpen(false)}/>
            </div>
            <div className="c-modal__content">
              <div className="c-modal__list">
                {topics &&
                  topics.map((topic, index) => {
                    return (
                      <label key={index}>
                        <input
                          onChange={e => handleChange(e, topic)}
                          type="checkbox"
                          checked={selectedItems.some(filter => filter.title === topic.title)}
                          name={topic.title}
                        />
                        {topic.title}
                      </label>
                    );
                  })}
              </div>
            </div>
            <div className="c-modal__bottom">
              <button onClick={e => setSelectedItems([])}>Deselect All</button>
              <button onClick={handleClick}>Apply</button>
            </div>
          </div>
        </ClientOnlyPortal>
      )}
    </div>
  );
};

// export const BlogEntriesFilter = ({ topics, setFilter, filter }) => {
//   const [activeModal, setActiveModal] = useState(-1);
//   const toggleModal = index => {
//     const newIndex = index === activeModal ? -1 : index;
//     setActiveModal(newIndex);
//   };
//   const handleClick = (e, filter, topic) => {
//     e.preventDefault();
//     if (filter) {
//       filter.title === topic.title ? setFilter(null) : setFilter(topic);
//     } else {
//       setFilter(topic);
//     }
//   };

//   return (
//     topics && (
//       <div className="blog-accordion c-blog-filter">
//         <div className="c-accordion">
//           <div className="c-accordion__block" onClick={e => toggleModal(1)}>
//             <div className="c-accordion__container">
//               <h3 className="c-blog-filter__title">{filter ? filter.title : 'Filter by topic'} </h3>
//               <div className={`c-accordion__content${activeModal === 1 ? ' open' : ''}`}>
//                 <div className="c-accordion__list">
//                   <a href="#\" onClick={e => handleClick(e, filter, '')} className="main">
//                     All Topics
//                   </a>
//                   {topics &&
//                     topics.map((topic, index) => {
//                       return (
//                         <a href="#\" key={index} onClick={e => handleClick(e, filter, topic)}>
//                           {topic.title}
//                         </a>
//                       );
//                     })}
//                 </div>
//               </div>
//             </div>
//             <div className={`c-accordion__arrow${activeModal === 1 ? ' open' : ''}`}>
//               <ArrowDark />
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };
