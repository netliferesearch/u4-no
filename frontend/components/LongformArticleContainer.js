import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../helpers/redux-store';
import {
  Footer,
  Layout,
  LongformArticle,
  PublicationArticleHeader,
  TableOfContentsButton,
  TableOfContentsSidebar,
  TableOfContentsContent,
  CustomScrollSpy,
  ToggleBlock,
  PublicationDrawer,
} from './';

const LongFormArticleContainer = (props) => {
  const {
    toggleArticleMenu,
    toggleLoadingScreen,
    isArticleMenuOpen,
    showLoadingScreen,
    lead = 'article had no lead',
    _type = '',
    longTitle = '',
    title = '',
    mainPoints = [],
    resources = [],
    BreadCrumbComponent = null,
  } = props;
  return (
    <Layout showLoadingScreen={showLoadingScreen} showTopTab={!isArticleMenuOpen}>
      {isArticleMenuOpen && (
        <div
          className={`c-article-nav-fullscreen ${isArticleMenuOpen
            ? 'c-article-nav-fullscreen c-article-nav-fullscreen--open'
            : ''}`}
        >
          <TableOfContentsButton {...props} />
          <TableOfContentsContent
            showAllItems
            onItemSelected={(e) => {
              const linkThatWasClicked = e.target;
              // prevent this from triggering multiple times
              if (!showLoadingScreen) {
                toggleLoadingScreen();
                setTimeout(() => {
                  toggleArticleMenu();
                  linkThatWasClicked.click();
                  setTimeout(() => {
                    toggleLoadingScreen();
                  }, 1);
                }, 1);
              }
            }}
            {...props}
          />
        </div>
      )}
      {!isArticleMenuOpen && (
        <article className="u-relative">
          <TableOfContentsButton {...props} />
          <CustomScrollSpy {...props} />
          <span id="js-top" />
          <div id="js-scroll-trigger">
            {BreadCrumbComponent && BreadCrumbComponent}
            {_type === 'publication' &&
              props.featuredImage &&
              props.featuredImage.asset.url && (
                <div className="c-hero">
                  <div
                    className="c-hero-image"
                    style={{
                      backgroundImage: `url(${props.featuredImage.asset.url})`,
                    }}
                  />
                  <div className="c-hero-bg" />
                  <div className="c-hero-sideText">
                    {props.featuredImage.credit ? (
                      <a href={props.featuredImage.sourceUrl}>{props.featuredImage.credit}</a>
                    ) : null}
                  </div>
                  <div className="c-hero-header">
                    <PublicationArticleHeader
                      className="c-hero__grid-container__content links-wrapper-dark-background"
                      {...props}
                    />
                  </div>
                </div>
              )}
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
              <div className="c-longform-grid__sidebar-right">
                <TableOfContentsSidebar {...props} />
              </div>
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
          <PublicationDrawer {...props}>
            <LongformArticle {...props} />
            {props.references ? (
              <div className="c-longform-grid">
                <div className="c-longform-grid__standard">
                  <ToggleBlock title="References" content={props.references} />
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
                  <ToggleBlock title="Disclaimer" content="" />
                </div>
              </div>
            )}
            <span id="js-bottom" />
            <Footer />
          </PublicationDrawer>
        </article>
      )}
    </Layout>
  );
};

export default connect(
  state => state,
  dispatch => ({
    toggleArticleMenu: bindActionCreators(toggleArticleMenu, dispatch),
    toggleLoadingScreen: bindActionCreators(toggleLoadingScreen, dispatch),
  }),
)(LongFormArticleContainer);
