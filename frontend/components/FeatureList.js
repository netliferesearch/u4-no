import React from 'react';
import { SectionIntro } from './SectionIntro';
import Feature from './Feature';
import { OnlineTrainingIcon } from './icons/OnlineTrainingIcon';
import { WorkshopEventsIcon } from './icons/WorkshopEventsIcon';
import { HelpdeskForPartners } from './icons/HelpdeskForPartners';
//import useMediaQuery from '../../helpers/useMediaQuery';

export const FeatureList = ({ features = [], alt = false }) => {
  return (
    <div className="c-feature--list o-wrapper-full-width">
      <div className="o-wrapper-medium c-feature-main-box">
        <h4 className="u-secondary-heading u-secondary-h1 u-text--white u-detail--blue c-feature-title">
          Become a partner
        </h4>
        <div className=" c-feature-list">
          {/* <div className="c-feature-list__item">
            <OnlineTrainingIcon />
            <h2 className="u-secondary-h2 u-text--white">Online training</h2>
            <p className="u-body u-text--grey c-topic-paragraph">
              We offer dynamic and time-efficient online courses. Be confident with anti-corruption
              initiatives in your work.
            </p>
          </div>
          <div className="c-feature-list__item">
            <WorkshopEventsIcon />
            <h2 className="u-secondary-h2 u-text--white">Workshop events</h2>
            <p className="u-body u-text--grey c-topic-paragraph">
              Our team can help bring momentum to processes. We gather different actors for informed
              discussions
            </p>
          </div>
          <div className="c-feature-list__item">
            <HelpdeskForPartners />
            <h2 className="u-secondary-h2 u-text--white">Helpdesk for partners</h2>
            <p className="u-body u-text--grey c-topic-paragraph">
              Send in your corruption-related questions about development programmes, sectors or
              countries. A free research service.
            </p>
          </div> */}

          {features.map((feature) => (
            <div className="c-feature-list__item" key={feature._key}>
              {console.log(feature)}
              <Feature
                title={feature.image.title}
                text={feature.featureText}
                iconUrl={feature.image}
              />
            </div>
          ))}
        </div>
        <button className="c-partner-btn">Become a partner</button>
      </div>
    </div>
  );
};
