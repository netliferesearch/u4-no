import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';

import { PullQuote, Figure } from './';
import randomKey from '../helpers/randomKey';

/**
 * Here we replace Sanity's react components for rendering basic things like
 * lists so that we can drop in our classnames
 * @type {Object}
 */
const blockTypeHandlersOverride = {
  listBlock: {
    number: ({ children = [] }) => (
      <ol key={randomKey()} className="list-numbered o-grid-container__item-standard">
        {children}
      </ol>
    ),
    bullet: ({ children = [] }) => (
      <ul key={randomKey()} className="list-bullets o-grid-container__item-standard">
        {children}
      </ul>
    ),
    listItem: ({ children = [] }) => <li key={randomKey()}>{children}</li>,
  },
  textBlock: {
    normal: ({ children = [] }) => (
      <p key={randomKey()} className="o-grid-container__item-standard">
        {children}
      </p>
    ),
    h2: ({ children = [] }) => (
      <h2 id={slugify(children[0], { lower: true })} className="o-grid-container__item-standard">
        {children}
      </h2>
    ),
    h3: ({ children = [] }) => (
      <h3 key={randomKey()} className="o-grid-container__item-standard">
        {children}
      </h3>
    ),
    h4: ({ children = [] }) => (
      <h4 key={randomKey()} className="o-grid-container__item-standard">
        {children}
      </h4>
    ),
    blockquote: ({ children = [] }) => (
      <blockquote key={randomKey()} className="o-grid-container__offset-right">
        <div className="quotation-mark">”</div>
        {children}
      </blockquote>
    ),
  },
};

const customTypeHandlers = {
  image: ({ attributes }) => <Figure key={randomKey()} {...attributes} />,
  pullQuote: ({ attributes: { text } }) => (
    <div key={randomKey()} className="o-grid-container__item-full">
      <PullQuote>{text}</PullQuote>
    </div>
  ),
  nugget: ({ attributes: { text, title } }) => (
    <div key={randomKey()} className="c-article__nugget o-grid-container__item-wider">
      <h2 className="c-article__nugget-title">{title}</h2>
      <BlockContent blocks={text} />
    </div>
  ),
};

const PublicationArticle = ({ content = [] }) => {
  console.log('content', content);
  return (
    <main className="o-wrapper-inner c-article o-grid-container-sub-div">
      <BlockContent
        blocks={content.filter(block => !['reference'].includes(block._type))}
        blockTypeHandlers={{ ...blockTypeHandlersOverride }}
        customTypeHandlers={customTypeHandlers}
      />
    </main>
  );
};

export default PublicationArticle;
