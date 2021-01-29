import React, { useState, useRef, useEffect } from 'react';
import BEMHelper from 'react-bem-helper';
import { PublicationNotifications } from './';
import findFootnotes from '../findFootnotes';

const littlefootActivator = () => {
  const littlefoot = require('littlefoot').default;
  littlefoot();
};

const classes = BEMHelper({
  name: 'article__content',
  prefix: 'c-',
});

const PublicationContent = ({
  standfirst = '',
  lead = '',
  abstract = '',
  topics = [],
  className = '',
  publicationType = {},
  authors = [],
  summary = [],
  partners = [],
  mainPoints = [],
  headsUp = false,
  updatedVersion = false,
  date = {},
  keywords = [],
  references = [],
  acknowledgements = '',
  methodology = [],
  notes = '',
  featuredImage = {},
}) => {
  const [activeTab, setActiveTab] = useState('main-points');
  const mainPointsRef = useRef(null);
  const blocks = summary.filter(block => !['reference'].includes(block._type));
  const footnotes = findFootnotes(blocks);
  const footNotesKeys = Object.keys(footnotes);

  useEffect(() => littlefootActivator(), []);

  return (
    <div {...classes('', null, className)}>
      <PublicationNotifications
        headsUp={headsUp}
        updatedVersion={updatedVersion}
        date={date}
        publicationType={publicationType}
      />

      {lead || abstract ? (
        <div className="c-article c-article__lead u-drop-cap">
          <p>{lead}</p>
          {/* Legacy publication abstracts come with html included
                so we go and render it out.
          */}
          {!lead && abstract && <div className="c-article__lead--abstract" dangerouslySetInnerHTML={{ __html: abstract }} />}
        </div>
      ) : null}

      {mainPoints.length > 0 && (
        <div className="publication-preview">
          <h3 className="u-heading--2">Main points</h3>
          <ul className="c-article_mainPoints-list">
            {mainPoints.map((mainPoint, index) => (
              <li key={index} className="c-article_mainPoints-item">
                <span className="c-article_mainPoints-firstWords">
                  {mainPoint
                    .split(' ')
                    .slice(0, 3)
                    .join(' ')}{' '}
                </span>
                <span className="c-article_mainPoints-lastWords">
                  {mainPoint
                    .split(' ')
                    .slice(3)
                    .join(' ')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* {(mainPoints.length > 0 || summary.length > 0) && (
        <div className="publication-preview">
          <div className="tabs">
            {mainPoints.length > 0 && (
              <div
                className={`tab-header${activeTab === 'main-points' ? ' active' : ''}`}
                onClick={() => setActiveTab('main-points')}
              >
                Main points
              </div>
            )}
            {summary.length > 0 && (
              <div
                className={`tab-header${activeTab === 'summary' ? ' active' : ''}`}
                onClick={() => setActiveTab('summary')}
              >
                Summary
              </div>
            )}
          </div>
          {mainPoints.length > 0 && (
            <div className={`tab${activeTab === 'main-points' ? ' active' : ''}`}>
              <ul className="c-article_mainPoints-list" ref={mainPointsRef}>
                {mainPoints.map((mainPoint, index) => (
                  <li key={index} className="c-article_mainPoints-item">
                    <span className="c-article_mainPoints-firstWords">
                      {mainPoint
                        .split(' ')
                        .slice(0, 3)
                        .join(' ')}{' '}
                    </span>
                    <span className="c-article_mainPoints-lastWords">
                      {mainPoint
                        .split(' ')
                        .slice(3)
                        .join(' ')}
                    </span>
                  </li>
                ))}
              </ul>
              <CopyToClipboardButton reference={mainPointsRef} />
            </div>
          )}

          {summary.length > 0 && (
            <div className={`tab${activeTab === 'summary' ? ' active' : ''}`}>
              <BlockContent blocks={summary} serializers={serializers} />
              <div className="footnotes">
                <ol>
                  {footNotesKeys.map(key => (
                    <div key={key}>
                      <BlockContent blocks={footnotes[key]} serializers={footnoteSerializer(key)} />
                    </div>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      )} */}

      {/* {methodology.length > 0 ? (
        <div {...classes('meta')}>
          <h3 className="u-black-mid-headline">Methodology</h3>
          <div {...classes('content')}>
            {typeof methodology === 'string' && <p>{methodology}</p>}
            {typeof methodology !== 'string' && (
              <BlockContent blocks={methodology} serializers={serializers} />
            )}
          </div>
        </div>
      ) : null} */}
      {/* {references.length > 0 ? (
        <div {...classes('meta')}>
          <h3 className="u-black-mid-headline">References</h3>
          <div {...classes('content')}>
            {typeof references === 'string' && <p>{references}</p>}
            {typeof references !== 'string' && (
              <BlockContent blocks={references} serializers={serializers} />
            )}
          </div>
        </div>
      ) : null} */}
      {/* {acknowledgements ? (
        <div {...classes('meta')}>
          <h3 className="u-black-mid-headline">Acknowledgements</h3>
          <div {...classes('content')}>
            {typeof acknowledgements === 'string' && <p>{acknowledgements}</p>}
            {typeof acknowledgements !== 'string' && (
              <BlockContent blocks={acknowledgements} serializers={serializers} />
            )}
          </div>
        </div>
      ) : null} */}
      {/* {notes ? (
        <div {...classes('meta')}>
          <h3 className="u-black-mid-headline">Notes</h3>
          <div {...classes('content')}>
            {typeof notes === 'string' && <p>{notes}</p>}
            {typeof notes !== 'string' && (
              <BlockContent blocks={notes} serializers={serializers}>
                {featuredImage.caption && (
                  <div className="c-longform-grid__standard">
                    <p>
                      <b>Header image:</b>
                    </p>
                    <BlockToContent
                      blocks={featuredImage.caption}
                      serializers={{
                        types: {
                          block: props => <p style={{ display: 'inline' }}>{children}</p>,
                        },
                      }}
                    />
                  </div>
                )}
              </BlockContent>
            )}
            <div className="c-longform-grid__standard">
              {!featuredImage.sourceUrl && featuredImage.credit && (
                <span>Photo: {featuredImage.credit} </span>
              )}

              {featuredImage.sourceUrl && (
                <span>
                  Photo:
                  <a className="u-margin-left-tiny" href={featuredImage.sourceUrl}>
                    {featuredImage.credit ? featuredImage.credit : featuredImage.sourceUrl}
                  </a>
                </span>
              )}
              {featuredImage.license && (
                <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                  {' '}
                  CC {featuredImage.license.toUpperCase()}
                </a>
              )}
            </div>
          </div>
        </div>
      ) : null} */}

    </div>
  );
};

export default PublicationContent;
