import React from 'react';

export const ChevronGrey = ({ color }) => {
  return (
    <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 0.672852L4 4.19508L1 7.36508" stroke={color} />
    </svg>
  );
};
