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

const RightArrowButton = ({ onClick = () => null, text = '', modifier = 'primary' }) => {
  return (
    <button {...classes({ modifier })} onClick={onClick}>
    <svg {...classes('icon')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width={52} height={52}>
      <g fill="currentColor" fillRule="evenodd" transform="translate(1 1)">
        <circle cx={25} cy={25} r={25} stroke="currentColor" />
        <path d="M7.46688959,-1.81082538 L10.806994,1.47020326 C10.9309978,1.59131506 11,1.75546658 11,1.92862642 C11,2.10178626 10.9309978,2.26493686 10.806994,2.38805051 C10.5569862,2.63227595 10.1219726,2.63227595 9.87296478,2.38805051 L7.66089565,0.215044657 L7.66089565,10.3514013 C7.66089565,10.7087311 7.3648864,11 6.999875,11 C6.63586362,11 6.33885434,10.7087311 6.33885434,10.3514013 L6.33885434,0.215044657 L4.12778524,2.38805051 C3.86977718,2.64128426 3.45076409,2.64028334 3.19275602,2.38805051 C2.93574799,2.13481675 2.93574799,1.72243609 3.19275602,1.47020326 L6.5328604,-1.81082538 C6.66186443,-1.93794272 6.83086971,-2 6.999875,-2" id="Fill-1" fill="#0954A7" transform="translate(7.000000, 4.500000) rotate(-270.000000) translate(-7.000000, -4.500000) "></path>
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
  RightArrowButton,
};

