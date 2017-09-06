import React from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';

const Article = ({
  title = 'No title',
  subtitle = 'No subtitle',
  _updatedAt = 'No date',
  lead = 'No lead',
  content = []
}) => (
  <article className="o-wrapper">
    <header className="c-article-header o-wrapper--huge">
      <div className="o-layout">
        <div className="o-layout__item u-1/1">
          <div className="c-article-header__issue"><a href="#">U4 issue </a>| NRE</div>
        </div>
        <div className="o-layout__item u-1/1">
          <h1 className="c-article-header__title">{title}</h1>
          <p className="c-article-header__subtitle">{subtitle}</p>
        </div>
        <div className="o-layout__item u-1/1">
          <div className="c-article-header__byline">By <a href="#">Åse Gilje Østensen</a> & <a href="#">Mats Stridsman </a>
             | Bergen: Chr. Michelsen Institute (U4 Issue 2017:3)</div>
           <div className="c-article-header__photo-credit">Photography by <a href="#">Dani Deahl</a></div>
        </div>
        <div className="o-layout__item u-1/1">
          <p className="c-article-header__lead">{lead}</p>
        </div>
      </div>
    </header>
    <main>
      <div className="c-article o-wrapper--huge">
        <BlockContent blocks={content.filter(block => !['reference', 'pullQuote'].includes(block._type))}/>
      </div>
    </main>
  </article>
);

export default Article;
