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
        <div className="o-layout__item u-1/2">
          <section className="c-article-meta">
            <section className="c-article-meta__info">
              <p className="c-article-meta__issue"><a href="#">U4 issue </a>| NRE</p>
            </section>
          </section>
        </div>
        <div className="o-layout__item u-1/1">
          <h1 className="c-article-header__title">{title}</h1>
          <p className="c-article-header__subtitle">{subtitle}</p>
        </div>
        <div className="o-layout__item u-1/1">
          <p className="">By <a href="#">Åse Gilje Østensen</a> & <a href="#">Mats Stridsman</a>
            | Bergen: Chr. Michelsen Institute (U4 Issue 2017:3)</p>
          <p>Photography by <a href="#">Dani Deahl</a></p>
        </div>

        <div className="o-layout__item u-1/3"/>
        <div className="o-layout__item u-1/1">
          <p className="c-article-header__lead">{lead}</p>
        </div>
      </div>
    </header>
    <main>
      <div className="o-wrapper--huge">
        <BlockContent blocks={content.filter(block => !['reference', 'pullQuote'].includes(block._type))}/>
      </div>
    </main>
  </article>
);

export default Article;
