import React from 'react';

export default function Download(props) {
  return (
    <svg
      width="128"
      height="199"
      viewBox="0 0 128 199"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <path id="a" d="M1 .6h110v168.8H1z" />
        <path id="c" d="M128 0v18H0V0h128z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(8 -.59)">
          <mask id="b" fill="#fff">
            <use xlinkHref="#a" /></mask>
          <path d="M62 167l46-42c3.7-3.3 4-9 .6-12.7-3.3-3.6-9-4-12.7-.5L65 140V9.6c0-5-4-9-9-9s-9 4-9 9V140l-31-28.2c-3.6-3.4-9.3-3-12.6.5-1.6 1.8-2.4 4-2.4 6 0 2.6 1 5 3 6.8l46 42c3.4 3.2 8.6 3.2 12 0" fill="#00C2FF" mask="url(#b)" />
        </g>
        <g transform="translate(0 180.41)">
          <mask id="d" fill="#fff">
            <use xlinkHref="#c" />
          </mask>
          <path d="M119 18H9c-5 0-9-4-9-9s4-9 9-9h110c5 0 9 4 9 9s-4 9-9 9" fill="#00C2FF" mask="url(#d)" />
        </g>
      </g>
    </svg>
  );
}
