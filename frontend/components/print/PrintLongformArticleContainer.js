import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../../helpers/redux-store';
import { PrintLongformArticle } from './';
import BEMHelper from 'react-bem-helper';
import {
  Footer,
  Layout,
  PublicationArticleHeader,
  TableOfContentsButton,
  TableOfContentsSidebar,
  TableOfContentsContent,
  CustomScrollSpy,
  ToggleBlock,
  PublicationDrawer,
  AuthorList,
  EditorList,

} from '../';

const classes = BEMHelper({
  name: 'print',
  prefix: 'c-',
});

const LongFormArticleContainer = (props) => {
  const {
    toggleArticleMenu,
    toggleLoadingScreen,
    isArticleMenuOpen,
    showLoadingScreen,
    lead = '',
    _type = '',
    longTitle = '',
    title = '',
    mainPoints = [],
    isPublicationDrawerOpen,
    resources = [],
    BreadCrumbComponent = null,
    subtitle = '',
    slug = {},
    topics = [],
    className = '',
    publicationType = {},
    authors = [],
    editors = [],
    shortVersion = [],
    pdfFile = {},
    legacypdf = {},
    reference = '',
  } = props;
  return (
    <article className="u-relative u-print-width o-wrapper-page">
      <div {...classes('front')}>
        <figure {...classes('front-image')}>
          {props.featuredImage.credit && (
            <figcaption>
              photo: {props.featuredImage.credit}
            </figcaption>)}
          <img src={props.featuredImage.asset.url} alt={props.featuredImage.credit} />
        </figure>
        <div {...classes('front-text')}>
          <div {...classes('meta')}>
            {publicationType.title && `${publicationType.title} | `}
            {topics.map(({ _ref = '', target = {} }) => (
              <p {...classes('meta-inline')}> {target.title} </p>
            ))}
          </div>
          <h1 {...classes('title')}>{title}</h1>
          <p {...classes('subtitle')}>{subtitle}</p>
          <div {...classes('meta')}>
            <p>
              {authors ? (
                <span>
                  <AuthorList authors={authors.map(({ target }) => target)} />
                  <br />
                </span>
              ) : null}
              {editors.length ? (
                <span>
                  <EditorList editors={editors.map(({ target }) => target)} />
                  <br />
                </span>
              ) : null}
              {reference}
            </p>
          </div>
        </div>
      </div>
      {_type === 'publication' && (
        <div className="c-longform-grid">
          <div className="c-longform-grid__standard">
            {lead && (
              <div className="c-article">
                <p>{lead}</p>
              </div>
            )}
            {mainPoints.length > 0 && (
              <div className="c-article c-article_mainPoints">
                <h2>Main points</h2>
                <ul className="c-article_mainPoints-list">
                  {mainPoints.map((mainPoint, index) => (
                    <li key={index} className="c-article_mainPoints-item">
                      <span className="c-article_mainPoints-firstWords">
                        {mainPoint
                          .split(' ')
                          .slice(0, 3)
                          .join(' ')}{' '}
                      </span>
                      <span className="c-article_mainPoints-lastWords">
                        {mainPoint
                          .split(' ')
                          .slice(3)
                          .join(' ')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {_type === 'publication' &&
              !isPublicationDrawerOpen && (
              <div className="c-longform-grid__sidebar-right">
                <TableOfContentsSidebar {...props} />
              </div>
            )}
        </div>
      )}
      {_type !== 'publication' && (
        <div className="c-longform-grid">
          <h1 className="c-longform-grid__standard">{longTitle || title}</h1>
          {lead && <div className="c-article c-longform-grid__standard">{lead}</div>}
          <div className="c-longform-grid__sidebar-right">
            <TableOfContentsSidebar alwaysFollow {...props} />
          </div>
        </div>
      )}

      <PrintLongformArticle {...props} />
      {props.references ? (
        <div className="c-longform-grid">
          <div className="c-longform-grid__standard">
            <div className="footnotes">
              <ol>
                <ToggleBlock title="References" active content={props.references} />
              </ol>
            </div>
          </div>
        </div>
      ) : null}
      {props.acknowledgements ? (
        <div className="c-longform-grid">
          <div className="c-longform-grid__standard">
            <ToggleBlock title="Acknowledgements" content={props.acknowledgements} />
          </div>
        </div>
      ) : null}
      {props.notes ? (
        <div className="c-longform-grid">
          <div className="c-longform-grid__standard">
            <ToggleBlock title="Notes" content={props.notes} />
          </div>
        </div>
      ) : null}
      {props.abstract ? (
        <div className="c-longform-grid">
          <div className="c-longform-grid__standard">
            <ToggleBlock title="Abstract" content={props.abstract} />
          </div>
        </div>
      ) : null}
      {props._type === 'publication' && (
        <div className="c-longform-grid">
          <div className="c-longform-grid__standard">
            <ToggleBlock title="Disclaimer" content="All views in this text are the author(s)’, and may differ from the U4 partner agencies’ policies." />
          </div>
        </div>
      )}
      <span id="js-bottom" />
      <Footer />
    </article>);
};

export default connect(
  state => state,
  dispatch => ({
    toggleArticleMenu: bindActionCreators(toggleArticleMenu, dispatch),
    toggleLoadingScreen: bindActionCreators(toggleLoadingScreen, dispatch),
  }),
)(LongFormArticleContainer);
