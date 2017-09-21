import React from 'react';
import { Link } from '../routes';

const BigBlueBox = ({ title = 'Click me', text = '', icon = '', route = '', params = {} }) => (
  <Link route={route} params={params}>
    <a>
      <div>
        {icon && icon()}

        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
    </a>
  </Link>
);

export default BigBlueBox;
