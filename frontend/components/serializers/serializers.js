import { createElement } from 'react';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import slugify from 'slugify';
import buildUrl from '../../helpers/buildUrl';
import BarChart from '../BarChart';
import ArrowRight from '../icons/ArrowRight';
import { PersonBasic } from '../PersonBasic';
import { TextImage } from '../general/text-image/TextImage';
import dynamic from 'next/dynamic';
import BoxOnBox from '../BoxOnBox';
import BoxOnBoxTopics from '../BoxOnBoxTopics';
//import BoxOnImage from '../BoxOnImage';
import Feature from '../general/feature/Feature';
import Figure from '../Figure';
const Mosaic = dynamic(() => import('../Mosaic'));
const SimpleMosaic = dynamic(() => import('../SimpleMosaic'));
const WorkshopMosaic = dynamic(() => import('../WorkshopMosaic'));
import { ArticlePullQuote } from '../general/pull-quote/ArticlePullQuote';
//import SimpleMosaic from '../SimpleMosaic';
import Table from '../Table';
//import WorkshopMosaic from '../WorkshopMosaic';
import { SimpleTextBox } from '../general/textbox/SimpleTextBox';
import VimeoVideo from '../VimeoVideo';
import PdfEmbed from '../pdfEmbed/PdfEmbed';
const FunkyTable = dynamic(() => import('../FunkyTable'));
const LineChart = dynamic(() => import('../LineChart'));
const Chart = dynamic(() => import('../Chart'));

const classes = BEMHelper({
  name: 'longform-grid',
  prefix: 'c-',
});

const getTextValue = (block = '') => {
  if (block.props && block.props.node && block.props.node.children) {
    return block.props.node.children.map(getTextValue).join(' ');
  }
  return block.toString();
};

const displayFootnoteContent = children => {
  const ignoredContent = /\*|\[[0-9]+\]|[0-9]+/;
  return children && children[0] && !ignoredContent.test(children[0]) ? children : '';
};

