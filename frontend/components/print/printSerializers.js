import BlockContent from '@sanity/block-content-to-react';
import dynamic from 'next/dynamic';
import React from 'react';
import BEMHelper from 'react-bem-helper';
import slugify from 'slugify';
import BarChart from '../BarChart';
import ChartPrint from '../ChartPrint';
import Figure from '../print/Figure';
import findFootnotes from '../findFootnotes';
import findLinks from '../findLinks';
import FunkyTable from '../FunkyTable';
import printFootnoteSerializer from './printFootnoteSerializer';
import { ArticlePullQuote } from '../general/pull-quote/ArticlePullQuote';
import Table from '../Table';
import { random } from 'lodash';
import VimeoVideo from '../VimeoVideo';

const LineChart = dynamic(() => import('../LineChart'));

const classes = BEMHelper({
  name: 'longform-grid',
  prefix: 'c-',
});

const getTextValue = (block = '') => {
  if (block.props && block.props.node && block.props.node.children) {
    return block.props.node.children.map(getTextValue).join(' ');
  }
  if (block.props && block.props.children) {
    return block.props.children.toString();
  }
  return block.toString();
};

const displayFootnoteContent = children => {
  const ignoredContent = /\*|\[[0-9]+\]/;
  return children &&
    children[0] &&
    children[0].props &&
    children[0].props.children &&
    !ignoredContent.test(children[0].props.children)
    ? children
    : '';
};

function printSerializers(blocks) {
  const footnotes = findFootnotes(blocks);
  const links = findLinks(blocks);

  return {
    types: {
      image: ({ node }) => <Figure {...node} />,
      pullQuote: ({ node: { text } }) => (
        <div {...classes('medium')}>
          <ArticlePullQuote>{text}</ArticlePullQuote>
        </div>
      ),
      nugget: ({ node: { text, title } }) => (
        <div {...classes('standard')}>
          <div {...classes('nugget')}>
            <h2 {...classes('nugget-title')}>{title}</h2>
            <BlockContent blocks={text} serializers={serializers} />
          </div>
        </div>
      ),
      funkyTable: ({ node: { display = 'table', rows = [], title = false } }) => {
        if (display === 'line') return <LineChart rows={rows} title={title} />;
        if (display === 'bar') return <BarChart rows={rows} title={title} />;
        return <FunkyTable rows={rows} title={title} />;
      },
      box: ({ node: { content = false } }) =>
        content && (
          <div className="c-longform-grid__standard c-textbox--longform">
            <BlockContent blocks={content} serializers={printSerializers(content)} />
          </div>
        ),
      table: ({ node }) => <Table {...node} />,
      chart: ({ node }) => <ChartPrint {...node} />,
      vimeo: ({ node }) => <></>, // TODO: print version of <VimeoVideo {...node} />
      pagebreak: props => <div className="c-pagebreak" />,
      block: ({ node, children }) => {
        const style = node.style || 'normal';

        // Heading?
        if (/^h\d/.test(style)) {
          const level = parseInt(style.slice(1), 10);
          const heading = children.map(getTextValue).join(' ');
          const id =
            typeof heading === 'string' && (level === 2 || level === 3)
              ? slugify(heading, { lower: true, remove: /[$*_+~.:()'"!:@]/g })
              : undefined;

          // if h2 and text starts with numbering (digit followed by . and space)
          if (style == 'h2' && /^\d+\.\ /.test(heading)) {
            // separate number and text
            const num_text = node.children[0].text ? node.children[0].text.split('.', 2) : false;

            if (num_text) {
              return (
                <h2 id={id} className={'c-longform-grid__standard has_numbering'}>
                  <span className="h2_numbering">{num_text[0]}</span>
                  {num_text[1].trim()} {children.slice(1)}
                </h2>
              );
            }
          }

          return React.createElement(
            style,
            { id, className: 'c-longform-grid__standard' },
            children
          );
        }

        if (style === 'blockquote') {
          return (
            <div {...classes('standard')}>
              <blockquote>{children}</blockquote>
            </div>
          );
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
      link: props => {
        if (props.mark.href) {
          if (props.mark.href.match(/#_ftn(\d+)/)) {
            return null;
          }
          if (props.mark.href.match(/#_ftnref(\d+)/)) {
            return null;
          }
          return (
            <React.Fragment>
              <a className="inlineLink" href={props.mark.href}>
                {props.children}
              </a>
            </React.Fragment>
          );
        }
        return null;
      },
      blockNote: ({ markKey = '', mark = {} }) => {
        if (!mark.content) return null;
        return (
          <React.Fragment>
            {markKey && (
              <BlockContent
                blocks={footnotes[markKey]}
                serializers={printFootnoteSerializer(markKey)}
              />
            )}
          </React.Fragment>
        );
      },
      footnote: ({ children, markKey = '' }) => (
        <React.Fragment>
          {displayFootnoteContent(children)}
          <React.Fragment>
            {markKey && (
              <BlockContent
                blocks={footnotes[markKey]}
                serializers={printFootnoteSerializer(markKey)}
              />
            )}
          </React.Fragment>
        </React.Fragment>
      ),
      sub: ({ children }) => {
        return <sub>{children}</sub>;
      },
    },
    text: props => {
      // replace non-breaking hyphen with html entity
      if (!props.children.trim()) return props.children.replaceAll('‑', '&#8209;');
      return <span>{props.children.replaceAll('‑', '&#8209;')}</span>;
    },
  };
}

export default printSerializers;
