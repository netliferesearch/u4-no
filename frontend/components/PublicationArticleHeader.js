import React from 'react';
import { Link } from '../routes';
import randomKey from '../helpers/randomKey';
import { Download, ArrowRight } from './icons';

import { AuthorList, EditorList } from '../components/';

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
  <header className={`${className} c-article-header`}>
    {/* Wrap in standard grid width until we know better */}
    <div className="c-article-header__meta">
      {publicationType.title && `${publicationType.title} | `}
      {topics.map(({ title = '', _id = '' }) => (
        <a href className="c-article-header__link-item" key={_id}>
          {title}
        </a>
      ))}
    </div>
    <div>
      <h1 className="c-article-header__title">{title}</h1>
    </div>
    <div>
      <p className="c-article-header__subtitle">{subtitle}</p>
      <div className="c-article-header__meta">
        <p>
          {authors ? <div><AuthorList authors={authors} /><br /></div> : null}
          {editors.length ? <div><EditorList editors={editors} /><br /></div> : null}
          Bergen: U4 Anti-Corruption Resource Centre at Chr. Michelsen Institute (U4 Brief 2017:5)
        </p>
        <p>
          <a href="#1">Also available in Spanish</a>
        </p>
      </div>
      <Link route="/3">
        <a className="c-article-header__button">
          <div className="c-article-header__button-text">Read our short version</div>
          <div className="c-article-header__button-icon"><ArrowRight /></div>
        </a>
      </Link>
      <div className="c-article-header__meta c-article-header__download">
        <Link route="/2">
          <a className="c-article-header__download-text">
            <span>Download as PDF</span>
          </a>
        </Link>
        <Download className="c-article-header__download-icon" />
      </div>
    </div>
  </header>
);

export default PublicationArticleHeader;
