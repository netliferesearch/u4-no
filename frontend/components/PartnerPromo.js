import React from 'react';
import { Link } from '../routes';
import BEMHelper from 'react-bem-helper';
import { Person } from './';
import { ArrowRight } from '../components/icons';

const classes = BEMHelper({
  name: 'partner-promo',
  prefix: 'c-',
});

const PartnerPromo = ({
  title = { __html: '<span>Are you U4 partner staff?<br />Take advantage of exclusive U4 services.</span>' },
}) => (
  <section {...classes('')}>
    <div className="o-wrapper">
      <h2 {...classes('title')} dangerouslySetInnerHTML={title} />
    </div>
    <div className="o-wrapper">
      <h2 {...classes('cta')}><a href="#">See all our partners &nbsp;<ArrowRight /></a></h2>
    </div>
  </section>
);

export default PartnerPromo;

