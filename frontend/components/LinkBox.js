import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import Link from 'next/link';
import buildUrl from '../helpers/buildUrl';

const classes = BEMHelper({
  name: 'linkbox',
  prefix: 'c-',
});

const LinkBox = ({ title = 'Click me', text = '', icon = '', _type='', slug='' }) => (
  <div {...classes()}>
    <Link href={buildUrl({_type, slug})}>
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

LinkBox.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  icon: PropTypes.func,
  _type: PropTypes.string.isRequired,
  slug: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]).isRequired,
};

LinkBox.defaultProps = {
  text: '',
  icon: () => null,
};

export default LinkBox;
