import React from 'react';

export const PartnersList = ({ institutions = [] }) => (
  <div className="c-partners-list">
    {institutions &&
      institutions
        .filter(inst => inst)
        .map(inst => (inst.target ? inst.target : inst))
        .map(({ _id, description = '', institution = {} }, index) => (
          <div key={_id + index} className="c-partners-list__item">
            <p>
              {description}
              {institution && institution.name ? ` ${institution.name}` : ''}
            </p>
            {institution.logo && institution.logo.asset ? (
              <img src={institution.logo.asset.url} alt={institution.name} className="c-logo"/>
            ) : null}
          </div>
        ))}
  </div>
);
