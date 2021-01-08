import React, { useState } from 'react';
import BEMHelper from 'react-bem-helper';
import { ArrowRightSlim } from '../icons/ArrowRightSlim';
import buildTitleObjects from '../TableOfContents/buildTitleObjects';
import LongformArticle from './LongformArticle';
import PdfViewer from '../PdfViewer';
import { ReaderSidebar } from './ReaderSidebar';

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
    <div className="c-reader">
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
      {content.length > 0 && (
        <LongformArticle content={content} title={title} fontSize={FONT_SIZES[readingFontSize]} />
      )}
      {!content.length && legacypdf.asset && (
        <div className="c-article-v2 c-article-v2__pdf-viewer o-wrapper-section">
          <h1 className="title">{title}</h1>
          <PdfViewer file={{ url: legacypdf.asset.url }} />
        </div>
      )}
      <ReaderSidebar title={title} content={content} setReaderOpen={setReaderOpen} />
    </div>
  );
};
