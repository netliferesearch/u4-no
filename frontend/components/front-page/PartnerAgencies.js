import React from 'react';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'partnerAgencies',
  prefix: 'c-',
});

const SinglePartner = ({ partner }) => {
  return (
    <div {...classes('item')}>
      <a href={partner.website} rel="noopener noreferrer" target="_blank" title={partner.name}>
        <img src={`/public/partnerlogos/${partner.svgLogo}.svg`} id={partner.svgLogo} loading="lazy" alt={partner.name}/>
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