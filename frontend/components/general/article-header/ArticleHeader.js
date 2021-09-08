import React from 'react';
import { Document, Page } from 'react-pdf/build/entry.noworker';
import { PUBLICATION } from '../../../helpers/constants';
import { getPostType } from '../../../helpers/getRouteByType';
import { PageIntro } from '../PageIntro';
import dateToString from '../../../helpers/dateToString';
import { Translations } from '../translations/Translations';
import { ArticleActions } from '../article-actions/ArticleActions';

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
          <ArticleActions data={data} setReaderOpen={setReaderOpen} />
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
