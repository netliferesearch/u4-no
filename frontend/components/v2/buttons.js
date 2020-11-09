import React from 'react';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'btn',
  prefix: 'c-',
});

export const TextButton = ({ onClick = () => null, text = '', modifier = 'round' }) => (
  <button {...classes({ modifier })} onClick={onClick}>
    {text && <div>{text}</div>}
  </button>
);

export const CloseButton = ({ onClick = () => null, modifier = 'close' }) => (
  <button {...classes({ modifier })} onClick={onClick}>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
        fill="#666666"
      />
    </svg>
  </button>
);
