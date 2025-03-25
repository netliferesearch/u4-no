import React, { Fragment, useState } from 'react';

export const ResultsSortingSelect = ({ setSortby }) => (
  <>
    <select
      id="select-sorting"
      onChange={e => setSortby(e.target.value)}
      className={`c-select c-select__full-width-mobile`}
    >
      <option value="alphabetically">Order alphabetically</option>
      <option value="category">Order by analysis type</option>
    </select>
  </>
);
