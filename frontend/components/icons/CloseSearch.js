import React from 'react';

export const CloseSearch = props => {
  const { setSearchOpen, searchOpen } = props;
  const closeSearch = e => {
    e.preventDefault();
    setSearchOpen(!searchOpen);
  };
  return (
    <svg
      className="c-search-v2__close-icon"
      onClick={closeSearch}
      width="17"
      height="17"
      //   viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          className="c-search-v2__close-svg-elements"
          d="M16 1L1 16"
          stroke="white"
          strokeWidth="2.5"
        />
        <path
          className="c-search-v2__close-svg-elements"
          d="M1 1L16 16"
          stroke="white"
          strokeWidth="2.5"
        />
      </g>
    </svg>
  );
};
