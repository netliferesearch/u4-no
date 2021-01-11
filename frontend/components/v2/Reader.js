import React from 'react';
import LongformArticle from './LongformArticle';
import PdfViewer from '../PdfViewer';
import { LongformArticleHeader } from './LongformArticleHeader';
import { PublicationSidebar } from './PublicationSidebar';

export const Reader = ({ data, setReaderOpen = false, legacypdf = {} }) => {
  const { title = '', content = [] } = data;

  return (
    <div className="c-reader">
      <LongformArticleHeader data={data} setReaderOpen={setReaderOpen} />
      {content.length > 0 && (
        <main className="c-reader__main o-wrapper-section c-article__row">
          <div className="c-article__side c-article__col">
            <PublicationSidebar data={data} side={'left'} />
          </div>
          <div className="c-article__center c-article__col">
            <LongformArticle content={content} title={title} />
          </div>
          <div className="c-article__side c-article__col">
            <div className="c-article-sidebar" />
          </div>
        </main>
      )}
      {!content.length && legacypdf.asset && (
        <div className="c-article-v2 c-article-v2__pdf-viewer o-wrapper-section">
          <PdfViewer file={{ url: legacypdf.asset.url }} />
        </div>
      )}
    </div>
  );
};
