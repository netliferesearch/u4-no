import React, { useState, useRef, useEffect } from 'react';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import { ToggleBlock } from '../';
import { PartnersList } from './PartnersList';
import serializers from '../serializers';
import { PublicationNotifications, CopyToClipboardButton } from './';
import { TagsSection } from './TagsSection';
import findFootnotes from '../findFootnotes';
import footnoteSerializer from '../footnoteSerializer';
import { PartnerLogo10Blue } from '../icons/PartnerLogo10Blue';

const littlefootActivator = () => {
  const littlefoot = require('littlefoot').default;
  littlefoot();
};

const classes = BEMHelper({
  name: 'article-content',
  prefix: 'c-',
});

const PublicationContent = ({
  standfirst = '',
  lead = '',
  abstract = '',
  topics = [],
  className = '',
  publicationType = {},
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
      {lead || abstract ? (
        <div className="c-article c-article__lead">
          <p>{lead}</p>
          {/* Legacy publication abstracts come with html included
                so we go and render it out.
          */}
          {!lead && abstract && <div dangerouslySetInnerHTML={{ __html: abstract }} />}
        </div>
      ) : null}
      <PublicationNotifications
        headsUp={headsUp}
        updatedVersion={updatedVersion}
        date={date}
        publicationType={publicationType}
      />
      {(mainPoints.length > 0 || summary.length > 0) && (
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
      )}

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
      {/* {lead && abstract ? (
        <div {...classes('meta')}>
          <h3 className="u-black-mid-headline">Abstract</h3>
          <div {...classes('content')}>
            {typeof abstract === 'string' && <p>{abstract}</p>}
            {typeof abstract !== 'string' && (
              <BlockContent blocks={abstract} serializers={serializers} />
            )}
          </div>
        </div>
      ) : null} */}
      {partners.length > 0 || publicationType._id === 'pubtype-3' ? (
        <div {...classes('meta')}>
          <h3 className="u-black-mid-headline">Partners</h3>
          {partners.length > 0 ? <PartnersList institutions={partners} /> : null}
          {publicationType._id === 'pubtype-3' && (
            <div className="c-article-header__institution">
              <p>The U4 Helpdesk is operated by </p>
              <div className="c-logo">
                <PartnerLogo10Blue />
              </div>
            </div>
          )}
        </div>
      ) : null}
      {topics.length > 0 || keywords.length > 0 ? (
        <TagsSection topics={topics} keywords={keywords} />
      ) : null}
    </div>
  );
};

export default PublicationContent;
