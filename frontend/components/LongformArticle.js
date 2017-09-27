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
      <ol key={randomKey()} className="list-numbered c-longform-grid__standard ">
        {children}
      </ol>
    ),
    bullet: ({ children = [] }) => (
      <ul key={randomKey()} className="list-bullets c-longform-grid__standard ">
        {children}
      </ul>
    ),
    listItem: ({ children = [] }) => <li key={randomKey()}>{children}</li>,
  },
  textBlock: {
    normal: ({ children = [] }) => (
      <p key={randomKey()} className="c-longform-grid__standard ">
        {children}
      </p>
    ),
    h1: ({ children = [] }) => (
<<<<<<< HEAD
      <h1 key={randomKey()} className="o-grid-container__item-standard">
=======
      <h1
        key={randomKey()}
        className="c-longform-grid__standard "
      >
>>>>>>> new grid and styling on longform
        {children}
      </h1>
    ),
    h2: ({ children = [] }) => (
      <h2
        key={randomKey()}
        id={slugify(children[0], { lower: true })}
        className="c-longform-grid__standard"
      >
        {children}
      </h2>
    ),
    h3: ({ children = [] }) => (
<<<<<<< HEAD
      <h3
        key={randomKey()}
        id={slugify(children[0], { lower: true })}
        className="o-grid-container__item-standard"
      >
=======
      <h3 key={randomKey()} className="c-longform-grid__standard">
>>>>>>> new grid and styling on longform
        {children}
      </h3>
    ),
    h4: ({ children = [] }) => (
      <h4 key={randomKey()} className="c-longform-grid__standard ">
        {children}
      </h4>
    ),
    blockquote: ({ children = [] }) => (
      <blockquote key={randomKey()} className="c-longform-grid__large-right">
        {children}
      </blockquote>
    ),
  },
};

const customTypeHandlers = {
  image: ({ attributes }) => <Figure key={randomKey()} {...attributes} />,
  pullQuote: ({ attributes: { text } }) => (
    <div key={randomKey()} className="c-longform-grid__medium">
      <PullQuote>{text}</PullQuote>
    </div>
  ),
  nugget: ({ attributes: { text, title } }) => (
    <div key={randomKey()} className="c-article__nugget c-longform-grid__standard">
      <h2 className="c-article__nugget-title">{title}</h2>
      <BlockContent blocks={text} />
    </div>
  ),
};

<<<<<<< HEAD
const LongformArticle = ({ content = [] }) => (
  <main className="o-wrapper-inner c-article o-grid-container-sub-div">
    <BlockContent
      blocks={content.filter(block => !['reference'].includes(block._type))}
      blockTypeHandlers={{ ...blockTypeHandlersOverride }}
      customTypeHandlers={customTypeHandlers}
    />
  </main>
);
=======
const LongformArticle = ({ content = [] }) => {
  console.log('content', content);
  return (
    <main className="c-article c-longform-grid-sub-div">
      <BlockContent
        blocks={content.filter(block => !['reference'].includes(block._type))}
        blockTypeHandlers={{ ...blockTypeHandlersOverride }}
        customTypeHandlers={customTypeHandlers}
      />
    </main>
  );
};
>>>>>>> new grid and styling on longform

export default LongformArticle;
