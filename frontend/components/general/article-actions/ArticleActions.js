import React from 'react';
import LinkToItem from '../LinkToItem';
import { ShareOpen } from '../social/ShareOpen';

export const ArticleActions = ({ data = {}, setReaderOpen = null }) => {
  const {
    _type = '',
    title = '',
    slug = {},
    pdfFile = {},
    legacypdf = {},
    content = [],
    summary = [],
  } = data;
  const pdfAsset = legacypdf && legacypdf.asset ? legacypdf.asset : pdfFile.asset;
  return (
    <div className="c-article__btn-row c-article__btn-row">
      {content.length > 0 && _type === 'publication' ? (
        <button
          className="c-btn c-btn--primary"
          onClick={() => {
            setReaderOpen(true);
            if (typeof window !== 'undefined') {
              window.scrollTo(0, 0);
            }
          }}
        >
          Read online
        </button>
      ) : null}
      {pdfAsset && content.length > 0 && (
        <a
          href={`/publications/${slug.current}.pdf`}
          //download={`/publication/${slug.current}.pdf`}
          target="_blank"
          className="c-btn c-btn--secondary"
        >
          <span>Download PDF</span>
        </a>
      )}

      {!content.length && legacypdf && legacypdf.asset ? (
        <a
          href={`/publications/${slug.current}.pdf`}
          //download={`/publication/${slug.current}.pdf`}
          target="_blank"
          className="c-btn c-btn--secondary"
        >
          <span>Read online</span>
        </a>
      ) : null}
      {!content.length && legacypdf.asset ? (
        <a
          href={`/publications/${slug.current}.pdf`}
          download={`/publication/${slug.current}.pdf`}
          target="_blank"
          className="c-btn c-btn--5"
        >
          <span>Download PDF</span>
        </a>
      ) : null}

      {summary.length > 0 && (
        <LinkToItem type="shortVersionPublication" slug={slug.current}>
          <a className="c-btn c-btn--secondary">
            <span>Read short version</span>
          </a>
        </LinkToItem>
      )}

      <ShareOpen text={title} />
    </div>
  );
};
