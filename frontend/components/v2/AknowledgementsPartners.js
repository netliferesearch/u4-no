import React from 'react';
import BEMHelper from 'react-bem-helper';
import { PartnersList } from './PartnersList';
import { PartnerLogo10Blue } from '../icons/PartnerLogo10Blue';

const classes = BEMHelper({
  name: 'acknowledgements',
  prefix: 'c-',
});

export const AcknowledgementsPartners = ({ data }) => {
  const { publicationType = {}, acknowledgements = '', partners = [] } = data;

  return data ? (
    <div className="c-acknowledgements">
      {acknowledgements || partners.length > 0 || publicationType._id === 'pubtype-3' ? (
        <h3 className="u-headline--2">In collaboration with</h3>
      ) : null}
      {acknowledgements ? (
        <div {...classes('item')}>
          {/* <h3 className="u-black-mid-headline">Acknowledgements</h3> */}
          <div {...classes('content')}>
            {typeof acknowledgements === 'string' && <p>{acknowledgements}</p>}
            {typeof acknowledgements !== 'string' && (
              <BlockContent blocks={acknowledgements} serializers={serializers} />
            )}
          </div>
        </div>
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
