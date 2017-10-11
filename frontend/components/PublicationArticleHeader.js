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
          <AuthorList authors={authors} />
        </p>
        <p>
          {editors.length > 0 && (
            <span>
              Series editor{editors.length > 1 ? 's' : ''}{' '}
              {editors.map(({ firstName, surname }) => (
                <a href>
                  {firstName} {surname}{' '}
                </a>
              ))}
            </span>
          )}
        </p>
        <p>
          Bergen: U4 Anti-Corruption Resource Centre @ Chr. Michelsen Institute (U4 Brief 2017:5)
        </p>
        <p>
          <a href="#1">Also available in Spanish</a>
        </p>
      </div>
      <Link route="/3">
        <a className="c-article-header__button">
          <div className="c-article-header__button-text">Read our short version</div>
          <div className="c-article-header__button-icon">→</div>
        </a>
      </Link>
      <div>
        <Link route="/2">
          <a className="c-article-header__meta c-article-header__download">
            <Download className="c-article-header__download-icon" /> Download as PDF
          </a>
        </Link>
      </div>
    </div>
  </header>
);

export default PublicationArticleHeader;
