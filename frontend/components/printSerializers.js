import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import FunkyTable from './FunkyTable';
import LineChart from './LineChart';
import BarChart from './BarChart';

const classes = BEMHelper({
  name: 'longform-grid',
  prefix: 'c-',
});

import slugify from 'slugify';
import { PullQuote, Figure } from './';

export default {
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
    funkyTable: ({ node: { display = 'table', rows = [], title = false } }) => {
      if (display === 'line') return <LineChart rows={rows} title={title} />;
      if (display === 'bar') return <BarChart rows={rows} title={title} />;
      return <FunkyTable rows={rows} title={title} />;
    },
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
  marks: {
    internalReferance: props => <a href={props.mark.href}>{props.children}</a>,
    link: (props) => {
      if (props.mark.href) {
        if (props.mark.href.match(/#_ftn(\d+)/)) {
          const ref = props.mark.href.match(/#_ftn(\d+)/)[1];
          return (<span className="fn" id={`fnref:${ref}`}>
            This is a footnote!
          </span>);
        }
        if (props.mark.href.match(/#_ftnref(\d+)/)) {
          const ref = props.mark.href.match(/#_ftnref(\d+)/)[1];
          return (<li className="c-footnote__item" id={`fn:${ref}`}>
            {props.children}<a href={`#fnref:${ref}`} title="return to article"> ↩</a>
          </li>);
        }
        return <span>{props.children}<span className="fn"><a href={props.mark.href}></a></span></span>;
      }

      console.log(props.mark);

      return null;
    },
    footnote: (props) => {
      console.log('footnote', props);
      return <span className="fn">{props.children}</span>;
    },
  },
};
