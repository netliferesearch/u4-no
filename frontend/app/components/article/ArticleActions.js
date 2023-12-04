import React from 'react';
import LinkToItem from 'components/general/LinkToItem';
import { ShareOpen } from 'components/general/social/ShareOpen';
import Link from 'next/link';

export const ArticleActions = ({ data = {}, setReaderOpen = null }) => {
  const {
    _type = '',
    title = '',
    slug = '',
    pdfFile = {},
    legacypdf = {},
    hasContent = false,
    hasSummary = false,
  } = data;
  const pdfAsset = legacypdf?.asset ? legacypdf.asset : pdfFile?.asset;
  return (
    <div className="c-article__btn-row c-article__actions">
      {hasContent && _type === 'publication' && (
        <Link href={`/publications/${slug}/fullversion`} >
        <button
          className="c-btn c-btn--primary"
        >
          Read online
        </button>
        </Link>
      )}
      {pdfAsset && hasContent && (
        <Link
          href={`/publications/${slug}.pdf`}
          //download={`/publication/${slug}.pdf`}
          target="_blank"
          className="c-btn c-btn--secondary"
        >
          <span>Download PDF</span>
        </Link>
      )}

      {!hasContent && legacypdf?.asset &&
        <Link
          href={`/publications/${slug}.pdf`}
          //download={`/publication/${slug}.pdf`}
          target="_blank"
          className="c-btn c-btn--primary"
        >
          <span>Read online</span>
        </Link>
      }
      {!hasContent && legacypdf?.asset &&
        <Link
          href={`/publications/${slug}.pdf`}
          download={`/publication/${slug}.pdf`}
          target="_blank"
          className="c-btn c-btn--secondary"
        >
          <span>Download PDF</span>
        </Link>
      }

      {hasSummary && (
        <LinkToItem type="shortVersionPublication" slug={slug}>
          <a className="c-btn c-btn--secondary">
            <span>Read short version</span>
          </a>
        </LinkToItem>
      )}

      <ShareOpen text={title} />
    </div>
  );
};