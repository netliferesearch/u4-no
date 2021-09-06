import React from 'react';
import { Document, Page } from 'react-pdf/build/entry.noworker';
import { PUBLICATION } from '../../../helpers/constants';
import { getPostType } from '../../../helpers/getRouteByType';
import LinkToItem from '../LinkToItem';
import { PageIntro } from '../PageIntro';
import { ShareOpen } from '../social/ShareOpen';
import dateToString from '../../../helpers/dateToString';
import { Translations } from '../translations/Translations';

export const ArticleHeader = ({ data = {}, setReaderOpen = null }) => {
  const {
    _type = '',
    publicationType = {},
    title = '',
    subtitle = '',
    standfirst = '',
    slug = {},
    pdfFile = {},
    legacypdf = {},
    content = [],
    summary = [],
    language = {},
    translations = [],
    date = {},
    updatedVersion = false,
    _updatedAt = '',
  } = data;
  const pdfAsset = legacypdf && legacypdf.asset ? legacypdf.asset : pdfFile.asset;
  return (
    <header className="c-article-header">
      <div className="c-article-header__container">
        <div className="c-article-header__col">
          <PageIntro
            title={title}
            subtitle={subtitle}
            text={standfirst}
            contentType={
              _type === 'publication'
                ? PUBLICATION + ' | ' + publicationType.title
                : getPostType(data)
            }
            type="withBreadcrumb"
            single={true}
          />
          <div className="c-article-header__meta">
            {translations.length > 0 && (
              <Translations
                translations={translations}
                language={language}
                type={_type === 'publication' ? 'publication' : getRouteByType(data)}
                currentSlug={slug}
              />
            )}
            <div>
              {date ? (
                <span className="u-body--small u-text--grey">
                  {dateToString({ start: date.utc })}
                </span>
              ) : null}
              {updatedVersion ? (
                <span className="u-body--small u-text--grey">
                  Updated {dateToString({ start: updatedVersion.date.utc })}
                </span>
              ) : null}
            </div>
          </div>
          <div className="c-article-header__btn-row c-article-header__actions">
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
        </div>

        <div className="c-article-header__col">
          {(pdfFile.asset || legacypdf.asset) && (
            <div className="pdf-preview">
              <Document file={pdfFile.asset ? pdfFile.asset : legacypdf.asset}>
                <Page pageNumber={1} />
              </Document>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
