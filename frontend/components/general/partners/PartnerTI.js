import React from 'react';
import { PartnerLogo10Blue } from '../../icons/PartnerLogo10Blue';

export const PartnerTI = () => (
    <div className="c-partners__item">
      {/* <p className="c-partners__description u-body--small u-text--grey">The U4 Helpdesk is operated by </p> */}
      <p className="c-partners__name">Transparency International</p>
      <div className="c-logo c-partners__logo">
        <PartnerLogo10Blue />
      </div>
    </div>
  );