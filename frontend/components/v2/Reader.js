import React, { useState } from 'react';
import BEMHelper from 'react-bem-helper';
import { ArrowRightSlim } from '../icons/ArrowRightSlim';
import buildTitleObjects from '../TableOfContents/buildTitleObjects';
import { Scrollchor } from 'react-scrollchor';
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

export const Reader = ({ title = '', content = [], setReaderOpen = false, legacypdf = {} }) => {
  const [readingFontSize, setReadingFontSize] = useState('medium'); // 'normal' | 'medium' | 'large'
  const FONT_SIZES = {
    normal: '16px',
    medium: '22px',
    large: '26px',
  };
  const titleObjects = buildTitleObjects(content);

  return (
    <div {...classes('fullscreen-article')}>
      <div className="sidebar">
        <a
          href=""
          onClick={e => {
            e.preventDefault();
            setReaderOpen(false);
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
        <div>
          <ul className="c-article-nav-list c-article-nav-list--2">
            <li className={`c-article-nav-list__item`}>
              <a href="#">References</a>
            </li>
            <li className={`c-article-nav-list__item`}>
              <a href="#">About the author</a>
            </li>
            <li className={`c-article-nav-list__item`}>
              <a href="#">Acknowledgements</a>
            </li>
            <li className={`c-article-nav-list__item`}>
              <a href="#">Methodology</a>
            </li>
            <li className={`c-article-nav-list__item`}>
              <a href="#">Notes</a>
            </li>
            <li className={`c-article-nav-list__item`}>
              <a href="#">Annex</a>
            </li>
          </ul>
        </div>
      </div>
      {content.length > 0 && (
        <LongformArticle content={content} title={title} fontSize={FONT_SIZES[readingFontSize]} />
      )}
      {!content.length && legacypdf.asset && (
        <div className="c-article-v2 c-article-v2__pdf-viewer o-wrapper-section">
          <h1 className="title">{title}</h1>
          <PdfViewer file={{ url: legacypdf.asset.url }} />
        </div>
      )}
    </div>
  );
};
