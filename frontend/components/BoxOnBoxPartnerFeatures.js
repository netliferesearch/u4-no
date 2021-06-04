import React from 'react';
import BEMHelper from 'react-bem-helper';
import OnlineTraining from './icons/Helpdesk';
import Workshops from './icons/Workshops';
import Helpdesk from './icons/OnlineTraining';

const classes = BEMHelper({
  name: 'boxOnBox-partner-features',
  prefix: 'c-',
});

const BoxOnBoxPartnerFeatures = () => (
  <div {...classes()}>
    <div {...classes('left')}>
      <p>Are you U4 partner staff? Take advantage of exclusive U4 services.</p>
    </div>
    <div {...classes('right')}>
      <a href="/online-courses">
        <div {...classes('statement')}>
          <OnlineTraining {...classes('statement-icon')} />
          <div {...classes('statement-bodywrapper')}>
            <h3 {...classes('statement-title')}>Online training</h3>
            <p {...classes('statement-body')}>
              Be confident with anti-corruption initiatives in your work. We offer dynamic and
              time-efficient online courses.
            </p>
          </div>
        </div>
      </a>
      <a href="/workshops-and-events">
        <div {...classes('statement')}>
          <Workshops {...classes('statement-icon')} />
          <div {...classes('statement-bodywrapper')}>
            <h3 {...classes('statement-title')}>Workshops and events</h3>
            <p {...classes('statement-body')}>
              Our team can help bring momentum to processes. We gather different actors for informed
              discussions.
            </p>
          </div>
        </div>
      </a>
      <a href="/helpdesk">
        <div {...classes('statement')}>
          <Helpdesk {...classes('statement-icon')} />
          <div {...classes('statement-bodywrapper')}>
            <h3 {...classes('statement-title')}>Helpdesk for partners</h3>
            <p {...classes('statement-body')}>
              Send in your corruption-related questions about development programmes, sectors, or
              countries. A free research service.
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
);

export default BoxOnBoxPartnerFeatures;
