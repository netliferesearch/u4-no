import React, { useState, useRef, useEffect } from 'react';
import buildTitleObjects from './TableOfContents/buildTitleObjects';
import { Scrollchor } from 'react-scrollchor';
//import ClientOnlyPortal from './general/ClientOnlyPortal';
//import { useOnClickOutside, useLockBodyScroll } from '../helpers/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { updateReadingProgress } from '../helpers/redux-store';
import { ToTop } from './icons/ToTop';
//import { ContentsIcon } from './icons/ContentsIcon';

/**
 * V2 - Contents components to be used in Reader component
 */

export const Contents = ({ title = '', content = [], scrolled = false }) => {
  const [open, setOpen] = useState();
  const [activeItem, setActiveItem] = useState();
  const titleObjects = buildTitleObjects(content);
  const readingProgressId = useSelector(state => state.readingProgressId);
  // console.log(titleObjects)
  const dispatch = useDispatch();
  const onItemSelected = e => {
    const hash = e.target.hash.substring(1);
    dispatch(updateReadingProgress(hash));
  };

  useEffect(
    () => {
      if (activeItem !== readingProgressId) {
        setActiveItem(readingProgressId);
      }
    },
    [readingProgressId]
  );

  return (
    <div className="c-contents">
      <div className="c-contents__top">
        <h3 className="u-secondary-heading u-secondary-h4">Contents</h3>
        {scrolled && (
          <div className="c-scroll-top--contents">
            <Scrollchor to="#js-top-reader" disableHistory>
              <ToTop />
            </Scrollchor>
          </div>
        )}
      </div>
      <div>
        <ul className="c-contents__list">
          {titleObjects.length
            ? titleObjects.map((titleObject, index) => {
                const { title, id, children = [] } = titleObject;
                return (
                  <li
                    key={id}
                    className={`c-contents__list-item u-text--grey ${
                      activeItem === id ? 'c-contents__list-item--active' : ''
                    }`}
                    onClick={e => setOpen(false)}
                  >
                    <p className="c-contents__subtitle u-body--small">Section {index + 1}</p>
                    <Scrollchor to={`#${id}`} beforeAnimate={onItemSelected} disableHistory>
                      {title}
                    </Scrollchor>
                    {/* {titleObject.selected && (
                      <ul className="c-contents__list c-contents__list--inner">
                        {children.map(({ title, id }) => (
                          <li key={id} className={`c-contents__list-item u-text--grey`}>
                            <Scrollchor to={`#${id}`} beforeAnimate={onItemSelected} disableHistory>
                              {title}
                            </Scrollchor>
                            <hr className="u-section-underline--grey" />
                          </li>
                        ))}
                      </ul>
                    )} */}
                    {index < titleObjects.length - 1 && (
                      <hr className="u-section-underline--grey" />
                    )}
                  </li>
                );
              })
            : null}
          {/* <li
            key="bottom"
            className={`c-contents__list-item ${
              activeItem === "additional-info" ? 'c-contents__list-item--active' : ''
            }`}
            onClick={e => setOpen(false)}
          >
            <Scrollchor to="#additional-info" beforeAnimate={onItemSelected} disableHistory>
              Additional Information
            </Scrollchor>
          </li> */}
        </ul>
      </div>
      <div />
    </div>
  );
};

//Old version with modal:

// export const ContentsAsModal = ({ title = '', content = [] }) => {
//   const [open, setOpen] = useState();

//   return (
//     <div className={`c-contents c-modal${open ? ' open' : ''}`}>
//       <ContentsIcon />
//       <TextIconButton onClick={() => setOpen(true)} text="Contents" modifier="7" />
//       {open && <ContentsModal title={title} setOpen={setOpen} content={content} />}
//     </div>
//   );
// };

// export const ContentsModal = props => {
//   const { title = '', setOpen, content = [] } = props;
//   const titleObjects = buildTitleObjects(content);
//   // ref that we add to the element for which we want to detect outside clicks
//   const ref = useRef();
//   //hook passing in the ref and a function to call on outside click
//   useOnClickOutside(ref, () => setOpen(false));
//   //hook to lock body scroll
//   useLockBodyScroll();

//   const onKeyDown = event => {
//     if (event.keyCode === 27) {
//       setOpen(false);
//     }
//   };

//   return (
//     <ClientOnlyPortal selector="#modal">
//       <aside
//         className="c-modal__cover c-modal__cover--contents"
//         aria-modal="true"
//         tabIndex="-1"
//         role="dialog"
//         onKeyDown={onKeyDown}
//       >
//         <div className="c-modal__area c-modal--contents" ref={ref}>
//           <div className="c-modal__top">
//             <h3 className="c-modal__title">{title}</h3>
//           </div>
//           <hr className="u-section-underline--no-margins" />
//           <div className="c-modal__content">
//             <h3 className="c-modal__title">In this Publication</h3>
//             <div>
//               <ul className="c-article-nav-list">
//                 {titleObjects.length
//                   ? titleObjects.map(titleObject => {
//                       const { title, id, children = [] } = titleObject;
//                       return (
//                         <li
//                           key={id}
//                           className={`c-article-nav-list__item`}
//                           onClick={e => setOpen(false)}
//                         >
//                           <Scrollchor to={`#${id}`} disableHistory>
//                             {title}
//                           </Scrollchor>
//                           {titleObject.selected && (
//                             <ul className="c-article-nav-list c-article-nav-list--inner">
//                               {children.map(({ title, id }) => (
//                                 <li key={id} className={`c-article-nav-list__item`}>
//                                   <Scrollchor to={`#${id}`} disableHistory>
//                                     {title}
//                                   </Scrollchor>
//                                 </li>
//                               ))}
//                             </ul>
//                           )}
//                           <hr className="u-section-underline--no-margins" />
//                         </li>
//                       );
//                     })
//                   : null}
//                 <li key="bottom" className="c-article-nav-list__item" onClick={e => setOpen(false)}>
//                   <Scrollchor to="#additional-info" disableHistory>
//                     Additional Information
//                   </Scrollchor>
//                 </li>
//               </ul>
//             </div>
//             <div />
//           </div>
//         </div>
//       </aside>
//     </ClientOnlyPortal>
//   );
// };
