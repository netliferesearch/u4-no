import React from 'react';

import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'tnrc-footer',
  prefix: 'c-',
});

const TnrcFooter = ({ publicationTypeId = '' }) => {
  return (
    publicationTypeId == '080dc28c-9d5e-4c14-972f-73f83a206b92' && (
      <div className="c-longform-grid">
        <div className="c-longform-grid__standard">
          <div {...classes('')}>
            <div {...classes('heading')}>
              <a
                href="https://www.worldwildlife.org/initiatives/targeting-natural-resource-corruption"
                target="_blank"
                title="Targeting Natural Resource Corruption"
              >
                <img src="/static/tnrc/TNRC.png" alt="Targeting Natural Resource Corruption" />
              </a>
            </div>
            <div {...classes('logos')}>
              <a
                style={{
                  width: '155px',
                  height: '100px',
                  backgroundImage: "url('/static/tnrc/USAID.png')",
                  backgroundSize: '100%',
                  backgroundPosition: '50% 50%',
                }}
                href="https://www.usaid.gov/biodiversity"
                title="USAID"
                target="_blank"
                rel="noopener"
              >
                &nbsp;
              </a>{' '}
              <a
                style={{
                  width: '105px',
                  height: '100px',
                  backgroundImage: "url('/static/tnrc/WWF.png')",
                  backgroundSize: '45%',
                  backgroundPosition: '70% 50%',
                }}
                href="https://www.worldwildlife.org"
                title="WWF"
                target="_blank"
                rel="noopener"
              >
                &nbsp;
              </a>{' '}
              <a
                style={{
                  width: '220px',
                  height: '100px',
                  backgroundImage: "url('/static/tnrc/CMI_U4.png')",
                  backgroundSize: '90%',
                  backgroundPosition: '50% 50%',
                }}
                href="https://www.u4.no/"
                title="CMI/U4"
                target="_blank"
                rel="noopener"
              >
                &nbsp;
              </a>{' '}
              <a
                style={{
                  width: '170px',
                  height: '100px',
                  backgroundImage: "url('/static/tnrc/traccc.jpg')",
                  backgroundSize: '88%',
                  backgroundPosition: '50% 50%',
                }}
                href="https://traccc.gmu.edu/"
                title="TRACC"
                target="_blank"
                rel="noopener"
              >
                &nbsp;
              </a>{' '}
              <a
                style={{
                  width: '155px',
                  height: '100px',
                  backgroundImage: "url('/static/tnrc/TRAFFIC.png')",
                  backgroundSize: '93%',
                  backgroundPosition: '50% 50%',
                }}
                href="https://www.traffic.org/"
                title="TRAFFIC"
                target="_blank"
                rel="noopener"
              >
                &nbsp;
              </a>
            </div>
            <p {...classes('body')}>
              This content is made possible by the generous support of the American people through
              the{' '}
              <a href="https://www.usaid.gov/biodiversity" target="_blank" rel="noopener">
                United States Agency for International Development
              </a>{' '}
              (USAID). The contents are the responsibility of World Wildlife Fund (WWF) and do not
              necessarily reflect the views of USAID, the United States Government, or individual
              TNRC consortium members.
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default TnrcFooter;
