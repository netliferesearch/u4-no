import React, { Fragment, useState } from 'react';

export const CourseResultsSortingSelect = ({ setSortby }) => (
  <>
    <select
      id="select-sorting"
      onChange={e => setSortby(e.target.value)}
      className={`c-select c-select__full-width-mobile`}
    >
      <option value="recommended">Recommended</option>
      <option value="date">Order by date</option>
      <option value="alphabetically">Order alphabetically</option>
    </select>
  </>
);
