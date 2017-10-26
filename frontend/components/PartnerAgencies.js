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
    <div className="o-wrapper u-margin-bottom-huge">
      <div {...classes('heading')}>
        <h1>Partner Agencies</h1>
        <p {...classes('text')}>The U4 Anti-Corruption Resource Centre is an institutional partnership
          of bilateral international development agencies/foreign departments.</p>
        </div>
          <div {...classes('item')}>
            <CmiLogo {...classes('color-icon')} /><br /><br />
          </div>
          <div {...classes('item')}>
            <CmiLogo {...classes('color-icon')} /><br /><br />
          </div>
          <div {...classes('item')}>
            <CmiLogo {...classes('color-icon')} /><br /><br />
          </div>
          <div {...classes('item')}>
            <CmiLogo {...classes('color-icon')} /><br /><br />
          </div>
          <div {...classes('item')}>
            <CmiLogo {...classes('color-icon')} /><br /><br />
          </div>
          <div {...classes('item')}>
            <CmiLogo {...classes('color-icon')} /><br /><br />
          </div>
          <div {...classes('item')}>
            <CmiLogo {...classes('color-icon')} /><br /><br />
          </div>
          <div {...classes('item')}>
            <CmiLogo {...classes('color-icon')} /><br /><br />
          </div>
          <div {...classes('item')}>
            <CmiLogo {...classes('color-icon')} /><br /><br />
          </div>
          <div {...classes('item')}>
            <CmiLogo {...classes('color-icon')} /><br /><br />
          </div>
          <div {...classes('item')}>
            <CmiLogo {...classes('color-icon')} /><br /><br />
          </div>
      </div>
  </section>
);

export default PartnerAgencies;
