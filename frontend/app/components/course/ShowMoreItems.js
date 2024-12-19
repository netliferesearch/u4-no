import React, { useState } from 'react';
import { ArrowDown, ArrowUp } from '@/components/icons/ArrowDown';

export const ShowMoreItems = ({ items = [], itemLimit = 5, children = () => null }) => {
  const [isToggleOpen, setToggleOpen] = useState(false);
  const toggleHandler = e => {
    e.preventDefault();
    setToggleOpen(!isToggleOpen);
  };

  const slicedItems = isToggleOpen ? items : items.slice(0, itemLimit);

  return (
    <div>
      {children({ slicedItems })}
      {items.length > itemLimit && (
        <button className="c-filters-v2-btn c-filters-v2-btn--list-item" onClick={toggleHandler}>
          <div className="c-filters-v2-toggle">
            {isToggleOpen ? (
              <>
                Show less <ArrowUp />
              </>
            ) : (
              <>
                Show more <ArrowDown />
              </>
            )}
          </div>
        </button>
      )}
    </div>
  );
};
