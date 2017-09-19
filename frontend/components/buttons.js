import React from 'react';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'btn',
  prefix: 'c-'
})

const DownArrowButton = ({ onClick = () => null, text = '', modifier = 'primary' }) => {
  return (
    <button {...classes({ modifier })} onClick={onClick}>
    <svg {...classes('icon')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width={52} height={52}>
      <g fill="currentColor" fillRule="evenodd" transform="translate(1 1)">
        <circle cx={25} cy={25} r={25} stroke="currentColor" />
        <path fill="currentColor" d="M25 31.99a.66.66 0 0 1-.47-.2l-3.34-3.27a.64.64 0 0 1 0-.92.69.69 0 0 1 .94 0l2.2 2.17V19.66c0-.36.3-.65.67-.65.36 0 .66.3.66.65v10.13l2.21-2.18a.67.67 0 0 1 .94 0c.25.26.25.67 0 .92l-3.34 3.28a.66.66 0 0 1-.47.19" />
      </g>
    </svg>
    {text &&
      <div {...classes('body')}>{text}</div>
    }
    </button>
  );
}

export {
  DownArrowButton,
};
