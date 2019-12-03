import React from 'react';

import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'tnrc-header',
  prefix: 'c-',
});

const TnrcHeader = ({ publicationTypeId = '' }) => {
  return (
    publicationTypeId == '080dc28c-9d5e-4c14-972f-73f83a206b92' && (
      <section {...classes()}>
        <div {...classes('body')}>
          <p>
            This publication is part of the{' '}
            <a
              href="https://www.worldwildlife.org/initiatives/targeting-natural-resource-corruption"
              target="_blank"
              rel="noopener noreferrer"
              title="Targeting Natural Resource Corruption"
            >
              Targeting Natural Resource Corruption (TNRC)
            </a>{' '}
            project and produced with support from USAID.
          </p>
        </div>
        <div {...classes('logo')}>
          <a
            href="https://www.worldwildlife.org/pages/tnrc-targeting-natural-resource-corruption"
            target="_blank"
            title="Targeting Natural Resource Corruption"
          >
            <img src="/static/tnrc/TNRC.png" alt="Targeting Natural Resource Corruption" />
          </a>
        </div>
      </section>
    )
  );
};

export default TnrcHeader;
