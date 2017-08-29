import React from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';

const Article = ({
  title = "No title",
  subtitle = "No subtitle",
  _updatedAt = "No date",
  lead = "No lead",
  content = []
}) => (
  <article>
    <header className="c-article-header">
      <p className="c-article-header__issue">U4 issue | Jul 2017</p>
      <h1 className="c-article-header__title">{title}</h1>
      <p className="c-article-header__subtitle">{subtitle}</p>
      <section className="c-article-header__info">
        <p>By Anthony Nownes - July 2017</p>
        <p>{_updatedAt}</p>
        <p>Bergen: Chr. Michelsen Institute (U4 Issue 8-2017) 28 p.</p>
      </section>
      <p className="c-article-header__lead">{lead}</p>
    </header>
    <main>
      <BlockContent blocks={content}/>
    </main>
  </article>
);

export default Article;
