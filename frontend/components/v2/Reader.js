import React, { useState } from 'react';
import BEMHelper from 'react-bem-helper';
import buildTitleObjects from '../TableOfContents/buildTitleObjects';
import LongformArticle from './LongformArticle';
import PdfViewer from '../PdfViewer';
import { LongformArticleHeader } from './LongformArticleHeader';

const classes1 = BEMHelper({
  name: 'reader',
  prefix: 'c-',
});

export const Reader = ({ data, setReaderOpen = false, legacypdf = {} }) => {
  // const [readingFontSize, setReadingFontSize] = useState('medium'); // 'normal' | 'medium' | 'large'
  // const FONT_SIZES = {
  //   normal: '16px',
  //   medium: '22px',
  //   large: '26px',
  // };
  const { title = '', content = [] } = data;
  const titleObjects = buildTitleObjects(content);

  return (
    <div className="c-reader">
      <LongformArticleHeader data={data} setReaderOpen={setReaderOpen} />
      {content.length > 0 && (
        <div className="c-reader__main">
          <LongformArticle content={content} title={title} />
        </div>
      )}
      {!content.length && legacypdf.asset && (
        <div className="c-article-v2 c-article-v2__pdf-viewer o-wrapper-section">
          <PdfViewer file={{ url: legacypdf.asset.url }} />
        </div>
      )}
    </div>
  );
};
