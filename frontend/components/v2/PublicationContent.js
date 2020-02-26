import React, { useState, useRef, useEffect } from 'react';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import { PartnerLogo10 } from '../icons';
import { InstitutionList } from '../';
import serializers from '../serializers';
import { PublicationNotifications, CopyToClipboardButton } from './';

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

  return (
    <div {...classes('', null, className)}>
      {lead && (
        <div className="c-article">
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
      <h3>Tags</h3>
      <div {...classes('meta')}>
        {topics.length && (
          <div className="meta-row">
            <span className="tag-label">TOPICS</span>
            {topics
              .filter(value => Object.keys(value).length)
              .map(({ title = '', slug = {} }) => (
                <span className="topic">{title}</span>
              ))}
          </div>
        )}
        {keywords.filter(keyword => keyword.target._type === 'country').length ? (
          <div className="meta-row">
            <span className="tag-label">REGIONS</span>
            <div className="keywords">
              {keywords
                .filter(keyword => keyword.target._type === 'country')
                .map(({ keyword = '' }) => (
                  <span>{keyword}</span>
                ))}
            </div>
          </div>
        ) : null}
        {keywords.filter(keyword => keyword.target._type !== 'country').length ? (
          <div className="meta-row">
            <span className="tag-label">KEYWORDS</span>
            <div className="keywords">
              {keywords
                .filter(keyword => keyword.target._type !== 'country')
                .map((keyword = {}) => (
                  <span className="keyword">{keyword.target.keyword}</span>
                ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PublicationContent;
