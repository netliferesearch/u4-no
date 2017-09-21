import React from 'react';

const PublicationArticleHeader = ({
  title = 'no title',
  subtitle = 'no subtitle',
  lead = 'no lead',
  className = '',
}) => (
  <header className={`${className} c-article-header`}>
    {/* Wrap in standard grid width until we know better */}
    <p>
      <a>U4 brief</a> | <a>Natural resources</a>
    </p>
    <div>
      <h1 className="c-article-header__title">{title}</h1>
    </div>
    <div>
      <p className="c-article-header__subtitle">{subtitle}</p>
      <div className="c-article-header__byline">
        By <a href="#">Åse Gilje Østensen</a> & <a href="#">Mats Stridsman </a>
        | Bergen: Chr. Michelsen Institute (U4 Issue 2017:3)
      </div>
      <div className="c-article-header__photo-credit">
        Photography by <a href="#">Dani Deahl</a>
      </div>
      <div className="c-article-header__summary-for-busy-people">
        <details>
          <summary>Read our summary for busy people</summary>
        </details>
      </div>
    </div>
  </header>
);

export default PublicationArticleHeader;
