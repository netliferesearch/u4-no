import React from 'react';

export const CourseFilterReset = props => {
  const { buttonText = 'Clear all', onClick } = props;

  const searchFilters = props.searchFilters;
  if (searchFilters?.length === 0) {
    return null;
  }
  return (
    <button className="c-filters-v2-btn" onClick={onClick}>
      {buttonText}
    </button>
  );
};
