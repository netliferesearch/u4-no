import React from 'react';
import { CloseIcon } from './CloseIcon';

export const CloseSearch = props => {
  const { setSearchOpen, searchOpen } = props;
  const closeSearch = e => {
    e.preventDefault();
    setSearchOpen(!searchOpen);
  };
  return (
    <span className="c-search-v2__close-icon" onClick={closeSearch}>
      <CloseIcon />
    </span>
  );
};
