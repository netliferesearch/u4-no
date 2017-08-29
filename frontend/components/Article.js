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
      <h1 className="c-article-header__title">{title}
        <span className="c-article-header__subtitle">{subtitle}</span>
      </h1>
    </header>
    <p className="description">U4 issue | Jul 2017</p>
    <p className="byline">By Anthony Nownes - July 2017</p>
    <p>{_updatedAt}</p>
    <p className="byline">Bergen: Chr. Michelsen Institute (U4 Issue 8-2017) 28 p.</p>
    <p className="c-lead">{lead}</p>
    <BlockContent blocks={content}/>
  </article>
);

export default Article;
