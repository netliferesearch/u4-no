import React from 'react';
import BEMHelper from 'react-bem-helper';
import isArray from 'lodash/isArray';
import BlockContent from '@sanity/block-content-to-react';
import { Link } from '../routes';
import serializers from './serializers';

const classes = BEMHelper({
  name: 'simple-hero',
  prefix: 'c-',
});

const SimpleHero = ({
  title, content = [], light = false, cta = false,
}) => (
  <div {...classes(null, light ? 'light' : null)}>
    <h1 {...classes('title')}>{title}</h1>
    <div {...classes('content')}>
      {isArray(content) && <BlockContent blocks={content} serializers={serializers} />}
      {!isArray(content) && content}
    </div>
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
