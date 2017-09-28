import React from 'react';
import { Link } from '../routes';
import randomKey from '../helpers/randomKey'

const PublicationArticleHeader = ({
  title = 'no title',
  subtitle = 'no subtitle',
  lead = 'no lead',
  topics = [],
  className = '',
}) => (
  <header className={`${className} c-article-header`}>
    {/* Wrap in standard grid width until we know better */}
    <div className="c-article-header__meta c-article-header__meta-uppercase">
      U4 Brief  |{' '}
      {topics.map(({ title = '', _id = '' }) => (
        <a href key={_id}>
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
        <p>By <a href="#">Åse Gilje Østensen</a> & <a href="#">Mats Stridsman</a><br></br>
        Series Editor <a href="#">Kendra Dupuy</a><br></br>
        Bergen: U4 Anti-Corruption Resource Centre @ Chr. Michelsen Institute (U4 Brief 2017:5)</p>
      <p><a href="#">Also available in Spanish</a></p>
      </div>
        <Link route="/">
          <a className="c-article-header__button">
            <div className="c-article-header__button-text">Summary for busy people</div>
            <div className="c-article-header__button-icon">→</div>
          </a>
        </Link>
    </div>
  </header>
);

export default PublicationArticleHeader;
