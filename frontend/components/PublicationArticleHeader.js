import React from 'react';
import BEMHelper from 'react-bem-helper';
import { Link } from '../routes';
import languageName from '../helpers/languageName';
import bibliographicReference from '../helpers/bibliographicReference';
import buildUrl from '../helpers/buildUrl';
import { Download, ArrowRight, PartnerLogo10 } from './icons';
import { AuthorList, EditorList, InstitutionList } from '../components/';

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
}) => (
  <header {...classes('', null, className)}>
    {/* Wrap in standard grid width until we know better */}
    <div {...classes('meta')}>
      {publicationType.title && `${publicationType.title} | `}
      {topics
        .filter(value => Object.keys(value).length)
        .map(({ title = '', slug = {} }) => (
          <a
            href={buildUrl({ _type: 'topics', slug: slug.current ? slug.current : '' })}
            {...classes('link-item')}
          >
            {title}
          </a>
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
              <AuthorList authors={authors} />
              <br />
            </span>
          ) : null}
          {editors.length ? (
            <span>
              <EditorList
                editors={editors}
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
            {translations.map((item = {}, index) =>
                item.slug &&
                item.title && (
                  <span>
                    <a
                      {...classes('language')}
                      href={buildUrl({ _type: 'publication', slug: item.slug })}
                      title={item.title}
                    >
                      {languageName({ langcode: item.language })}
                    </a>
                    {index + 2 < translations.length && <span>, </span>}
                    {index + 2 === translations.length && <span> and </span>}
                  </span>
                ))}
          </p>
        )}

        {partners.length ? <InstitutionList institutions={partners} /> : null}
        {publicationType._id === 'pubtype-3' ? (
          <div className="c-article-header__institution">
            <p>The U4 Helpdesk is operated by </p>
            <div className="c-logo">
              <PartnerLogo10 />
            </div>
          </div>
        ) : null}
      </div>
      {summary.length > 0 && (
        <Link route="publication.shortVersion" params={{ slug: slug.current }}>
          <a {...classes('button')}>
            <div {...classes('button-text')}>Read our short version</div>
            <div {...classes('button-icon')}>
              <ArrowRight />
            </div>
          </a>
        </Link>
      )}
      {pdfFile.asset && (
        <div {...classes('meta', null, 'c-article-header__download')}>
          <a
            onClick={event =>
              logPDFPageView({ e: event, url: `/publications/${slug.current}.pdf` })
            }
            href={`/publications/${slug.current}.pdf`}
            {...classes('download-text')}
          >
            <span>Download as PDF</span>
            <Download {...classes('download-icon')} />
          </a>
        </div>
      )}
      {!pdfFile.asset && legacypdf.asset && (
        <div {...classes('meta', null, 'c-article-header__download')}>
          <a
            onClick={event =>
              logPDFPageView({ e: event, url: `/publications/${slug.current}.pdf` })
            }
            href={`/publications/${slug.current}.pdf`}
            {...classes('download-text')}
          >
            <span>Download PDF</span>
            <Download {...classes('download-icon')} />
          </a>
        </div>
      )}
    </div>
  </header>
);

export default PublicationArticleHeader;
