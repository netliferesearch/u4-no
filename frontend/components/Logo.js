import React from 'react';

export default function Logo(props) {
  return (
    <svg className="c-logo" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={240} height={50} {...props}>
      <g className="c-logo__symbol">
        <path fill="#0079CF" d="M44.19.9L14.55 43.53h22.67V50h6.97v-6.48h4.9v-6.27h-4.9V.9zm-6.97 21.05v15.3H26.57l10.65-15.3z" />

        <path fill="#0079CF" d="M8.81 32.39c-1.28-1.8-1.92-4.65-1.92-8.54V.51H0v25.22c0 4.77 1.5 8.7 4.5 11.79a16.58 16.58 0 0 0 6.97 4.36l3.95-5.68a9.19 9.19 0 0 1-6.6-3.81" />
        <polygon fill="#0079CF" points="33.809 .505 26.917 .505 26.917 19.636 33.809 9.71" />
      </g>
      <g className="c-logo__text">
        <path fill="#0079CF" d="M60.25 17.73h3.23l-1.58-6.15h-.07l-1.58 6.15zm3.92 2.7h-4.62l-.94 3.72h-3.45l4.93-17.37h3.57l4.92 17.37h-3.46l-.95-3.72z" />
        <polygon fill="#0079CF" points="82.201 24.145 78.797 24.145 73.44 13.039 73.369 13.063 73.369 24.145 69.938 24.145 69.938 6.775 73.369 6.775 78.724 17.871 78.797 17.847 78.797 6.775 82.201 6.775" />
        <polygon fill="#0079CF" points="94.839 9.484 90.891 9.484 90.891 24.146 87.473 24.146 87.473 9.484 83.551 9.484 83.551 6.776 94.839 6.776" />

        <polygon fill="#0079CF" points="96.667 24.146 100.073 24.146 100.073 6.776 96.667 6.776" />

        <polygon fill="#0079CF" points="103.034 18.037 109.016 18.037 109.016 15.329 103.034 15.329" />
        <path fill="#0079CF" d="M122.9 18.55l.04.07c.02 1.91-.44 3.35-1.37 4.32-.93.97-2.3 1.46-4.12 1.46a5.82 5.82 0 0 1-4.34-1.66c-1.09-1.1-1.63-2.66-1.63-4.68v-5.19c0-2.01.53-3.57 1.57-4.68a5.51 5.51 0 0 1 4.2-1.66c1.87 0 3.28.49 4.23 1.47.95.99 1.44 2.45 1.47 4.38l-.04.07h-3.3c.06-1.14-.1-1.96-.46-2.46s-1-.76-1.9-.76c-.76 0-1.35.3-1.76.9-.41.6-.61 1.5-.61 2.71v5.22c0 1.22.21 2.14.65 2.73.44.6 1.08.9 1.92.9.83 0 1.4-.24 1.73-.71.32-.47.47-1.28.42-2.43h3.3z" />
        <path fill="#0079CF" d="M133.41 13c0-1.24-.23-2.18-.7-2.82a2.37 2.37 0 0 0-2.03-.95c-.9 0-1.57.32-2.02.95a4.86 4.86 0 0 0-.68 2.82v4.9c0 1.27.23 2.21.69 2.84.45.63 1.13.95 2.02.95.88 0 1.56-.32 2.02-.95.47-.63.7-1.57.7-2.83V13zm3.4 4.9c0 2.04-.55 3.63-1.67 4.78a5.93 5.93 0 0 1-4.45 1.72 5.9 5.9 0 0 1-4.44-1.72c-1.1-1.15-1.66-2.74-1.66-4.77v-4.87c0-2.03.55-3.62 1.66-4.78a5.84 5.84 0 0 1 4.43-1.73c1.84 0 3.33.57 4.45 1.73 1.12 1.16 1.69 2.75 1.69 4.78v4.87z" />
        <path fill="#0079CF" d="M142.47 14.53h2.29c.7 0 1.23-.21 1.59-.63.36-.42.54-1.02.54-1.8 0-.8-.18-1.43-.54-1.9-.36-.47-.89-.7-1.58-.7h-2.3v5.03zm0 2.7v6.92h-3.42V6.79h5.72c1.73 0 3.08.45 4.06 1.35.99.9 1.48 2.16 1.48 3.77 0 .9-.2 1.68-.62 2.34-.4.66-1 1.18-1.79 1.57.9.3 1.55.8 1.94 1.5.4.7.6 1.58.6 2.63v1.22c0 .48.05 1 .17 1.54.11.54.3.94.59 1.18v.26h-3.54c-.28-.26-.46-.67-.53-1.25-.07-.57-.1-1.15-.1-1.75v-1.18c0-.87-.19-1.54-.54-2.02a1.8 1.8 0 0 0-1.54-.71h-2.48z" />
        <path fill="#0079CF" d="M156.46 14.53h2.28c.7 0 1.23-.21 1.6-.63.35-.42.53-1.02.53-1.8 0-.8-.18-1.43-.54-1.9-.36-.47-.88-.7-1.57-.7h-2.3v5.03zm0 2.7v6.92h-3.42V6.79h5.72c1.72 0 3.07.45 4.06 1.35.98.9 1.47 2.16 1.47 3.77 0 .9-.2 1.68-.61 2.34-.41.66-1 1.18-1.8 1.57.9.3 1.55.8 1.95 1.5.4.7.6 1.58.6 2.63v1.22c0 .48.05 1 .16 1.54s.31.94.6 1.18v.26h-3.55c-.28-.26-.45-.67-.53-1.25-.07-.57-.1-1.15-.1-1.75v-1.18c0-.87-.18-1.54-.54-2.02a1.8 1.8 0 0 0-1.53-.71h-2.48z" />
        <path fill="#0079CF" d="M178.7 6.78V18.6c0 1.85-.54 3.28-1.63 4.29a6.1 6.1 0 0 1-4.3 1.5 6.1 6.1 0 0 1-4.3-1.5c-1.1-1.02-1.65-2.45-1.65-4.3V6.79h3.42V18.6c0 1.06.22 1.83.66 2.34.44.5 1.06.75 1.86.75.83 0 1.46-.24 1.9-.72.43-.47.64-1.27.64-2.37V6.78h3.4z" />
        <path fill="#0079CF" d="M184.6 15.2h2.65c.73 0 1.29-.27 1.68-.8.38-.54.57-1.21.57-2.04 0-.82-.19-1.51-.57-2.06a1.92 1.92 0 0 0-1.68-.82h-2.66v5.72zm0 2.7v6.25h-3.44V6.78h6.1c1.74 0 3.12.5 4.13 1.53a5.49 5.49 0 0 1 1.52 4.03c0 1.67-.5 3.01-1.52 4.04a5.57 5.57 0 0 1-4.14 1.53h-2.66z" />
        <g>
          <polygon fill="#0079CF" points="205.414 9.484 201.467 9.484 201.467 24.146 198.048 24.146 198.048 9.484 194.126 9.484 194.126 6.776 205.414 6.776" />
        </g>
        <g>
          <polygon fill="#0079CF" points="207.244 24.146 210.649 24.146 210.649 6.776 207.244 6.776" />
        </g>
        <g>
          <path fill="#0079CF" d="M221.89 13c0-1.24-.23-2.18-.7-2.82a2.37 2.37 0 0 0-2.03-.95c-.9 0-1.57.32-2.02.95a4.86 4.86 0 0 0-.68 2.82v4.9c0 1.27.23 2.21.69 2.84.45.63 1.13.95 2.02.95.88 0 1.56-.32 2.02-.95.47-.63.7-1.57.7-2.83V13zm3.4 4.9c0 2.04-.55 3.63-1.67 4.78a5.93 5.93 0 0 1-4.45 1.72 5.89 5.89 0 0 1-4.44-1.72c-1.1-1.15-1.66-2.74-1.66-4.77v-4.87c0-2.03.55-3.62 1.66-4.78a5.84 5.84 0 0 1 4.43-1.73c1.84 0 3.33.57 4.45 1.73 1.12 1.16 1.68 2.75 1.68 4.78v4.87z" />
        </g>
        <g>
          <polygon fill="#0079CF" points="239.786 24.145 236.38 24.145 231.024 13.039 230.953 13.063 230.953 24.145 227.522 24.145 227.522 6.775 230.953 6.775 236.308 17.871 236.38 17.847 236.38 6.775 239.786 6.775" />
        </g>
        <g>
          <path fill="#0079CF" d="M56.5 36.23h2.4c.86 0 1.5-.22 1.9-.66.4-.44.6-1.03.6-1.79 0-.8-.2-1.4-.59-1.84-.4-.43-1-.64-1.8-.64H56.5v4.93zm0 .85v5.51h-1.02V30.42h3.53c1.1 0 1.95.29 2.53.86.59.57.88 1.4.88 2.5 0 .65-.15 1.23-.46 1.73-.31.5-.75.88-1.32 1.12.63.19 1.07.53 1.35 1.02.27.5.4 1.1.4 1.83v1.15c0 .38.04.72.12 1.02.07.3.2.55.37.74v.2h-1.04c-.17-.2-.3-.48-.36-.84-.06-.35-.1-.73-.1-1.14V39.5a2.6 2.6 0 0 0-.56-1.77c-.38-.43-.9-.65-1.56-.65H56.5z" />
        </g>
        <g>
          <polygon fill="#0079CF" points="70.941 36.702 66.112 36.702 66.112 41.74 71.658 41.74 71.658 42.593 65.098 42.593 65.098 30.409 71.608 30.409 71.608 31.297 66.112 31.297 66.112 35.849 70.941 35.849" />
        </g>
        <g>
          <path fill="#0079CF" d="M79.27 39.62c0-.67-.2-1.21-.58-1.63a4.93 4.93 0 0 0-2.07-1.1 6.44 6.44 0 0 1-2.54-1.32 2.82 2.82 0 0 1-.87-2.17c0-.93.32-1.69.97-2.28.64-.6 1.47-.89 2.5-.89 1.06 0 1.92.35 2.57 1.05.65.7.97 1.55.95 2.55l-.02.05h-.96c0-.8-.22-1.47-.68-1.98a2.36 2.36 0 0 0-1.87-.78c-.77 0-1.37.22-1.8.65a2.2 2.2 0 0 0-.64 1.61c0 .6.21 1.1.62 1.52.42.41 1.12.77 2.1 1.07 1.1.34 1.93.8 2.5 1.36.56.58.84 1.33.84 2.26a2.9 2.9 0 0 1-1 2.32c-.66.57-1.52.86-2.57.86-1.03 0-1.92-.3-2.69-.92-.76-.61-1.13-1.5-1.1-2.67l.02-.05h.95c0 .95.27 1.66.83 2.1.55.46 1.22.69 2 .69.76 0 1.37-.21 1.84-.63.47-.42.7-.98.7-1.67" />
        </g>
        <g>
          <path fill="#0079CF" d="M88.58 34.78c0-1.2-.25-2.11-.76-2.72-.5-.6-1.21-.91-2.15-.91-.9 0-1.6.3-2.08.9-.49.62-.73 1.52-.73 2.73v3.44c0 1.22.24 2.13.73 2.74.48.61 1.18.91 2.09.91.93 0 1.65-.3 2.15-.9.5-.62.75-1.53.75-2.75v-3.44zm1 3.44c0 1.48-.35 2.6-1.04 3.38a3.64 3.64 0 0 1-2.86 1.17 3.52 3.52 0 0 1-2.8-1.17c-.68-.78-1.02-1.9-1.02-3.38V34.8c0-1.47.34-2.6 1.02-3.39a3.5 3.5 0 0 1 2.8-1.18c1.2 0 2.16.4 2.85 1.18.7.8 1.05 1.92 1.05 3.4v3.4z" />
        </g>
        <g>
          <path fill="#0079CF" d="M98.78 30.4v8.54c0 1.24-.33 2.19-1 2.85-.67.65-1.54.98-2.62.98-1.05 0-1.9-.33-2.56-.98-.65-.66-.98-1.6-.98-2.85V30.4h1v8.54c0 .95.24 1.69.7 2.2.48.51 1.09.77 1.84.77.8 0 1.43-.25 1.9-.74.48-.49.72-1.23.72-2.23V30.4h1z" />
        </g>
        <g>
          <path fill="#0079CF" d="M102.3 36.23h2.4c.86 0 1.5-.22 1.9-.66.4-.44.6-1.03.6-1.79 0-.8-.2-1.4-.6-1.84-.39-.43-.98-.64-1.79-.64h-2.52v4.93zm0 .85v5.51h-1.02V30.42h3.53c1.1 0 1.95.29 2.53.86.59.57.88 1.4.88 2.5 0 .65-.15 1.23-.46 1.73-.31.5-.75.88-1.32 1.12.62.19 1.07.53 1.35 1.02.27.5.4 1.1.4 1.83v1.15c0 .38.04.72.12 1.02.07.3.2.55.37.74v.2h-1.04c-.18-.2-.3-.48-.36-.84-.06-.35-.1-.73-.1-1.14V39.5a2.6 2.6 0 0 0-.56-1.77c-.38-.43-.9-.65-1.56-.65h-2.77z" />
        </g>
        <g>
          <path fill="#0079CF" d="M117.6 39.05l.03.05c0 1.2-.32 2.1-.94 2.73-.62.63-1.47.94-2.56.94-1.13 0-2.03-.4-2.7-1.19-.66-.8-.99-1.92-.99-3.39v-3.37c0-1.46.34-2.58 1-3.39.67-.8 1.57-1.2 2.7-1.2 1.09 0 1.94.31 2.56.92.61.62.92 1.53.93 2.75l-.02.05h-.94c-.03-.97-.25-1.68-.67-2.14-.43-.46-1.05-.69-1.87-.69-.84 0-1.5.32-1.97.95a4.5 4.5 0 0 0-.71 2.73v3.4c0 1.22.23 2.14.7 2.77.48.63 1.14.95 1.98.95.82 0 1.44-.23 1.87-.68.42-.45.64-1.18.67-2.19h.94z" />
        </g>
        <g>
          <polygon fill="#0079CF" points="125.706 36.702 120.876 36.702 120.876 41.74 126.423 41.74 126.423 42.593 119.863 42.593 119.863 30.409 126.372 30.409 126.372 31.297 120.876 31.297 120.876 35.849 125.706 35.849" />
        </g>
        <g>
          <path fill="#0079CF" d="M138.69 39.05l.03.05c-.02 1.2-.33 2.1-.95 2.73-.62.63-1.47.94-2.56.94-1.13 0-2.03-.4-2.7-1.19-.66-.8-.99-1.92-.99-3.39v-3.37c0-1.46.34-2.58 1-3.39.67-.8 1.57-1.2 2.7-1.2 1.09 0 1.94.31 2.56.92.61.62.92 1.53.94 2.75l-.03.05h-.94c-.03-.97-.25-1.68-.67-2.14-.43-.46-1.05-.69-1.87-.69-.84 0-1.5.32-1.97.95a4.5 4.5 0 0 0-.71 2.73v3.4c0 1.22.23 2.14.7 2.77.48.63 1.14.95 1.98.95.82 0 1.44-.23 1.87-.68.42-.45.64-1.18.67-2.19h.94z" />
        </g>
        <g>
          <polygon fill="#0079CF" points="146.785 36.702 141.956 36.702 141.956 41.74 147.503 41.74 147.503 42.593 140.943 42.593 140.943 30.409 147.453 30.409 147.453 31.297 141.956 31.297 141.956 35.849 146.785 35.849" />
        </g>
        <g>
          <polygon fill="#0079CF" points="156.967 42.593 155.954 42.593 150.467 32.393 150.416 32.401 150.416 42.593 149.394 42.593 149.394 30.409 150.416 30.409 155.903 40.61 155.954 40.602 155.954 30.409 156.967 30.409" />
        </g>
        <g>
          <polygon fill="#0079CF" points="166.345 31.297 162.91 31.297 162.91 42.593 161.897 42.593 161.897 31.297 158.469 31.297 158.469 30.409 166.345 30.409" />
        </g>
        <g>
          <path fill="#0079CF" d="M169.1 36.23h2.4c.86 0 1.5-.22 1.9-.66.4-.44.6-1.03.6-1.79 0-.8-.2-1.4-.59-1.84-.4-.43-1-.64-1.8-.64h-2.51v4.93zm0 .85v5.51h-1.01V30.42h3.52c1.1 0 1.95.29 2.54.86.58.57.87 1.4.87 2.5 0 .65-.15 1.23-.46 1.73-.3.5-.75.88-1.32 1.12.63.19 1.08.53 1.35 1.02.27.5.4 1.1.4 1.83v1.15c0 .38.05.72.12 1.02.07.3.2.55.37.74v.2h-1.04c-.17-.2-.3-.48-.36-.84a6.4 6.4 0 0 1-.1-1.14V39.5a2.6 2.6 0 0 0-.56-1.77c-.38-.43-.9-.65-1.55-.65h-2.77z" />
        </g>
        <g>
          <polygon fill="#0079CF" points="183.543 36.702 178.714 36.702 178.714 41.74 184.261 41.74 184.261 42.593 177.701 42.593 177.701 30.409 184.21 30.409 184.21 31.297 178.714 31.297 178.714 35.849 183.543 35.849" />
        </g>
      </g>
    </svg>
  );
}
