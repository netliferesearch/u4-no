import React from 'react';
import { Link } from '../routes';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'simple-hero',
  prefix: 'c-',
});

const SimpleHero = ({ title, content, cta = false }) => (
  <div {...classes()}>
    <h1 {...classes('title')}>{title}</h1>
    <p {...classes('content')}>{content}</p>
    { cta &&
      <Link>
        <a {...classes('cta')}>
          CTA
        </a>
      </Link>
    }
  </div>
);

export default SimpleHero;
