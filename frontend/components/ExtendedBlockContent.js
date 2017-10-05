import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';

import { PullQuote, Figure } from './';

const serializers = {
  types: {
    image: ({ node }) => <Figure {...node} />,
    pullQuote: ({ node: { text } }) => (
      <div className="c-longform-grid__medium">
        <PullQuote>{text}</PullQuote>
      </div>
    ),
    nugget: ({ node: { text, title } }) => (
      <div className="c-article__nugget o-grid-container__item-wider">
        <h2 className="c-article__nugget-title">{title}</h2>
        <BlockContent blocks={text} />
      </div>
    ),
    block: ({ node, children }) => {
      const style = node.style || 'normal';

      // Heading?
      if (/^h\d/.test(style)) {
        const level = parseInt(style.slice(1), 10);
        const id = level === 2 || level === 3
          ? slugify(children[0], { lower: true })
          : undefined;

        return React.createElement(
          style,
          { id, className: 'o-grid-container__item-standard' },
          children,
        );
      }

      if (style === 'blockquote') {
        return (
          <blockquote className="o-grid-container__item-standard">
            {children}
          </blockquote>
        );
      }

      return (
        <p className="o-grid-container__item-standard">
          {children}
        </p>
      );
    },
  },

  list: ({ type, children }) => {
    if (type === 'bullet') {
      return (
        <ul className="list-bullets o-grid-container__item-standard">
          {children}
        </ul>
      );
    }

    return (
      <ol className="list-numbered o-grid-container__item-standard">
        {children}
      </ol>
    );
  },
};

const ExtendedBlockContent = ({ content = [] }) => {
  const blocks = content.filter(block => !['reference'].includes(block._type));

  if (!blocks.length) {
    return null;
  }

  return (
    <BlockContent
      blocks={blocks}
      serializers={serializers}
    />
  );
};

export default ExtendedBlockContent;
