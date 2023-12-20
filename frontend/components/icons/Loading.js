import React from 'react';

export default function Loading(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" role="img" >
      <g fill="none" stroke="#0079CF" strokeWidth="2" transform="translate(1 1)">
        <circle cx="8.5" cy="8.5" r="8.5" stroke="none" />
        <path strokeOpacity=".05" d="M8.5,17 C11.0624041,17 13.3599856,15.8661591 14.918399,14.0728225" />
        <path strokeOpacity=".2" d="M14.918399,14.0728225 C16.2150574,12.5806993 17,10.6320162 17,8.5" />
        <path strokeOpacity=".4" d="M17,8.5 C17,6.07877133 15.9876552,3.89398847 14.3631488,2.34583479" />
        <path strokeOpacity=".6" d="M14.3631488,2.34583479 C12.8379669,0.892337172 10.7731917,-3.28626015e-14 8.5,-3.28626015e-14" />
        <path strokeOpacity=".8" d="M8.5,4.5519144e-14 C6.3282099,4.5519144e-14 4.34665712,0.814502753 2.84414694,2.15470296" />
        <path d="M2.84414694,2.15470296 C1.09891491,3.71140478 7.46291917e-13,5.97736972 7.46291917e-13,8.5" />
      </g>
    </svg>
  );
}
