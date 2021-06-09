import React from 'react';
import BEMHelper from 'react-bem-helper';

import Logo from './Logo';
import CmiLogo from './icons/CmiLogo';
import PartnerLogoDanida from './icons/PartnerLogoDanida';
import PartnerLogo2 from './icons/PartnerLogo2';
import PartnerLogo3 from './icons/PartnerLogo3';
import PartnerLogo4 from './icons/PartnerLogo4';
import PartnerLogo5 from './icons/PartnerLogo5';
import PartnerLogo6 from './icons/PartnerLogo6';
import PartnerLogo7 from './icons/PartnerLogo7';
import PartnerLogo8 from './icons/PartnerLogo8';
import PartnerLogo9 from './icons/PartnerLogo9';
import PartnerLogoCanada from './icons/PartnerLogoCanada';

const classes = BEMHelper({
  name: 'partnerAgencies',
  prefix: 'c-',
});

const PartnerAgencies = ({ title }) => (
  <div {...classes(null, null, 'o-wrapper-full-width')}>
    <div {...classes('heading')}>
      <h1>Partner agencies</h1>
      <p {...classes('text')}>
        The U4 Anti-Corruption Resource Centre is an institutional partnership of bilateral
        international development agencies/ministries of foreign affairs.
      </p>
    </div>
    <section {...classes('wrapper', null, 'o-wrapper')}>
      <div {...classes('item')}>
        <a href="http://um.dk/en/danida-en/" rel="noopener noreferrer" target="_blank">
          <PartnerLogoDanida />
        </a>
      </div>
      <div {...classes('item', 'small')}>
        <a href="https://www.giz.de/en/html/index.html" rel="noopener noreferrer" target="_blank">
          <PartnerLogo3 />
        </a>
      </div>
      <div {...classes('item')}>
        <a href="https://www.bmz.de/en/" rel="noopener noreferrer" target="_blank">
          <PartnerLogo8 />
        </a>
      </div>
      <div {...classes('item')}>
        <a
          href="http://formin.finland.fi/public/default.aspx?culture=en-US&contentlan=2"
          rel="noopener noreferrer"
          target="_blank"
        >
          <PartnerLogo4 />
        </a>
      </div>
      <div {...classes('item')}>
        <a href="https://www.norad.no/en/front/" rel="noopener noreferrer" target="_blank">
          <PartnerLogo5 />
        </a>
      </div>
      <div {...classes('item')}>
        <a href="http://www.sida.se/English/" rel="noopener noreferrer" target="_blank">
          <PartnerLogo6 />
        </a>
      </div>
      <div {...classes('item')}>
        <a href="https://www.eda.admin.ch/sdc" rel="noopener noreferrer" target="_blank">
          <PartnerLogo7 />
        </a>
      </div>
      <div {...classes('item', 'small')}>
        <a href="https://www.ukaiddirect.org/" rel="noopener noreferrer" target="_blank">
          <PartnerLogo9 />
        </a>
      </div>
      <div {...classes('item', 'small')}>
        <a
          href="https://www.international.gc.ca/gac-amc/index.aspx?lang=eng"
          rel="noopener noreferrer"
          target="_blank"
        >
          <PartnerLogoCanada />
        </a>
      </div>
    </section>
  </div>
);

export default PartnerAgencies;
