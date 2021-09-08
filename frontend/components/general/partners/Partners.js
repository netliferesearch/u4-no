import React from 'react';
import BEMHelper from 'react-bem-helper';
import { PartnersList } from './PartnersList';
import { PartnerLogo10Blue } from '../../icons/PartnerLogo10Blue';

const classes = BEMHelper({
  name: 'acknowledgements',
  prefix: 'c-',
});

export const Partners = ({ partners = [], publicationType = {}, bottom = false }) => {
  return partners.length > 0 || publicationType._id === 'pubtype-3' ? (
    <div
      className={`c-acknowledgements c-partners ${
        bottom ? 'c-acknowledgements--bottom c-meta' : 'c-acknowledgements--side'
      }`}
    >
      {partners.length > 0 || publicationType._id === 'pubtype-3' ? (
        <div {...classes('item')}>
          {/* <h3 className="u-black-mid-headline">Partners</h3> */}
          {partners.length > 0 ? <PartnersList institutions={partners} /> : null}
          {publicationType._id === 'pubtype-3' && (
            <div className="">
              {/* <p>The U4 Helpdesk is operated by </p> */}
              <p className="c-partners__name">
                Transparency International
              </p>
              <div className="c-logo">
                <PartnerLogo10Blue />
              </div>
              <p className="c-partners__description u-body--small u-text--grey" >{description}</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  ) : null;
};
