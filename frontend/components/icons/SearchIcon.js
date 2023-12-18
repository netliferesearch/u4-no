import React from 'react';

export const SearchIcon = (props) => {
  return (
    <svg
      className="c-search-v2__icon-svg"
      xmlns="http://www.w3.org/2000/svg" 
      role="img" 
      title="Search"
      width="19"
      height="19"
      viewBox="0 0 19 19"
    >
      <g fill="none" fillRule="evenodd" strokeWidth="2" transform="matrix(-1 0 0 1 18 1)">
        <circle className="c-search-v2__svg-elements" cx="10.5" cy="6.5" r="6.5" stroke="#fff" />
        <path
          className="c-search-v2__svg-elements"
          stroke="#fff"
          strokeLinecap="square"
          d="M0.398563652,16.6014363 L6,11"
        />
      </g>
    </svg>
  );
}
