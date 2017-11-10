import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Logo } from './';
import { CmiLogo, PartnerLogo1, PartnerLogo2, PartnerLogo3, PartnerLogo4, PartnerLogo5, PartnerLogo6, PartnerLogo7, PartnerLogo8, PartnerLogo9 } from './icons/';

const classes = BEMHelper({
  name: 'partnerAgencies',
  prefix: 'c-',
});

const PartnerAgencies = ({ title }) => (

  <div {...classes('')}>
    <div {...classes('heading')}>
      <h1>Partner agencies</h1>
      <p {...classes('text')}>The U4 Anti-Corruption Resource Centre is an institutional partnership
  of bilateral international development agencies/ministries of foreign affairs.</p>
    </div>
    <section {...classes('wrapper', null, 'o-wrapper')}>
      <div {...classes('item')}>
        <PartnerLogo1 />
      </div>
      <div {...classes('item')}>
        <PartnerLogo2 />
      </div>
      <div {...classes('item', 'small')}>
        <PartnerLogo3 />
      </div>
      <div {...classes('item')}>
        <PartnerLogo4 />
      </div>
      <div {...classes('item')}>
        <PartnerLogo5 />
      </div>
      <div {...classes('item')}>
        <PartnerLogo6 />
      </div>
      <div {...classes('item')}>
        <PartnerLogo7 />
      </div>
      <div {...classes('item')}>
        <PartnerLogo8 />
      </div>
      <div {...classes('item', 'small')}>
        <PartnerLogo9 />
      </div>
    </section>
  </div>
);

export default PartnerAgencies;
