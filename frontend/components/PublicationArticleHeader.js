import React from 'react';
import { Link } from '../routes';
import randomKey from '../helpers/randomKey';
import { Download, ArrowRight, PartnerLogo8 } from './icons';
import { AuthorList, EditorList, InstitutionList } from '../components/';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'article-header',
  prefix: 'c-',
});

function languageName(langcode) {
  const languageNames = {
    en_US: 'English',
    fr_FR: 'French',
    es_ES: 'Spanish',
    de_DE: 'German',
    pt_PT: 'Portuguese',
    ru_RU: 'Russian',
    uk_UA: 'Ukranian',
  };
  return languageNames[langcode] ? languageNames[langcode] : 'another language';
}

const PublicationArticleHeader = ({
  title = '',
  subtitle = '',
  lead = '',
  slug = {},
  topics = [],
  className = '',
  publicationType = {},
  authors = [],
  editors = [],
  summary = [],
  pdfFile = {},
  legacypdf = {},
  reference = '',
  translation = {},
  language = '',
  partners = [],
}) => (
  <header {...classes('', null, className)}>
    {/* Wrap in standard grid width until we know better */}
    <div {...classes('meta')}>
      {publicationType.title && `${publicationType.title} | `}
      {topics.map(({ _ref = '', target = {} }) => (
        <Link
          key={_ref}
          route="topic.entry"
          params={{ slug: target.slug ? target.slug.current : '' }}
        >
          <a {...classes('link-item')}>{target.title}</a>
        </Link>
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
              <EditorList editors={editors.map(({ target }) => target)} />
              <br />
            </span>
          ) : null}
          {reference}
        </p>
        {translation.language &&
          translation.language !== language && (
            <p>
              <Link route="publication.entry" params={{ slug: translation.slug.current }}>
                <a {...classes('language')}>
                  Also available in {languageName(translation.language)}
                </a>
              </Link>
            </p>
          )}
        {partners.length ? <InstitutionList institutions={partners} /> : null}
        {publicationType._id === 'pubtype-3' ? (
          <p>
            The U4 Helpdesk is operated by {' '}
            <div className="c-logo">
              <PartnerLogo8 />
            </div>
          </p>
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
          <a href={pdfFile.asset.url} {...classes('download-text')}>
            <span>Download as PDF</span>
            <Download {...classes('download-icon')} />
          </a>
        </div>
      )}
      {!pdfFile.asset &&
        legacypdf.asset && (
          <div {...classes('meta', null, 'c-article-header__download')}>
            <a href={legacypdf.asset.url} {...classes('download-text')}>
              <span>Download PDF</span>
              <Download {...classes('download-icon')} />
            </a>
          </div>
        )}
    </div>
  </header>
);

export default PublicationArticleHeader;
