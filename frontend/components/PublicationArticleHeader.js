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
  topics = [],
  className = '',
  publicationType = {},
  authors = [],
  editors = [],
}) => (
  <header {...classes('', null, className)}>
    {/* Wrap in standard grid width until we know better */}
    <div {...classes('meta')}>
      {publicationType.title && `${publicationType.title} | `}
      {topics.map(({ title = '', _id = '' }) => (
        <a href {...classes('link-item')} key={_id}>
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
          Bergen: U4 Anti-Corruption Resource Centre at Chr. Michelsen Institute (U4 Brief 2017:5)
        </p>
        <p>
          <a href="#1">Also available in Spanish</a>
        </p>
      </div>
      <Link route="/3">
        <a {...classes('button')}>
          <div {...classes('button-text')}>Read our short version</div>
          <div {...classes('button-icon')}>
            <ArrowRight />
          </div>
        </a>
      </Link>
      <div {...classes('meta', null, 'c-article-header__download')}>
        <Link route="/2">
          <a {...classes('download-text')}>
            <span>Download as PDF</span>
          </a>
        </Link>
        <Download {...classes('download-icon')} />
      </div>
    </div>
  </header>
);

export default PublicationArticleHeader;
