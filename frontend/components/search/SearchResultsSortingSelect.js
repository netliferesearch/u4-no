import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSearchSorting } from '../../helpers/redux-store';

export const SearchResultsSortingSelect = ({ searchSorting = 'Sort by' }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState('');
  return (
    <Fragment>
      <select
        id="select-sorting"
        onClick={e => {
          e.preventDefault();
          setExpanded(prevIsExpanded => !prevIsExpanded);
        }}
        onBlur={e => {
          e.preventDefault();
          setExpanded(false);
        }}
        onChange={e => dispatch(updateSearchSorting(e.target.value))}
        className={`c-select ${expanded && 'expanded'} c-select__full-width-mobile`}
      >
        <option value="relevance">Relevance</option>
        <option value="year-desc">Year, new → old</option>
        <option value="year-asc">Year, old → new</option>
      </select>
    </Fragment>
  );
};
