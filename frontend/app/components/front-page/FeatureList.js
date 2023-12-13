import React from 'react';
import Feature from './Feature';
import Link from 'next/link';

export const FeatureList = ({ features = [], alt = false }) => {
  return (
    <div className="c-features">
      <div className="c-features__content">
        <h4 className="u-secondary-heading u-secondary-h1 u-text--light-blue u-detail--blue--bright c-features__title">
          Become a partner
        </h4>
        <div className="c-feature-list">
          {features.map(feature => {
            const { _key, title = '', text = '', iconUrl = ''} = feature;
            return (
            <div className="c-feature-list__item" key={feature._key}>
              <Feature
                title={feature.image.title}
                text={feature.featureText}
                imageUrl={feature.image.url ? feature.image.url : ''}
              />
            </div>
          )})}
        </div>
        <Link href="https://www.u4.no/become-a-partner" legacyBehavior>
        <button className="c-btn c-btn--secondary c-btn--secondary--onDark">Become a partner</button>
        </Link>
      </div>
    </div>
  );
};
