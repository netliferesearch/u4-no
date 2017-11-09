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
      <Link to={'#'}>
        <a {...classes('cta')}>
          Ask our free helpdesk today
        </a>
      </Link>
    }
  </div>
);

export default SimpleHero;
