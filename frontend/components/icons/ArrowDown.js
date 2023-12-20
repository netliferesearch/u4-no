import React from 'react';

export const ArrowDown = () => {
  return (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" title="Down">
      <path d="M12.75 1L6.43421 6.33333L0.75 0.999999" stroke="#162063" strokeWidth="2" />
    </svg>
  );
};
export const ArrowUp = () => {
  return (
    <svg
      style={{ transform: 'rotate(180deg)' }}
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      title="Up"
    >
      <path d="M12.75 1L6.43421 6.33333L0.75 0.999999" stroke="#162063" strokeWidth="2" />
    </svg>
  );
};
