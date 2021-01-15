import React from 'react';
import BEMHelper from 'react-bem-helper';
import { ArrowDown } from './icons/ArrowDown'
const classes = BEMHelper({
  name: 'btn',
  prefix: 'c-',
});

export const TextButton = ({ onClick = () => null, text = '', modifier = 'qua', disabled=false }) => (
  <button {...classes({ modifier })} onClick={onClick} disabled={disabled}>
    {text && <div>{text}</div>}
  </button>
);

export const TextIconButton = ({ onClick = () => null, text = '', modifier = 'qua', disabled=false }) => (
  <button {...classes(null, modifier, 'c-btn--chevron')} onClick={onClick} disabled={disabled}>
    <div>{text && <span>{text}</span>}<ArrowDown /></div>
    
  </button>
);

export const RoundIconButton = ({ onClick = () => null, text = '', modifier = 'qua', disabled=false }) => (
  <button {...classes(null, modifier, 'c-btn--chevron')} onClick={onClick} disabled={disabled}>
    <div>{text && <span>{text}</span>}<ArrowDown /></div>
  </button>
);

export const CloseButton = ({ onClick = () => null, modifier = 'close', children }) => (
  <button {...classes({ modifier })} onClick={onClick} aria-label="Close modal">
    {children}
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
        fill="#666666"
      />
    </svg>
    <span className="u-visually-hidden">Close</span>
  </button>
);

export const NextButton = ({ onClick = () => null, modifier = 'next' }) => (
  <button {...classes({ modifier })} onClick={onClick} aria-label="next">
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.90625 7.53125C9.1875 7.25 9.1875 6.78125 8.90625 6.5L2.84375 0.40625C2.53125 0.125 2.0625 0.125 1.78125 0.40625L1.0625 1.125C0.78125 1.40625 0.78125 1.875 1.0625 2.1875L5.875 7L1.0625 11.8438C0.78125 12.1562 0.78125 12.625 1.0625 12.9062L1.78125 13.625C2.0625 13.9062 2.53125 13.9062 2.84375 13.625L8.90625 7.53125Z"
        fill="#BDBDBD"
      />
    </svg>

    <span className="u-visually-hidden">Next</span>
  </button>
);

export const PrevButton = ({ onClick = () => null, modifier = 'prev' }) => (
  <button {...classes({ modifier })} onClick={onClick} aria-label="previous">
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.0625 6.5C0.78125 6.78125 0.78125 7.25 1.0625 7.53125L7.125 13.625C7.4375 13.9062 7.90625 13.9062 8.1875 13.625L8.90625 12.9062C9.1875 12.625 9.1875 12.1562 8.90625 11.8438L4.09375 7L8.90625 2.1875C9.1875 1.875 9.1875 1.40625 8.90625 1.125L8.1875 0.40625C7.90625 0.125 7.4375 0.125 7.125 0.40625L1.0625 6.5Z"
        fill="#BDBDBD"
      />
    </svg>
    <span className="u-visually-hidden">Previous</span>
  </button>
);

export const SubmitButton = ({ onClick = () => null, modifier = 'submit', text = 'Submit' }) => (
  <button
    {...classes({ modifier })}
    onClick={onClick}
    aria-label="submit"
    type="submit"
    value="Subscribe"
  >
    {text}
  </button>
);
