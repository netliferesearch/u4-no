import React, { useState, useRef } from 'react';
import buildTitleObjects from '../TableOfContents/buildTitleObjects';
import Scrollchor from 'react-scrollchor';
import ClientOnlyPortal from './ClientOnlyPortal';
import { CloseButton, TextButton } from './buttons';
import { useOnClickOutside, useLockBodyScroll } from '../../helpers/hooks';

/**
 * V2 - ReaderSidebar component to be used in Reader component
 */

export const ReaderSidebar = ({ title = '', content = [] }) => {
  const [open, setOpen] = useState();

  return (
    <div className={`c-modal${open ? ' open' : ''}`}>
      <TextButton onClick={() => setOpen(true)} text="Contents" modifier="sec" />
      {open && <ContentsModal title="Close Reader" setOpen={setOpen} content={content}/>}
    </div>
  );
};

export const ContentsModal = props => {
  const { title = '', setOpen, content } = props;
  const [readingFontSize, setReadingFontSize] = useState('medium'); // 'normal' | 'medium' | 'large'
  const titleObjects = buildTitleObjects(content);
  // ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  //hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setOpen(false));
  //hook to lock body scroll
  useLockBodyScroll();

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
        <div className="c-modal__area c-modal--filters" ref={ref}>
          <div className="c-modal__top">
            <h3 className="c-modal__title">{title}</h3>
            <CloseButton onClick={e => setOpen(false)} />
          </div>
          <hr className="u-section-underline--no-margins" />
          <div className="c-modal__content">
            <div className="sidebar c-reader-sidebar">
              <div>
                {content.length > 0 && (
                  <div className="fonts">
                    <button
                      className={`normal${readingFontSize === 'normal' ? ' active' : ''}`}
                      onClick={() => setReadingFontSize('normal')}
                    >
                      A
                    </button>
                    <button
                      className={`medium${readingFontSize === 'medium' ? ' active' : ''}`}
                      onClick={() => setReadingFontSize('medium')}
                    >
                      A
                    </button>
                    <button
                      className={`large${readingFontSize === 'large' ? ' active' : ''}`}
                      onClick={() => setReadingFontSize('large')}
                    >
                      A
                    </button>
                  </div>
                )}
              </div>
              {titleObjects.length ? (
                <div>
                  <ul className="c-article-nav-list">
                    <li key="top" className={`c-article-nav-list__item`}>
                      <Scrollchor to="#js-top" disableHistory>
                        Top
                      </Scrollchor>
                    </li>
                    {titleObjects.map(titleObject => {
                      const { title, id, children = [] } = titleObject;
                      return (
                        <li key={id} className={`c-article-nav-list__item`}>
                          <Scrollchor to={`#${id}`} disableHistory>
                            {title}
                          </Scrollchor>
                          {titleObject.selected && (
                            <ul className="c-article-nav-list c-article-nav-list--inner">
                              {children.map(({ title, id }) => (
                                <li key={id} className={`c-article-nav-list__item`}>
                                  <Scrollchor to={`#${id}`} disableHistory>
                                    {title}
                                  </Scrollchor>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                    <li key="bottom" className="c-article-nav-list__item">
                      <Scrollchor to="#js-bottom" disableHistory>
                        Bottom
                      </Scrollchor>
                    </li>
                  </ul>
                </div>
              ) : null}
              <div>
                <ul className="c-article-nav-list c-article-nav-list--2">
                  <li className={`c-article-nav-list__item`}>
                    <a href="#">References</a>
                  </li>
                  <li className={`c-article-nav-list__item`}>
                    <a href="#">About the author</a>
                  </li>
                  <li className={`c-article-nav-list__item`}>
                    <a href="#">Acknowledgements</a>
                  </li>
                  <li className={`c-article-nav-list__item`}>
                    <a href="#">Methodology</a>
                  </li>
                  <li className={`c-article-nav-list__item`}>
                    <a href="#">Notes</a>
                  </li>
                  <li className={`c-article-nav-list__item`}>
                    <a href="#">Annex</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </ClientOnlyPortal>
  );
};
