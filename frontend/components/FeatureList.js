import React from 'react';
import { SectionIntro } from './SectionIntro';
import Feature from './Feature';
//import useMediaQuery from '../../helpers/useMediaQuery';

export const FeatureList = ({ features = [], alt = false }) => {
  return (
    <div className="c-feature--list">
      <SectionIntro
        title="Take advantage of exclusive U4 services become a partner"
        text="Lorem ipsum ipsum lorem"
        slug="/u4-partner-agencies"
        label="Learn about becoming a partner"
      />
      <div className="c-feature-list">
        {/* {features.map(({ title = '', _id = '', _type = '' }) => (
          <Feature key={feature._key} title={feature.featureText} iconUrl={feature.image.asset.url}/>
        ))} */}
      </div>
    </div>
  );
};
