import React from 'react';
import { Link } from '../routes';
import randomKey from '../helpers/randomKey';
import { Download } from './icons';

import { AuthorList } from '../components/';

const PublicationArticleHeader = ({
  title = 'no title',
  subtitle = 'no subtitle',
  lead = 'no lead',
  topics = [],
  className = '',
  publicationType = {},
  authors = [],
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
          <AuthorList authors={authors} />
          <br />
          Series editor <a href="#">Kendra Dupuy</a>
          <br />
          Bergen: U4 Anti-Corruption Resource Centre @ Chr. Michelsen Institute (U4 Brief 2017:5)
        </p>
        <p>
          <a href="#">Also available in Spanish</a>
        </p>
      </div>
      <Link route="/">
        <a className="c-article-header__button">
          <div className="c-article-header__button-text">Read our short version</div>
          <div className="c-article-header__button-icon">→</div>
        </a>
      </Link>
      <div>
        <Link route="/">
          <a className="c-article-header__meta c-article-header__download">
            <Download className="c-article-header__download-icon" />  Download as PDF
          </a>
        </Link>
      </div>
    </div>
  </header>
);

export default PublicationArticleHeader;
