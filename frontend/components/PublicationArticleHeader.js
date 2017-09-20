import React from 'react';

const PublicationArticleHeader = ({
  title = 'no title',
  subtitle = 'no subtitle',
  lead = 'no lead',
  className = '',
}) => (
  <header className={`${className} c-article-header o-grid-container`}>
    {/* Wrap in standard grid width until we know better */}
    <p className="o-grid-container__item-standard">
      <a>U4 brief</a> | <a>Natural resources</a>
    </p>
    <div className="o-grid-container__item-standard">
      <h1 className="c-article-header__title">{title}</h1>
    </div>
    <div className="o-grid-container__item-standard">
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
      <div className="c-article-header__summary-for-busy-people">
        <details>
          <summary>Main points</summary>
          <ol>
            <li>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et facere nostrum itaque at
              blanditiis nesciunt rem optio eaque qui eligendi?
            </li>
            <li>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et facere nostrum itaque at
              blanditiis nesciunt rem optio eaque qui eligendi?
            </li>
            <li>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et facere nostrum itaque at
              blanditiis nesciunt rem optio eaque qui eligendi?
            </li>
          </ol>
        </details>
      </div>

      <div className="c-article-header__summary-for-busy-people">
        <details>
          <summary>Acknowledgements</summary>
          <ol />
        </details>
      </div>
      <div className="c-article-header__summary-for-busy-people">
        <details>
          <summary>Abstract</summary>
          <ol />
        </details>
      </div>
      <div className="c-article-header__summary-for-busy-people">
        <details>
          <summary>Share or download</summary>
          <ol />
        </details>
      </div>
      <div className="c-article-header__summary-for-busy-people">
        <details>
          <summary>Also available in Spanish</summary>
          <ol />
        </details>
      </div>
      <p className="c-article-header__lead">{lead}</p>
    </div>
  </header>
);

export default PublicationArticleHeader;
