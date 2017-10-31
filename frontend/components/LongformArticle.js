import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';
import { PullQuote, Figure } from './';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'longform-grid',
  prefix: 'c-',
});

/**
 * Here we replace Sanity's react components for rendering basic things like
 * lists so that we can drop in our classnames
 * @type {Object}
 */
const serializers = {
  types: {
    image: ({ node }) => <Figure {...node} />,
    pullQuote: ({ node: { text } }) => (
      <div {...classes('medium')}>
        <PullQuote>{text}</PullQuote>
      </div>
    ),
    nugget: ({ node: { text, title } }) => (
      <div {...classes('standard')}>
        <div {...classes('nugget')}>
          <h2 {...classes('nugget-title')}>{title}</h2>
          <BlockContent blocks={text} />
        </div>
      </div>
    ),
    funkyTable: ({ node: { rows = [], title = false} }) => (
      <div className="c-longform-grid__standard">
        <div className="c-table-container">
          {title && <h2 className="c-table-container__heading">{title}</h2>}
          <table className="c-table">
            <tbody className="c-table__body">
              {
                rows.map((row, index) => (
                  <tr key={index} classNAme="c-table__row">
                    { row.columns.map((col, index) => (
                      <td key={index} className="c-table__cell">{col}</td>
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
        return <div {...classes('large-right')}><blockquote>{children}</blockquote></div>;
      }

      return <p {...classes('standard')}>{children}</p>;
    },
  },

  list: ({ type, children }) => {
    if (type === 'bullet') {
      return <ul {...classes('standard', null, 'list-bullets')}>{children}</ul>;
    }

    return <ol {...classes('standard', null, 'list-numbered')}>{children}</ol>;
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
