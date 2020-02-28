import React, { useState, useRef, useEffect } from 'react';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import { PartnerLogo10 } from '../icons';
import { InstitutionList } from '../';
import serializers from '../serializers';
import { PublicationNotifications, CopyToClipboardButton } from './';
import { TagsSection } from './TagsSection';
import findFootnotes from '../findFootnotes';
import footnoteSerializer from '../footnoteSerializer';

const littlefootActivator = () => {
  const littlefoot = require('littlefoot').default;
  littlefoot();
};

const classes = BEMHelper({
  name: 'article-content',
  prefix: 'c-',
});

const PublicationContent = ({
  lead = '',
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
}) => {
  const [activeTab, setActiveTab] = useState('main-points');
  const mainPointsRef = useRef(null);
  const blocks = summary.filter(block => !['reference'].includes(block._type));
  const footnotes = findFootnotes(blocks);
  const footNotesKeys = Object.keys(footnotes);

  useEffect(() => littlefootActivator(), []);

  return (
    <div {...classes('', null, className)}>
      {lead && (
        <div className="c-article c-article__lead">
          <p>{lead}</p>
        </div>
      )}
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
            <div
              className={`tab-header${activeTab === 'summary' ? ' active' : ''}`}
              onClick={() => setActiveTab('summary')}
            >
              Summary
            </div>
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

      <div {...classes('meta')}>
        {partners.length > 0 ? <InstitutionList institutions={partners} /> : null}
        {publicationType._id === 'pubtype-3' && (
          <div className="c-article-header__institution">
            <p>The U4 Helpdesk is operated by </p>
            <div className="c-logo">
              <PartnerLogo10 />
            </div>
          </div>
        )}
      </div>
      {topics || keywords ? <TagsSection topics={topics} keywords={keywords} /> : null}
    </div>
  );
};

export default PublicationContent;