const serializers = {
  types: {
    image: ({ node }) => <Figure {...node} />,
    pullQuote: ({ node: { text } }) => (
      <div {...classes('standard')}>
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
    heading: ({ node: { headingValue = '' } }) => (
      <h2
        id={slugify(headingValue, { lower: true, remove: /[$*_+~.()'"!\-:@]/g })}
        className="u-primary-heading"
      >
        {headingValue}
      </h2>
    ),
    cta: ({ node: { ctaValue = '', ctaURL = '' } }) => (
      <h2 className="c-topic-section__cta">
        <a href={ctaURL}>
          {ctaValue} &nbsp;
          <ArrowRight />
        </a>
      </h2>
    ),
    box: ({ node: { content = false } }) =>
      content && (
        <div className="c-longform-grid__standard">
          <SimpleTextBox content={content} />
        </div>
      ),

    textBlock: ({ node: { text = false } }) =>
      text && (
        <div className="o-wrapper-inner c-text-block">
          <BlockContent blocks={text} serializers={serializers} />
        </div>
      ),

    oneColumn: ({ node: { text = false, colorScheme = 'darkOnWhite' } }) =>
      text && (
        <div className={`c-oneColumnBox c-oneColumnBox__${colorScheme}`}>
          <div className="o-wrapper-inner u-margin-top u-margin-bottom-large">
            <BlockContent blocks={text} serializers={serializers} />
          </div>
        </div>
      ),

    twoColumns: ({ node: { textLeft, textRight } }) => (
      <div className="c-columns c-columns--two">
        <div className="c-columns__item c-columns--two__item">
          <BlockContent blocks={textLeft} serializers={serializers} />
        </div>
        <div className="c-columns__item c-columns--two__item">
          <BlockContent blocks={textRight} serializers={serializers} />
        </div>
      </div>
    ),
    boxOnBoxRef: ({ node: { textLeft, textRight } }) => (
      <section className="c-topic-section">
        <BoxOnBox left={textLeft} right={textRight} />
      </section>
    ),
    boxOnBoxTopics: ({ node: { textLeft, textRight } }) => (
      <section className="c-topic-section">
        <BoxOnBoxTopics left={textLeft} right={textRight} />
      </section>
    ),
    HelpdeskTeam: ({ node: { headingLeft, headingRight, personLeft, personRight } }) => (
      <div className="o-wrapper-inner c-team">
        <div className="c-columns c-columns--two">
          {personLeft ? (
            <div className="c-columns__item c-columns--two__item">
              {headingLeft && (
                <div>
                  <h3 className="u-primary-heading">Course application enquires</h3>
                  <h3 className="u-primary-heading">{headingLeft}</h3>
                </div>
              )}
              {personLeft
                .map(person => (person.target ? person.target : person))
                .map(person => (
                  <PersonBasic key={person._id} person={person} />
                ))}
            </div>
          ) : null}
          {personRight && (
            <div className="c-columns__item c-columns--two__item c-columns__item--narrow">
              {headingRight && (
                <div>
                  <h3 className="u-primary-heading">General questions</h3>
                  <h3 className="u-primary-heading">{headingRight}</h3>
                </div>
              )}
              {personRight
                .map(person => (person.target ? person.target : person))
                .map(person => (
                  <PersonBasic key={person._id} person={person} />
                ))}
            </div>
          )}
        </div>
      </div>
    ),
    boxOnImageRef: ({ node: { block, img } }) => (
      <section className="o-wrapper-inner">
        <TextImage text={block} image={img} />
      </section>
    ),
    workshops: ({ node: { workshopsRef } }) => (
      <div className="o-wrapper">
        <WorkshopMosaic resources={workshopsRef} />
      </div>
    ),
    expertAnswers: ({ node: { expertAnswersRef } }) => (
      <div className="o-wrapper u-margin-top u-margin-bottom-huge">
        <Mosaic resources={expertAnswersRef} />
      </div>
    ),
    resources: ({ node: { resourcesRef } }) => (
      <div className="o-wrapper u-margin-top u-margin-bottom-huge">
        <Mosaic resources={resourcesRef} />
      </div>
    ),
    assets: ({ node: { assetsRef } }) => (
      <div className="o-wrapper u-margin-top u-margin-bottom-huge">
        <Mosaic resources={assetsRef} />
      </div>
    ),
    mosaic: ({ node: { itemsRef } }) => (
      <div className="o-wrapper u-margin-top u-margin-bottom-huge">
        <Mosaic resources={itemsRef} />
      </div>
    ),
    courses: ({ node: { coursesRef } }) => (
      <div className="o-wrapper">
        <SimpleMosaic resources={coursesRef} cta="Register" />
      </div>
    ),
    vimeo: ({ node }) => <VimeoVideo {...node} />,
    pdfEmbed: ({ node }) => <PdfEmbed {...node} />,
    workshops: ({ node: { workshopsRef } }) => (
      <div className="o-wrapper">
        <WorkshopMosaic resources={workshopsRef} />
      </div>
    ),
    table: ({ node }) => <Table {...node} />,
    chart: ({ node }) => <Chart {...node} />,
    features: ({ node: { featureArray } }) => (
      <div className="c-feature-list c-feature-list--small">
        {featureArray.map(item => (
          <div className="c-feature-list__item" key={item._key}>
            <Feature text={item.featureText} iconUrl={item.image.asset.url} />
          </div>
        ))}
      </div>
    ),
    pagebreak: props => <div className="c-pagebreak" />,
    block: props => {
      const { node, children = [] } = props;
      const style = node.style || 'normal';
      // Heading?
      if (/^h\d/.test(style)) {
        const level = parseInt(style.slice(1), 10);
        const heading = children.map(getTextValue).join(' ');
        const id =
          typeof heading === 'string' && (level === 2 || level === 3)
            ? slugify(heading, { lower: true, remove: /[$*_+~.:()'"!:@]/g })
            : undefined;
        return createElement(style, { id, className: 'c-longform-grid__standard' }, children);
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
    internalReferance: props => {
      const { children = [], mark: { target: { slug = '', _type = '' } = {} } = {} } = props;
      return <a href={buildUrl({ _type, slug: slug.current })}>{children}</a>;
    },
    link: props => {
      if (props.mark.href) {
        if (props.mark.href.match(/#_ftn(\d+)/)) {
          const ref = props.mark.href.match(/#_ftn(\d+)/)[1];
          return (
            <sup id={`fnref:${ref}`}>
              <a href={`#fn:${ref}`} rel="footnote">
                {ref}
              </a>
            </sup>
          );
        }
        if (props.mark.href.match(/#_ftnref(\d+)/)) {
          const ref = props.mark.href.match(/#_ftnref(\d+)/)[1];
          return (
            <li className="c-footnote__item" id={`fn:${ref}`}>
              {props.children}
              <a href={`#fnref:${ref}`} title="return to article">
                {' '}
                ↩
              </a>
            </li>
          );
        }

        return <a href={props.mark.href}>{props.children}</a>;
      }
      return null;
    },
    blockNote: ({ children, markKey = '', mark = {} }) => {
      if (!mark.content) return <span />;
      return (
        <span>
          {displayFootnoteContent(children)}
          <span id={`fnref:${markKey}`}>
            <a href={`#fn:${markKey}`} rel="footnote">
              {markKey}
            </a>
          </span>
        </span>
      );
    },
    footnote: ({ children, mark = {}, markKey = '' }) => {
      if (!mark.content) return <span />;
      return (
        <span>
          {displayFootnoteContent(children)}
          <span id={`fnref:${markKey}`}>
            <a href={`#fn:${markKey}`} rel="footnote">
              {markKey}
            </a>
          </span>
        </span>
      );
    },
    sub: ({ children }) => {
      return <sub>{children}</sub>;
    },
  },
};

export default serializers;
