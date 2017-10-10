import React from 'react';
import { Link } from '../routes';
import { DownArrowButton } from '../components/buttons';

const LinkBox = ({ title = 'Click me', text = '', icon = '', route = '', params = {} }) => (
  <div className="c-linkbox">
    <Link route={route} params={params}>
      <a className="c-linkbox-link">
        <div className="c-linkbox__content">
          {icon && <div className="c-linkbox__icon">{icon()}</div>}
          <div className="c-linkbox__body">
            <h2 className="c-linkbox__title">{title}</h2>
            {text && <p>{text}</p>}
          </div>
          <div className="c-linkbox__arrow">
            <DownArrowButton modifier="secondary" text="" />
          </div>
        </div>
      </a>
    </Link>
  </div>
);

export default LinkBox;
