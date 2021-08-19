import React from 'react';

export const RadioSort = ({ sortTypes = {}, handleChange = () => null, currentSortType = '' }) => {
  return (
    <form className="c-sort--radio">
      <p className="c-sort--radio__order-text u-body--grey">{sortTypes.title}</p>
      {sortTypes.types.map(i => (
        <label key={i.value} className="c-sort--radio__btn u-body--dark-grey">
          <input
            type="radio"
            value={i.value}
            checked={currentSortType === i.value}
            onChange={event => handleChange(event)}
          />
          <p className="c-sort--radio__label">{i.label}</p>
        </label>
      ))}
    </form>
  );
};
