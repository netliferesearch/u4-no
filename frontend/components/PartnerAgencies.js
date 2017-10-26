import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Logo } from './';
import { CmiLogo } from './icons/';

const classes = BEMHelper({
  name: 'partnerAgencies',
  prefix: 'c-',
});

const PartnerAgencies= ({ title }) => (
  <section {...classes()}>
      <div {...classes('wrapper')}>
        <div {...classes('item')}>
          <CmiLogo {...classes('color-icon')} /><br /><br />
        </div>
      </div>
  </section>
);

export default PartnerAgencies;
