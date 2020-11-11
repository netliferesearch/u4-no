import React, { useRef, useState } from 'react';
import ClientOnlyPortal from '../ClinetOnlyPortal';
import { CloseButton, TextButton } from '../buttons';
import { useOnClickOutside, useLockBodyScroll } from '../../../helpers/hooks'
/**
 * V2 - Blog filter component to be used in BlogPage component
 * @param {Array} topics
 * @param {function} setFilter
 * @param {Array} filters
 */

export const BlogEntriesFilter = ({ topics, setFilters, filters }) => {
  const [open, setOpen] = useState();
  return (
    <div className={`c-modal${open ? ' open' : ''}`}>
      <TextButton onClick={() => setOpen(true)} text="Filter by topic" modifier="round" />
      {open && (
        <MultiselectModal
          title="Filter by topic"
          options={topics}
          setOpen={setOpen}
          setFilters={setFilters}
          filters={filters}
        />
      )}
    </div>
  );
};

export const MultiselectModal = ({ title = '', options, setOpen, setFilters, filters }) => {
  const [selectedItems, setSelectedItems] = useState(filters);
  // ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  //hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setOpen(false));
  //hook to lock body scroll
  useLockBodyScroll();

  const handleApplyClick = () => {
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

  const onKeyDown = event => {
    if (event.keyCode === 27) {
      setOpen(false);
    }
  };

  return (
    <ClientOnlyPortal selector="#modal">
      <aside
        className="c-modal__cover"
        aria-modal="true"
        tabIndex="-1"
        role="dialog"
        onKeyDown={onKeyDown}
      >
        <div className="c-modal__area" ref={ref}>
          <div className="c-modal__top">
            <h3 className="c-modal__title">{title}</h3>
            <CloseButton onClick={e => setOpen(false)} />
          </div>
          <hr className="u-section-underline--no-margins" />
          <div className="c-modal__content">
            <div className="c-modal__list">
              {options &&
                options.map((option, index) => {
                  return (
                    <label key={index} className="c-modal__label">
                      {console.log(filters.some(filter => filter.title === option.title))}
                      <input
                        className="c-modal__input"
                        onChange={e => handleChange(e, option)}
                        type="checkbox"
                        checked={selectedItems.some(filter => filter.title === option.title)}
                        name={option.title}
                      />
                      <span>{option.title}</span>
                    </label>
                  );
                })}
            </div>
          </div>
          <div className="c-modal__bottom">
            <hr className="u-section-underline--no-margins" />
            <div className="c-modal__controls">
              <TextButton onClick={e => setSelectedItems([])} text="Deselect All" modifier="text" />
              <TextButton onClick={handleApplyClick} text="Apply" modifier="square" />
            </div>
          </div>
        </div>
      </aside>
    </ClientOnlyPortal>
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
