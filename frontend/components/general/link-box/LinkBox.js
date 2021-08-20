import React from 'react';
import Link from 'next/link';
import BuildUrl from '../../../helpers/buildUrl';
import { ArrowNext } from '../../icons/ArrowNext';

export const LinkBox = ({
  title = 'Click me',
  text = '',
  icon = '',
  _type = '',
  slug = '',
  color = 'white',
}) => (
  <div className={`c-linkbox c-linkbox--${color}`}>
    <Link href={BuildUrl({ _type, slug })}>
      <a className="c-linkbox__link">
        <div className="c-linkbox__content">
          {/* {icon && <div className="c-linkbox__icon" {...classes('icon')}>{icon()}</div>} */}
          <div className="c-linkbox__body">
            <h3 className="c-linkbox__title u-secondary-heading u-secondary-h1 u-detail--blue">
              {title}
            </h3>
            {text && <p className="c-linkbox__text u-body">{text}</p>}
            <div
              className={`c-btn c-btn--link ${color === 'dark-blue' ? 'c-btn--link--onDark' : ''}`}
            >
              View All
              <ArrowNext />
            </div>
          </div>
        </div>
      </a>
    </Link>
  </div>
);
