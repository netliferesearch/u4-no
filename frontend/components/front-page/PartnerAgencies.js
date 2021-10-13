import React from 'react';
import BEMHelper from 'react-bem-helper';
import PartnerLogoDanida from '../icons/PartnerLogoDanida';
import PartnerLogo2 from '../icons/PartnerLogo2';
import PartnerLogo3 from '../icons/PartnerLogo3';
import PartnerLogo4 from '../icons/PartnerLogo4';
import PartnerLogo5 from '../icons/PartnerLogo5';
import PartnerLogo6 from '../icons/PartnerLogo6';
import PartnerLogo7 from '../icons/PartnerLogo7';
import PartnerLogo8 from '../icons/PartnerLogo8';
import PartnerLogo9 from '../icons/PartnerLogo9';
import PartnerLogoCanada from '../icons/PartnerLogoCanada';

const classes = BEMHelper({
  name: 'partnerAgencies',
  prefix: 'c-',
});

const partnersLogos = {
  PartnerLogoDanida: <PartnerLogoDanida />,
  PartnerLogo2: <PartnerLogo2 />,
  PartnerLogo3: <PartnerLogo3 />,
  PartnerLogo8: <PartnerLogo8 />,
  PartnerLogo4: <PartnerLogo4 />,
  PartnerLogo5: <PartnerLogo5 />,
  PartnerLogo6: <PartnerLogo6 />,
  PartnerLogo7: <PartnerLogo7 />,
  PartnerLogo9: <PartnerLogo9 />,
  PartnerLogoCanada: <PartnerLogoCanada />,
};

const SinglePartner = ({ partner }) => {
  console.log(partner);
  return (
    <div {...classes('item')}>
      <a href={partner.website} rel="noopener noreferrer" target="_blank">
        {/* {partner.logo} */}
        {partnersLogos[partner.svgLogo] || <span>{partner.name}</span>}
      </a>
    </div>
  );
};

const PartnerAgencies = ({ partners }) => (
  <div className="c-partnerAgencies o-wrapper-medium">
    <div>
      <h4 className="u-secondary-heading u-secondary-h1 u-detail--blue">Our partners</h4>
    </div>
    <section className="c-partnerAgencies__list">
      {partners.map((p, i) => (
        <SinglePartner key={i} partner={p} />
      ))}
    </section>
  </div>
);

export default PartnerAgencies;

// const partners = [
//   {
//     url: 'http://um.dk/en/danida-en/',
//     logo: <PartnerLogoDanida/>,
//   },
//   {
//     url: 'http://dfat.gov.au/pages/default.aspx',
//     logo: <PartnerLogo2/>,
//   },
//   {
//     url: 'https://www.giz.de/en/html/index.html',
//     logo: <PartnerLogo3/>,
//   },
//   {
//     url: 'https://www.bmz.de/en/',
//     logo: <PartnerLogo8/>,
//   },
//   {
//     url: 'http://formin.finland.fi/public/default.aspx?culture=en-US&contentlan=2',
//     logo: <PartnerLogo4/>,
//   },
//   {
//     url: 'https://www.norad.no/en/front',
//     logo: <PartnerLogo5/>,
//   },
//   {
//     url: 'http://www.sida.se/English/',
//     logo: <PartnerLogo6/>,
//   },
//   {
//     url: 'https://www.eda.admin.ch/sdc',
//     logo: <PartnerLogo7/>,
//   },
//   {
//     url: 'https://www.ukaiddirect.org',
//     logo: <PartnerLogo9/>,
//   },
//   {
//     url: 'https://www.international.gc.ca/gac-amc/index.aspx?lang=eng',
//     logo: <PartnerLogoCanada/>,
//   },

// ];
