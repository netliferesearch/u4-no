import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowDown, ArrowUp } from '../icons/ArrowDown';

export const SearchFilterToggle = ({ bucketsToToggle = [], children = () => null }) => {
  const [isToggleOpen, setToggleOpen] = useState(false);
  const toggleHandler = e => {
    e.preventDefault();
    setToggleOpen(!isToggleOpen);
  };
  const sliceLimit = 5;
  const slicedBuckets = isToggleOpen ? bucketsToToggle : bucketsToToggle.slice(0, sliceLimit);
  return (
    <div>
      {children({ toggledBuckets: slicedBuckets })}
      {bucketsToToggle.length > sliceLimit && (
        <button className="c-filters-v2-btn c-filters-v2-btn--list-item" onClick={toggleHandler}>
          {isToggleOpen ? (
            <div className="c-filters-v2-toggle">
              Show less <ArrowUp />
            </div>
          ) : (
            <div className="c-filters-v2-toggle">
              Show more <ArrowDown />
            </div>
          )}
        </button>
      )}
    </div>
  );
};

SearchFilterToggle.propTypes = {
  bucketsToToggle: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.func,
};
