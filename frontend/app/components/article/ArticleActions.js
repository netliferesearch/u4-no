import React from 'react';
import LinkToItem from 'components/general/LinkToItem';
import { ShareOpen } from 'components/general/social/ShareOpen';
import Link from 'next/link';

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
  const pdfAsset = legacypdf?.asset ? legacypdf.asset : pdfFile?.asset;
  return (
    <div className="c-article__btn-row c-article__actions">
      {content && _type === 'publication' ? (
        <Link href={`/publications/${slug.current}/fullversion`} >
        <button
          className="c-btn c-btn--primary"
        >
          Read online
        </button>
        </Link>
      ) : null}
      {pdfAsset && content && (
        <Link
          href={`/publications/${slug.current}.pdf`}
          //download={`/publication/${slug.current}.pdf`}
          target="_blank"
          className="c-btn c-btn--secondary"
        >
          <span>Download PDF</span>
        </Link>
      )}

      {!content && legacypdf?.asset &&
        <Link
          href={`/publications/${slug.current}.pdf`}
          //download={`/publication/${slug.current}.pdf`}
          target="_blank"
          className="c-btn c-btn--primary"
        >
          <span>Read online</span>
        </Link>
      }
      {!content && legacypdf?.asset &&
        <Link
          href={`/publications/${slug.current}.pdf`}
          download={`/publication/${slug.current}.pdf`}
          target="_blank"
          className="c-btn c-btn--secondary"
        >
          <span>Download PDF</span>
        </Link>
      }

      {summary && (
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