import React from 'react';
import BEMHelper from 'react-bem-helper';
import Link from 'next/link';
import languageName from '../helpers/languageName';
import bibliographicReference from '../helpers/bibliographicReference';
import { translate, translateField, langCode } from '../helpers/translate';

import Download from './icons/Download';
import ArrowRight from './icons/ArrowRight';
import PartnerLogo10 from './icons/PartnerLogo10';

import AuthorList from './AuthorList';
import EditorList from './EditorList';
import InstitutionList from './InstitutionList';
import LinkToItem from './LinkToItem';

const classes = BEMHelper({
  name: 'article-header',
  prefix: 'c-',
});

// file downloads are not normally tracked by GA, thus we fire of a page view
// before downloading.

const logPDFPageView = ({ e, url }) => {
  e.preventDefault();
  if (window.ga) {
    return ga('send', {
      hitType: 'pageview',
      page: url,
      hitCallback: createFunctionWithTimeout({
        callback: () => {
          window.location.href = url;
        },
      }),
    });
  }
  window.location.href = url;
};

function createFunctionWithTimeout({ callback, opt_timeout = 1000 }) {
  let called = false;
  function fn() {
    if (!called) {
      called = true;
      callback();
    }
  }
  setTimeout(fn, opt_timeout);
  return fn;
}

const PublicationArticleHeader = ({
  title = '',
  subtitle = '',
  lead = '',
  slug = {},
  topics = [],
  className = '',
  publicationType = {},
  publicationNumber = '',
  authors = [],
  editors = [],
  summary = [],
  pdfFile = {},
  legacypdf = {},
  reference = '',
  translation = {},
  translations = {},
  language = '',
  partners = [],
}) => {
  const lang = langCode(language);
  const trans = translate(language);

  return (
    <header {...classes('', null, className)}>
      {/* Wrap in standard grid width until we know better */}
      <div {...classes('meta')}>
        {publicationType.title && `${publicationType.title}`}
        {topics.length > 0 && ' | '}
        {topics
          .filter(value => Object.keys(value).length)
          .map(({ title = '', slug = {} }) => (
            <LinkToItem
              _type="topics"
              slug={slug.current ? slug.current : slug}
              key={slug.current ? slug.current : ''}
            >
              <a {...classes('link-item')}>{title}</a>
            </LinkToItem>
          ))}
      </div>
      <div>
        <h1 {...classes('title')}>{title}</h1>
      </div>
      <div>
        <p {...classes('subtitle')}>{subtitle}</p>
        <div {...classes('meta')}>
          <p>
            {authors.length ? (
              <span>
                <AuthorList authors={authors} language={language} introkey="by" />
                <br />
              </span>
            ) : null}
            {editors.length ? (
              <span>
                <EditorList
                  editors={editors}
                  language={language}
                  pubType={publicationType._id}
                  introkey={publicationType._id === 'pubtype-3' ? 'reviewed_by' : 'series_editor'}
                  intro={publicationType._id === 'pubtype-3' ? 'Reviewed by' : 'Series editor'}
                  pluralize={publicationType._id !== 'pubtype-3'}
                />
                <br />
              </span>
            ) : null}
            {bibliographicReference({ publicationType, publicationNumber, reference })}
          </p>

          {translations.length > 0 && (
            <p>
              Also available in{' '}
              {translations.map(
                (item = {}, index) =>
                  item.slug &&
                  item.title && (
                    <LinkToItem _type="publication" slug={item.slug} key={item._id}>
                      <span>
                        <a {...classes('language')}>{languageName({ langcode: item.language })}</a>
                        {index + 2 < translations.length && <span>, </span>}
                        {index + 2 === translations.length && <span> and </span>}
                      </span>
                    </LinkToItem>
                  )
              )}
            </p>
          )}

          {partners.length > 0 ? <InstitutionList institutions={partners} /> : null}
          {publicationType._id === 'pubtype-3' && (
            <div className="c-article-header__institution">
              <p>The U4 Helpdesk is operated by </p>
              <div className="c-logo">
                <PartnerLogo10 />
              </div>
            </div>
          )}
        </div>
        {summary.length > 0 && (
          <LinkToItem _type="shortVersionPublication" slug={slug.current}>
            <a {...classes('button')}>
              <div {...classes('button-text')}>Read our short version</div>
              <div {...classes('button-icon')}>
                <ArrowRight />
              </div>
            </a>
          </LinkToItem>
        )}
        {pdfFile.asset && (
          <div {...classes('meta', null, 'c-article-header__download')}>
            <a href={`/publications/${slug.current}.pdf`} {...classes('download-text')}>
              <span>Download as PDF</span>
              <Download {...classes('download-icon')} />
            </a>
          </div>
        )}
        {!pdfFile.asset && legacypdf.asset && (
          <div {...classes('meta', null, 'c-article-header__download')}>
            <a href={`/publications/${slug.current}.pdf`} {...classes('download-text')}>
              <span>Download PDF</span>
              <Download {...classes('download-icon')} />
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicationArticleHeader;
