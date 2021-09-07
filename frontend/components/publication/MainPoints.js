import React from 'react';

export const MainPoints = ({ items = [] }) => {
  return (
    <div className="c-main-points">
      <h4 className="u-primary-heading">Main points</h4>
      <ul className="u-bullet-list--blue">
        {items.map((item, index) => (
          <li key={index} className="c-main-points__item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
