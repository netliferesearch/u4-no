import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../../helpers/redux-store';
import { PrintLongformArticle } from './';
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

} from '../';

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
  } = props;
  return (
    <article className="u-relative u-print-width o-wrapper-page">
      <div className="c-print__frontmatter">
        <figure className="c-print__image">
          <img src={props.featuredImage.asset.url} alt={props.featuredImage.credit} />
          {props.featuredImage.credit && (
            <figcaption>
              {props.featuredImage.credit}
            </figcaption>)}
        </figure>
      </div>
      <PublicationArticleHeader
        className="c-hero__grid-container__content links-wrapper-dark-background"
        {...props}
      />

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
