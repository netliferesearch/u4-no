import React from 'react';
import { Link } from '../routes';
import { DownArrowButton } from '../components/buttons';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'linkbox',
  prefix: 'c-',
});

const LinkBox = ({ title = 'Click me', text = '', icon = '', route = '', params = {} }) => (
  <div {...classes()}>
    <Link route={route} params={params}>
      <a {...classes('link')}>
        <div {...classes('content')}>
          {icon && <div {...classes('icon')}>{icon()}</div>}
          <div {...classes('body')}>
            <h2 {...classes('title')}>{title}</h2>
            {text && <p>{text}</p>}
          </div>
        </div>
      </a>
    </Link>
  </div>
);

export default LinkBox;
