import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import ScrollableAnchor from 'react-scrollable-anchor';
import slugify from 'slugify';

import { PullQuote, Figure } from './';
import randomKey from '../helpers/randomKey';

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
      <ScrollableAnchor key={randomKey()} id={slugify(children[0], { lower: true })}>
        <h2 className="o-grid-container__item-standard">{children}</h2>
      </ScrollableAnchor>
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
      <blockquote key={randomKey()} className="o-grid-container__item-standard">
        {children}
      </blockquote>
    ),
  },
};

const customTypeHandlers = {
  image: ({ attributes }) => <Figure key={randomKey()} {...attributes} />,
  pullQuote: ({ attributes: { text } }) => <PullQuote key={randomKey()}>{text}</PullQuote>,
  nugget: ({ attributes: { text, title } }) => (
    <div key={randomKey()} className="c-article__nugget o-grid-container__item-wider">
      <h2 className="c-article__nugget-title">{title}</h2>
      <BlockContent blocks={text} />
    </div>
  ),
};

const ExtendedBlockContent = ({ content = [] }) => (
  <BlockContent
    blocks={content.filter(block => !['reference'].includes(block._type))}
    blockTypeHandlers={{ ...blockTypeHandlersOverride }}
    customTypeHandlers={customTypeHandlers}
  />);

export default ExtendedBlockContent;
