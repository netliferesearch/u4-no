import React, { useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../serializers';
import { ArrowDown } from './icons/ArrowDown';

export const ToggleBlock = ({ title = '', content = '', children }) => {
  const [open, toggleOpen] = useState(false);

  return (
    <div className="c-toggle-block c-meta">
      <hr className="u-section-underline--no-margins" />
      <div className="c-toggle-block__h" onClick={() => toggleOpen(!open)}>
        <h3 className="u-headline--2">{title}</h3>
        <div className="c-toggle-block__icon">
          <ArrowDown />
        </div>
      </div>
      {open && (
        <div className={`c-toggle-block__content`}>
          {typeof content === 'string' && <p>{content}</p>}
          {typeof content !== 'string' && (
            <BlockContent blocks={content} serializers={serializers} />
          )}
          {children}
        </div>
      )}
    </div>
  );
};
