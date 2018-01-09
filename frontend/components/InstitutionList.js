import React from 'react';
import randomKey from '../helpers/randomKey';

const InstitutionList = ({ institutions = {} }) => (
  <p className="c-article-header__institution">
    {institutions &&
      institutions
        .filter(inst => inst)
        .map(inst => (inst.target ? inst.target : inst))
        .map(({ description = '', institution = {} }) => (
          <span key={randomKey()}>
            {description}
            {institution ? ` ${institution.name}` : ''}
            {institution.logo && institution.logo.asset && institution.logo.asset.url ? (
              <img src={institution.logo.asset.url} alt={institution.name} className="c-logo" />
            ) : (
              ''
            )}
          </span>
        ))}
  </p>
);

export default InstitutionList;
