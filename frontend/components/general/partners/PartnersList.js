import React from 'react';
import sanityImageLoader from 'helpers/sanityImageLoader';

export const PartnersList = ({ institutions = [] }) => (
  <div className="c-partners-list">
    {institutions &&
      institutions
        .filter(inst => inst)
        .map(inst => (inst.target ? inst.target : inst))
        .map(({ _id, description = '', institution = {} }, index) => (
          <div key={_id + index} className="c-partners-list__item">
            {institution?.name && <p className="c-partners__name">{institution.name}</p>}            
            
            {institution?.logo?.asset &&
              <img src={sanityImageLoader({src: institution.logo.asset.url, width: 250})} alt={institution.name} className="c-logo"/>
            }
            <p className="c-partners__description u-body--small u-text--grey" >{description}</p>
          </div>
        ))}
  </div>
);
