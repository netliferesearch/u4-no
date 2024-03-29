import React from 'react';

export default function Helpdesk(props) {
  return (
    <svg
      width="60"
      height="72"
      viewBox="0 0 60 72"
      xmlns="http://www.w3.org/2000/svg" 
      role="img" 
      title="Helpdesk"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <defs>
        <path id="a" d="M29 .6v28.2H1V.6z" />
        <path id="c" d="M42.4 0H0v72h42.4z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(30 43)">
          <mask id="b" fill="#fff">
            <use xlinkHref="#a" />
          </mask>
          <path
            d="M15 2.4C8.2 2.4 2.6 8 2.6 14.7 2.6 21.5 8.2 27 15 27c6.8 0 12.3-5.5 12.3-12.3C27.3 8 21.8 2.4 15 2.4m0 26.4c-7.8 0-14-6.3-14-14C1 6.7 7 .5 15 .5c7.7 0 14 6.3 14 14 0 8-6.3 14.2-14 14.2"
            fill="#FFF"
            mask="url(#b)"
          />
        </g>
        <path
          d="M46.3 51.4c0 .4 0 1.5-.3 3.5l-.7 5.7h-.8c0-1.8-.3-3.8-.5-5.8l-.4-3.6c0-.4 0-.7.4-1 .3-.3.6-.4 1-.4s.7 0 1 .4c.2.3.3.6.3 1m0 12.6c0 .4 0 .7-.3 1-.3.3-.6.4-1 .4s-.8 0-1-.4c-.3-.3-.5-.6-.5-1s.2-.7.5-1c.2-.3.6-.4 1-.4s.7 0 1 .4c.3.3.4.6.4 1"
          fill="#FFF"
        />
        <g>
          <mask
            id="d"
            fill="#fff"
          >
            <use xlinkHref="#c" />
          </mask>
          <path
            d="M21 1.8c-3.8 0-7 3-7 7l-.2 7.2c0 .4-.4.8-1 .8-.3 0-.5.2-.7.4v.7l.5 3.7c0 .2.3.4.6.4h1c.4 0 .7.4.8 1 0 .2 0 1 .2 1.8.2 2.2 1.3 4.3 3 5.6l.3.2c.2.2.3.4.3.7v4.5c0 1-.6 1.7-1.5 2L7 40.7c-3 .5-5 3-5 6v21c0 1.3 1 2.4 2.5 2.4H31c-3.2-3.4-5-8-5-12.5 0-8 5-15 12.3-17.7L32 38h-.4l-2.4-1.4c-.3-.2-.4-.5-.4-.8v-4.5c0-.3 0-.5.3-.7l.4-.2c1.8-1.4 3-3.4 3-5.6l.2-2c0-.4.5-.7 1-.7h.7c.3 0 .5 0 .6-.4l.5-3.7c0-.4 0-.6-.2-1l-.8-.2c-.4 0-.8-.4-.8-.8l-.2-7.2c0-4-3.2-7-7.2-7H21zM33 72H4.3C2 72 0 70 0 67.7V47c0-4 2.7-7.3 6.4-8l10.3-3s.2 0 .2-.2v-4C14.7 30 13.4 27.5 13 25v-1c-1.2 0-2.2-1-2.4-2l-.6-3.8c0-.8 0-1.6.6-2.2.3-.4.8-.6 1.2-.8l.2-6.4c0-5 4-8.8 9-8.8h5c5 0 9 4 9 8.8l.2 6.4c.5 0 1 .4 1.2.8.5.6.8 1.4.6 2.2l-.6 3.7c-.2 1-1 2-2.3 2v1c-.3 2.6-1.6 5-3.8 6.7v3.6l2 1.2L41 39h.8c.4.3.7.6.6 1 0 .4-.3.8-.7.8-8 1.6-13.8 8.7-13.8 17 0 4.8 2 9.4 5.6 12.7.2.2.3.6.2 1 0 .3-.4.5-.8.5z"
            fill="#FFF"
            mask="url(#d)"
          />
        </g>
      </g>
    </svg>
  );
}

