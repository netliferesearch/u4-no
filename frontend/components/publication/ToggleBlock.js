import React, { useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../serializers/serializers';
import { ArrowDown } from '../icons/ArrowDown';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export const ToggleBlock = ({ title = '', content = '', children }) => {
  const [open, toggleOpen] = useState(false);

  return (
    <div className="c-toggle-block c-meta" onClick={() => toggleOpen(!open)}>
      <div className="c-toggle-block__h">
        <h4 className="u-secondary-heading u-secondary-h2">{title}</h4>
        <div className={`c-toggle-block__icon ${open ? 'c-toggle-block--icon--active' : ''}`}>
          <ArrowDown />
        </div>
      </div>
      <TransitionGroup>
      
        {open && (
          <CSSTransition classNames={'c-toggle-block-'} timeout={200}>
          <div
            className={`c-toggle-block__content ${
              open ? 'c-toggle-block__content--open' : 'c-toggle-block__content--closed'
            }`}
          >
            {typeof content === 'string' && <p>{content}</p>}
            {typeof content !== 'string' && (
              <BlockContent blocks={content} serializers={serializers} />
            )}
            {children}
          </div>
          </CSSTransition>
        )}
        
      </TransitionGroup>
    </div>
  );
};
