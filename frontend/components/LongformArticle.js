import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';

import { PullQuote, Figure } from './';

/**
 * Here we replace Sanity's react components for rendering basic things like
 * lists so that we can drop in our classnames
 * @type {Object}
 */
const serializers = {
  types: {
    image: ({ node }) => <Figure {...node} />,
    pullQuote: ({ node: { text } }) => (
      <div className="c-longform-grid__medium">
        <PullQuote>{text}</PullQuote>
      </div>
    ),
    nugget: ({ node: { text, title } }) => (
      <div className="c-longform-grid__standard">
        <div className="c-article__nugget">
          <h2 className="c-article__nugget-title">{title}</h2>
          <BlockContent blocks={text} />
        </div>
      </div>
    ),
    funkyTable: ({ node: { grid = [], title = false} }) => (
      <div className="c-longform-grid__standard">
        <div className="c-table-container">
          {title && <h2 className="c-table-container__heading">{title}</h2>}
          <table className="c-table">
            <tbody className="c-table__body">
              {
                grid.map(row => (
                  <tr classNAme="c-table__row">
                    { row.values.map(col => (
                      <td className="c-table__cell">{col}</td>
                    ))}
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    ),
    block: ({ node, children }) => {
      const style = node.style || 'normal';

      // Heading?
      if (/^h\d/.test(style)) {
        const level = parseInt(style.slice(1), 10);
        const id = level === 2 || level === 3 ? slugify(children[0], { lower: true }) : undefined;

        return React.createElement(style, { id, className: 'c-longform-grid__standard' }, children);
      }

      if (style === 'blockquote') {
        return <div className="c-longform-grid__large-right"><blockquote>{children}</blockquote></div>;
      }

      return <p className="c-longform-grid__standard ">{children}</p>;
    },
  },

  list: ({ type, children }) => {
    if (type === 'bullet') {
      return <ul className="list-bullets c-longform-grid__standard ">{children}</ul>;
    }

    return <ol className="list-numbered c-longform-grid__standard ">{children}</ol>;
  },
};

const LongformArticle = ({ content = [] }) => {
  const blocks = content.filter(block => !['reference'].includes(block._type));
  return (
    <main
      className={`c-article ${blocks.length === 1 ? 'c-longform-grid' : 'c-longform-grid-sub-div'}`}
    >
      <BlockContent blocks={blocks} serializers={serializers} />
    </main>
  );
};

export default LongformArticle;
