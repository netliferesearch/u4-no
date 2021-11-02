import React from 'react';
import Link from 'next/link';
import BEMHelper from 'react-bem-helper';

import Person from './Person';
import ArrowRight from '../icons/ArrowRight';
import Helpdesk from '../icons/Helpdesk';
import OnlineTraining from '../icons/OnlineTraining';
import Workshops from '../icons/Workshops';
import Download from '../icons/Download';

const classes = BEMHelper({
  name: 'partner-promo',
  prefix: 'c-',
});

const PartnerPromo = ({
  title = {
    __html: '<span>Are you U4 partner staff?<br />Take advantage of exclusive U4 services.</span>',
  },
  imageUrl = 'https://cdn.sanity.io/images/1f1lcoov/production/09ede1f209d57acaaa02feae00f49a0111b36e1b-1642x726.jpg',
}) => (
  <section {...classes('')}>
    <h2 {...classes('title')} dangerouslySetInnerHTML={title} />

    <section className="c-boxOnImage c-boxOnImage--smaller">
      <div className="c-boxOnImage__body c-boxOnImage__body--smaller">
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
                Our team can help bring momentum to processes. We gather different actors for
                informed discussions.
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
      <figure className="c-boxOnImage__figure c-boxOnImage__figure--smaller">
        <img
          alt=""
          src={`${imageUrl}?auto=format&w=1600&h=400&fit=crop&crop=focalpoint`}
          srcSet={`${imageUrl}?auto=format&w=500&q=70 500w, ${imageUrl}?auto=format&w=800&q=75 800w, ${imageUrl}?auto=format&w=1600&q=80 1600w, ${imageUrl}?auto=format&w=2400&q=80 2400w`}
          sizes="90vw"
          loading="lazy"
        />
      </figure>
    </section>
    <h2 className="c-topic-section__cta u-margin-top-huge">
      <Link href="/u4-partner-agencies">
        <a>
          See all our partners &nbsp;
          <ArrowRight />
        </a>
      </Link>
    </h2>
  </section>
);

export default PartnerPromo;
