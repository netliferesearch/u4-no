import React from 'react';
import { Link } from '../routes';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'simple-hero',
  prefix: 'c-',
});

const SimpleHero = ({
  title, content = [], light = false, cta = false,
}) => (
  <div {...classes(null, light ? 'light' : null)}>
    <h1 {...classes('title')}>{title}</h1>
    <div {...classes('content')}>{content}</div>
    {cta && (
      <Link to="mailto:helpdesk@u4.no">
        <a {...classes('cta')}>
          Ask our free helpdesk today – send your question to helpdesk@u4.no
        </a>
      </Link>
    )}
  </div>
);

export default SimpleHero;
