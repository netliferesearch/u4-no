import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../serializers/serializers';
import { Acknowledgements } from './Aknowledgements';
import { Partners } from '../general/partners/Partners';
import { PhotoCaptionCredit } from '../general/PhotoCaptionCredit';

export const AdditionalInfo = ({ data, shortversion = false }) => {
  const {
    acknowledgements = [],
    methodology = [],
    notes = '',
    featuredImage = {},
    partners = [],
    publicationType = '',
  } = data;

  return (
    <section id="additional-info" className="u-bg--lighter-blue c-article__additional-content">
      <div className="o-wrapper-medium">
        <div className="o-wrapper-narrow">
          <Acknowledgements acknowledgements={acknowledgements} bottom={true} />
          <Partners partners={partners} publicationType={publicationType} />
          {/* {!shortversion && methodology && methodology.length > 0 ? (
              <ToggleBlock title="Methodology" content={methodology} />
            ) : null} */}
          {!shortversion && methodology && methodology.length > 0 ? (
            <div className="c-meta">
              <div className="c-meta__title">
                <h4 className="u-secondary-heading u-secondary-h3">Methodology</h4>
              </div>
              <hr className="u-section-underline--dark-grey" />
              <div className="c-meta__content">
                {typeof methodology === 'string' && <p className="u-body--small">{methodology}</p>}
                {typeof methodology !== 'string' && (
                  <BlockContent blocks={methodology} serializers={serializers} />
                )}
              </div>
            </div>
          ) : null}
          {!shortversion && notes ? (
            <div className="c-meta">
              <hr className="u-section-underline--no-margins" />
              <div className="c-meta__title">
                <h4 className="u-secondary-heading u-secondary-h3">Notes</h4>
              </div>
              <hr className="u-section-underline--dark-grey" />
              <div className="c-meta__content">
                {typeof notes === 'string' && <p className="u-body--small">{notes}</p>}
                {typeof notes !== 'string' && (
                  <BlockContent blocks={notes} serializers={serializers} />
                )}
                {featuredImage.caption && (
                  <div className="c-credit__caption">
                    <p>
                      <b>Header image:</b>
                    </p>
                    <BlockToContent
                      blocks={featuredImage.caption}
                      serializers={{
                        types: {
                          block: props => <p style={{ display: 'inline' }}>{props.children}</p>,
                        },
                      }}
                    />
                  </div>
                )}
                <PhotoCaptionCredit featuredImage={featuredImage} showCaption={false} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
