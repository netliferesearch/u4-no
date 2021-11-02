import React, { useRef } from 'react';
import ClientOnlyPortal from '../general/ClientOnlyPortal';
import { CloseButton } from './buttons';
import { useOnClickOutside, useLockBodyScroll } from '../../helpers/hooks';

export const Modal = ({ type = '', title = '', setOpen, children }) => {
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
        <div className={`c-modal__area  c-modal--${type}`} ref={ref}>
          <div className="c-modal__top">
            <h4 className="c-modal__title u-secondary-heading u-secondary-h2 u-text--dark-blue">
              {title}
            </h4>
            <CloseButton onClick={e => setOpen(false)} />
          </div>
          <hr className="u-section-underline--no-margins" />
          <div className="c-modal__content">{children}</div>
        </div>
      </aside>
    </ClientOnlyPortal>
  );
};
