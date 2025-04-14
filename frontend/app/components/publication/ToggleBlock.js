"use client";

import { ArrowDown } from 'components/icons/ArrowDown';
import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function ToggleBlock({ title = '', content = '', children }) {
  const [open, toggleOpen] = useState(false);

  return (
    <div className="c-toggle-block c-meta" >
      <div className="c-toggle-block__h" onClick={() => toggleOpen(!open)}>
        <h4 className="u-secondary-heading u-secondary-h2">{title}</h4>
        <div className={`c-toggle-block__icon ${open ? 'c-toggle-block--icon--active' : ''}`}>
          <ArrowDown />
        </div>
      </div>
      <TransitionGroup>

        {open && (
          <CSSTransition classNames={'c-toggle-block-'} timeout={200}>
            <div
              className={`c-toggle-block__content ${open ? 'c-toggle-block__content--open' : 'c-toggle-block__content--closed'
                }`}
            >
              {children}
            </div>
          </CSSTransition>
        )}

      </TransitionGroup>
    </div>
  );
};
