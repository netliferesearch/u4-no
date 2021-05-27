import React from 'react';
import BEMHelper from 'react-bem-helper';
import isArray from 'lodash/isArray';
import BlockContent from '@sanity/block-content-to-react';
import Link from 'next/link';
import serializers from './serializers';

const classes = BEMHelper({
  name: 'simple-hero',
  prefix: 'c-',
});

const SimpleHero = ({ title, content = [], light = false, cta = false, helpdesk = false }) => (
  <div {...classes(null, light ? 'light' : null, 'o-wrapper-full-width')}>
    <div {...classes('content')}>
      {isArray(content) && <BlockContent blocks={content} serializers={serializers} />}
      {!isArray(content) && content}
    </div>

    {!cta && helpdesk && (
      <div {...classes('content')}>
        {'Ask our free helpdesk today – send your question to '}
        <Link href="mailto:helpdesk@u4.no">
          <a {...classes('mailto')} title="Send an e-mail to helpdesk@u4.no">
            helpdesk@u4.no
          </a>
        </Link>{' '}
      </div>
    )}
    {cta && helpdesk && (
      <Link href="mailto:helpdesk@u4.no">
        <a {...classes('cta')}>
          Ask our free helpdesk today – send your question to helpdesk@u4.no
        </a>
      </Link>
    )}
  </div>
);

export default SimpleHero;
