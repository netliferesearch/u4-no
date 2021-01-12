import React from 'react';
import BEMHelper from 'react-bem-helper';
import { PartnersList } from './PartnersList';
import { PartnerLogo10Blue } from '../icons/PartnerLogo10Blue';

const classes = BEMHelper({
  name: 'acknowledgements',
  prefix: 'c-',
});

export const Partners = ({ data, bottom = false }) => {
  const { publicationType = {}, partners = [] } = data;

  return data ? (
    <div className={`c-acknowledgements c-partners ${bottom ? 'c-acknowledgements--bottom c-meta' : 'c-acknowledgements--side'}`}>
      {bottom ? <hr className="u-section-underline--no-margins" /> : null }
      {partners.length > 0 || publicationType._id === 'pubtype-3' ? (
        <h3 className="u-headline--2">In collaboration with</h3>
      ) : null}
      {partners.length > 0 || publicationType._id === 'pubtype-3' ? (
        <div {...classes('item')}>
          {/* <h3 className="u-black-mid-headline">Partners</h3> */}
          {partners.length > 0 ? <PartnersList institutions={partners} /> : null}
          {publicationType._id === 'pubtype-3' && (
            <div className="c-article-header__institution">
              {/* <p>The U4 Helpdesk is operated by </p> */}
              <div className="c-logo">
                <PartnerLogo10Blue />
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  ) : null;
};
