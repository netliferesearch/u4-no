import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { replaceSearchFilters } from '../../helpers/redux-store';

export const SearchFilterReset = props => {
  const dispatch = useDispatch();
  const { buttonText } = props;
  const searchFilters = useSelector(state => state.searchFilters);
  if (searchFilters.length === 0) {
    return null;
  }
  return (
    <button
      className="c-filters-v2-btn"
      onClick={event => {
        event.preventDefault();
        dispatch(replaceSearchFilters([]));
      }}
    >
      {buttonText}
    </button>
  );
};

SearchFilterReset.propTypes = {
  buttonText: PropTypes.string,
};

SearchFilterReset.defaultProps = {
  buttonText: 'Clear all',
};
