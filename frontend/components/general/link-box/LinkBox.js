import React from 'react';
import Link from 'next/link';
import BuildUrl from '../../../helpers/buildUrl';
import { ArrowNext } from '../../icons/ArrowNext';
export const LinkBox = ({
  title = 'Click me',
  text = '',
  _type = '',
  slug = '',
  color = 'white',
  link = 'Read more',
}) => {
  return (
    <div className={`c-linkbox c-linkbox--${color}`}>
      <Link href={BuildUrl({ _type, slug })} className="c-linkbox__link">

        <div className="c-linkbox__content">
          <div className="c-linkbox__body">
            {title && (
              <h3
                className={`c-linkbox__title u-secondary-heading u-secondary-h1 u-detail--blue`}
              >
                {title}
              </h3>
            )}
            {text && <div className="c-linkbox__text u-body">{text}</div>}

            <div
              className={`c-btn c-btn--link ${
                color === 'dark-blue' ? 'c-btn--link--onDark' : ''
              }`}
            >
              {link}
              <ArrowNext />
            </div>
          </div>
        </div>

      </Link>
    </div>
  );
};
