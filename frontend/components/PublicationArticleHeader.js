import React from 'react';
import { Link } from '../routes';
import randomKey from '../helpers/randomKey';
import { Download, ArrowRight } from './icons';
import { AuthorList, EditorList } from '../components/';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'article-header',
  prefix: 'c-',
});

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
  shortVersion = [],
  pdfFile = {},
  legacypdf = {},
  reference = '',
}) => (
  <header {...classes('', null, className)}>
    {/* Wrap in standard grid width until we know better */}
    <div {...classes('meta')}>
      {publicationType.title && `${publicationType.title} | `}
      {topics.map(({ title = '', _id = '', slug = '' }) => (
        <Link key={_id} route="topic.entry" params={{ slug: slug.current }}>
          <a {...classes('link-item')}>{title}</a>
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
          {authors ? (
            <span>
              <AuthorList authors={authors} />
              <br />
            </span>
          ) : null}
          {editors.length ? (
            <span>
              <EditorList editors={editors} />
              <br />
            </span>
          ) : null}
          {reference}
        </p>
        <p>
          <a {...classes('language')} href="#1">
            Also available in Spanish
          </a>
        </p>
      </div>
      {shortVersion.length > 0 && (
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
      {legacypdf.asset && (
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
