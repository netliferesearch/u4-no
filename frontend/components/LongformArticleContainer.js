import React from 'react';
import BlockToContent from '@sanity/block-content-to-react';
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
  RecommendedResources,
  ToggleBlock,
} from './';

const LongFormArticleContainer = (props = {}) => {
  const {
    data: {
      lead = '',
      _type = '',
      longTitle = '',
      title = '',
      mainPoints = [],
      resources = [],
      methodology = [],
      references = [],
      featuredImage = {},
      relatedUrl = {},
      publicationType = {},
      relatedContent = [],
    } = {},
    shortversion = false,
    headComponentConfigOverride,
    isArticleMenuOpen,
    showLoadingScreen,
    toggleArticleMenu,
    toggleLoadingScreen,
    isPublicationDrawerOpen,
    BreadCrumbComponent = null,
    url = {},
    translation = {},
    language = '',
  } = props;
  const headComponentConfig =
    headComponentConfigOverride ||
    Object.assign(
      {
        title,
        description: lead,
        image: featuredImage.asset && featuredImage.asset.url ? featuredImage.asset.url : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
      },
      relatedUrl,
    );
  return (
    <Layout
      showLoadingScreen={showLoadingScreen}
      showTopTab={!isArticleMenuOpen}
      headComponentConfig={headComponentConfig}
    >
      {isArticleMenuOpen && (
        <div
          className={`c-article-nav-fullscreen ${
            isArticleMenuOpen ? 'c-article-nav-fullscreen c-article-nav-fullscreen--open' : ''
          }`}
        >
          <TableOfContentsButton {...props.data} />
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
            {...props.data}
          />
        </div>
      )}

      {!isArticleMenuOpen && (
        <article>
          {_type === 'publication' &&
            !isPublicationDrawerOpen && <TableOfContentsButton {...props.data} />}
          <CustomScrollSpy {...props.data} />
          <span id="js-top" />
          <div id="js-scroll-trigger">
            {BreadCrumbComponent && BreadCrumbComponent}
            {_type === 'publication' &&
              !shortversion && (
                <div
                  className={`c-hero u-bg-white u-z-index-x ${
                    publicationType._id === 'pubtype-3' ? 'c-hero-no-image' : ''
                  }`}
                >
                  <div
                    className="c-hero-image"
                    style={{
                      backgroundImage: `url(${props.data.featuredImage &&
                        props.data.featuredImage.asset &&
                        props.data.featuredImage.asset.url}?width=1120&crop=focalpoint&fit=scale)`,
                      backgroundColor: '#0079CF',
                    }}
                  />
                  <div className="c-hero-bg" />
                  <div className="c-hero-sideText">
                    {props.data.featuredImage &&
                      props.data.featuredImage.caption && (
                        <BlockToContent
                          blocks={props.data.featuredImage.caption}
                          serializers={{
                            types: {
                              block: props => <p style={{ display: 'inline' }}>{props.children}</p>,
                            },
                          }}
                        />
                      )}
                    {props.data.featuredImage &&
                      !props.data.featuredImage.sourceUrl &&
                      props.data.featuredImage.credit && (
                        <div style={{ display: 'inline' }}>{props.data.featuredImage.credit}</div>
                      )}
                    {props.data.featuredImage &&
                      props.data.featuredImage.sourceUrl && (
                        <a className="u-margin-left-tiny" href={props.data.featuredImage.sourceUrl}>
                          {props.data.featuredImage.credit
                            ? props.data.featuredImage.credit
                            : props.data.featuredImage.sourceUrl}
                        </a>
                      )}
                    {props.data.featuredImage &&
                      props.data.featuredImage.license && (
                        <span> {props.data.featuredImage.license.toUpperCase()}</span>
                      )}
                  </div>
                  <div className="c-hero-header">
                    <PublicationArticleHeader
                      className="c-hero__grid-container__content links-wrapper-dark-background"
                      {...props.data}
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
              {_type === 'publication' &&
                !isPublicationDrawerOpen && (
                  <div className="c-longform-grid__sidebar-right">
                    <TableOfContentsSidebar {...props.data} />
                  </div>
                )}
            </div>
          )}
          {_type !== 'publication' && (
            <div>
              <div className="c-longform-grid u-bg-white u-z-index-x">
                <h1 className="c-longform-grid__standard">{title || longTitle}</h1>
                {lead && <div className="c-article c-longform-grid__standard">{lead}</div>}
              </div>
              <div className="c-longform-grid">
                <div className="c-longform-grid__sidebar-right">
                  <TableOfContentsSidebar alwaysFollow {...props.data} />
                </div>
              </div>
            </div>
          )}
          <LongformArticle content={shortversion ? props.content : ''} {...props.data} />
          {!shortversion && props.data.methodology ? (
            <div className="c-longform-grid">
              <div className="c-longform-grid__standard">
                <ToggleBlock title="Methodology" content={props.data.methodology} />
              </div>
            </div>
          ) : null}
          {!shortversion && props.data.references ? (
            <div className="c-longform-grid">
              <div className="c-longform-grid__standard">
                <ToggleBlock title="References" content={props.data.references} />
              </div>
            </div>
          ) : null}
          {!shortversion && props.data.acknowledgements ? (
            <div className="c-longform-grid">
              <div className="c-longform-grid__standard">
                <ToggleBlock title="Acknowledgements" content={props.data.acknowledgements} />
              </div>
            </div>
          ) : null}
          {!shortversion && props.data.notes ? (
            <div className="c-longform-grid">
              <div className="c-longform-grid__standard">
                <ToggleBlock title="Notes" content={props.data.notes} />
              </div>
            </div>
          ) : null}
          {!shortversion && props.data.abstract ? (
            <div className="c-longform-grid">
              <div className="c-longform-grid__standard">
                <ToggleBlock title="Abstract" content={props.data.abstract} />
              </div>
            </div>
          ) : null}
          {!shortversion &&
            props.data._type === 'publication' && (
              <div className="c-longform-grid">
                <div className="c-longform-grid__standard">
                  <ToggleBlock
                    title="Disclaimer"
                    content="All views in this text are the author(s)’, and may differ from the U4 partner agencies’ policies."
                  />
                </div>
              </div>
            )}
          {!shortversion && props.data.relatedContent && props.data.relatedContent.length ? (
            <div className="o-wrapper">
              <h2>We also recommend</h2>
              <RecommendedResources relatedContent={props.data.relatedContent} />
            </div>
          ) : null}
          <span id="js-bottom" />
          <Footer />
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
