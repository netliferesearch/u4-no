import React from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';

const Article = ({ title = 'No title', subtitle = 'No subtitle', _updatedAt = 'No date', lead = 'No lead', content = [] }) => (
  <article className="o-wrapper">
    <header className="c-article-header">
      <div className="o-layout">
        <div className="o-layout__item u-1/2">
          <section className="c-article-meta">
            <section className="c-article-meta__info">
              <p className="c-article-meta__issue">U4 issue | Jul 2017 | By Anthony Nownes - July 2017 – {_updatedAt} - Bergen: Chr. Michelsen Institute (U4 Issue 8-2017) – 28 minutes.</p>
            </section>
          </section>
        </div>
        <div className="o-layout__item u-1/1">
          <h1 className="c-article-header__title">{title}</h1>
          <p className="c-article-header__subtitle">{subtitle}</p>
        </div>
        <div className="o-layout__item u-1/3" />
        <div className="o-layout__item u-2/3">
          <p className="c-article-header__lead">{lead}</p>
        </div>
      </div>
    </header>
    <main>
      <div className="o-wrapper--huge">
        <BlockContent blocks={content.filter(block => !['reference', 'pullQuote'].includes(block._type))} />
      </div>
    </main>
  </article>
);

export default Article;
