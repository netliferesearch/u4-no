import React, { useState } from 'react';
import BEMHelper from 'react-bem-helper';
import { ArrowRightSlim } from '../icons/ArrowRightSlim';
import buildTitleObjects from '../TableOfContents/buildTitleObjects';
import Scrollchor from 'react-scrollchor';
import LongformArticle from './LongformArticle';
import { ShareOnSocialMedia } from './ShareOnSocialMedia';
import PdfViewer from '../PdfViewer';

const classes = BEMHelper({
  name: 'article-header-v2',
  prefix: 'c-',
});

const classes1 = BEMHelper({
  name: 'reader',
  prefix: 'c-',
});

export const Reader = ({ title = '', content = [], setReading = false, legacypdf = {} }) => {
  const [readingFontSize, setReadingFontSize] = useState('normal'); // 'normal' | 'medium' | 'large'
  const FONT_SIZES = {
    normal: '16px',
    medium: '22px',
    large: '26px',
  };
  const titleObjects = buildTitleObjects(content);

  return (
    <div {...classes('fullscreen-article')} style={{ fontSize: FONT_SIZES[readingFontSize] }}>
      <div className="sidebar">
        <a
          href=""
          onClick={e => {
            e.preventDefault();
            setReading(false);
          }}
          {...classes1('back-button')}
        >
          <span className="u-reverse-arrow">
            <ArrowRightSlim />
          </span>
          Exit publication
        </a>
        <div className="socials">
          <ShareOnSocialMedia title={title} />
          {content.length > 0 && (
            <div className="fonts">
              <button
                className={`normal${readingFontSize === 'normal' ? ' active' : ''}`}
                onClick={() => setReadingFontSize('normal')}
              >
                A
              </button>
              <button
                className={`medium${readingFontSize === 'medium' ? ' active' : ''}`}
                onClick={() => setReadingFontSize('medium')}
              >
                A
              </button>
              <button
                className={`large${readingFontSize === 'large' ? ' active' : ''}`}
                onClick={() => setReadingFontSize('large')}
              >
                A
              </button>
            </div>
          )}
        </div>
        {titleObjects.length ? (
          <div>
            <ul className="c-article-nav-list">
              <li key="top" className={`c-article-nav-list__item`}>
                <Scrollchor to="#js-top" disableHistory>
                  Top
                </Scrollchor>
              </li>
              {titleObjects.map(titleObject => {
                const { title, id, children = [] } = titleObject;
                return (
                  <li key={id} className={`c-article-nav-list__item`}>
                    <Scrollchor to={`#${id}`} disableHistory>
                      {title}
                    </Scrollchor>
                    {titleObject.selected && (
                      <ul className="c-article-nav-list c-article-nav-list--inner">
                        {children.map(({ title, id }) => (
                          <li key={id} className={`c-article-nav-list__item`}>
                            <Scrollchor to={`#${id}`} disableHistory>
                              {title}
                            </Scrollchor>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
              <li key="bottom" className="c-article-nav-list__item">
                <Scrollchor to="#js-bottom" disableHistory>
                  Bottom
                </Scrollchor>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
      {content && <LongformArticle content={content} title={title} />}
      {legacypdf.asset && <PdfViewer file={{ url: legacypdf.asset.url }} />}
    </div>
  );
};
