import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../../helpers/redux-store';
import dateToString from '../../helpers/dateToString';
import {
  TableOfContentsButton,
  TableOfContentsSidebar,
  TableOfContentsContent,
  AuthorList,
} from '../';
import { useState } from 'react';
import {
  PublicationSidebar,
  PublicationContent,
  Layout,
  PublicationArticleHeader,
  PublicationAccordion,
  NewsAndEvents,
} from './';

const LongFormArticleContainer = (props = {}) => {
  const {
    data: {
      _type = '',
      longTitle = '',
      title = '',
      authors = [],
      date = {},
      lead = '',
      standfirst = '',
      references = [],
      acknowledgements = '',
      methodology = [],
      notes = '',
      abstract = '',
      mainPoints = [],
      resources = [],
      featuredImage = {},
      relatedUrl = {},
      publicationType = {},
      articleType = [],
      recommendedResources = [],
      relatedResources = [],
      headsUp = [],
      updatedVersion = false,
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
        description: lead || standfirst,
        image:
          featuredImage.asset && featuredImage.asset.url
            ? `${featuredImage.asset.url}?w=1200&h=630&fit=min`
            : '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
        ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
      },
      relatedUrl
    );

  return (
    <Layout
      showLoadingScreen={showLoadingScreen}
      showTopTab={!isArticleMenuOpen}
      headComponentConfig={headComponentConfig}
    >
      {/* {isArticleMenuOpen && (
        <div
          className={`c-article-nav-fullscreen ${
            isArticleMenuOpen ? 'c-article-nav-fullscreen c-article-nav-fullscreen--open' : ''
          }`}
        >
          <TableOfContentsButton {...props.data} />
          <TableOfContentsContent
            showAllItems
            onItemSelected={e => {
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
      )} */}

      {!isArticleMenuOpen && (
        <article>
          {/* {_type === 'publication' && !isPublicationDrawerOpen && (
            <TableOfContentsButton {...props.data} />
          )} */}
          <span id="js-top" />
          <div id="js-scroll-trigger">
            {BreadCrumbComponent && BreadCrumbComponent}
            {_type === 'publication' && !shortversion && (
              <PublicationArticleHeader {...props.data} shortversion={shortversion} />
            )}
          </div>
          <section className="o-wrapper u-side-padding">
          {_type === 'publication' && (
            <div className="o-wrapper-section c-article__container">
              <PublicationSidebar {...props.data} />
              <div className="content">
                <PublicationContent {...props.data} />
                <PublicationAccordion {...props.data} />
              </div>
            </div>
          )}
          {_type !== 'publication' && (
            <div>
              <div className="c-longform-grid u-bg-white u-z-index-x">
                {articleType.length ? (
                  <h2 className="c-longform-grid__standard c-article-header__meta c-article-header__meta-uppercase">
                    {articleType[0].target.title}
                  </h2>
                ) : null}
                <h1 className="c-longform-grid__standard">{title || longTitle}</h1>
                {authors.length ? (
                  <div className="c-article c-longform-grid__standard">
                    <AuthorList authors={authors} />
                    {date && date.utc && (
                      <span> (last update: {dateToString({ start: date.utc })})</span>
                    )}
                  </div>
                ) : null}

                {lead && <div className="c-article c-longform-grid__standard">{lead}</div>}
              </div>
              <div className="c-longform-grid">
                <div className="c-longform-grid__sidebar-right">
                  <TableOfContentsSidebar alwaysFollow {...props.data} />
                </div>
              </div>
            </div>
          )}
          </section>

          {/* <LongformArticle content={shortversion ? props.content : ''} {...props.data} /> */}

          {/* <TnrcFooter publicationTypeId={publicationType._id} /> */}

          {/* {!shortversion && props.data.methodology ? (
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
                <ToggleBlock title="Notes" content={props.data.notes}>
                  {featuredImage.caption && (
                    <div className="c-longform-grid__standard">
                      <p>
                        <b>Header image:</b>
                      </p>
                      <BlockToContent
                        blocks={featuredImage.caption}
                        serializers={{
                          types: {
                            block: props => <p style={{ display: 'inline' }}>{props.children}</p>,
                          },
                        }}
                      />
                    </div>
                  )}
                  <div className="c-longform-grid__standard">
                    {!featuredImage.sourceUrl && featuredImage.credit && (
                      <span>Photo: {featuredImage.credit} </span>
                    )}

                    {featuredImage.sourceUrl && (
                      <span>
                        Photo:
                        <a className="u-margin-left-tiny" href={featuredImage.sourceUrl}>
                          {featuredImage.credit ? featuredImage.credit : featuredImage.sourceUrl}
                        </a>
                      </span>
                    )}
                    {featuredImage.license && (
                      <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                        {' '}
                        CC {featuredImage.license.toUpperCase()}
                      </a>
                    )}
                  </div>
                </ToggleBlock>
              </div>
            </div>
          ) : null}
          {!shortversion && props.data.abstract ? (
            <div className="c-longform-grid">
              <div className="c-longform-grid__standard">
                <ToggleBlock title="Abstract" content={props.data.abstract} />
              </div>
            </div>
          ) : null} */}

          <section className="o-wrapper">
            <div className="o-wrapper-section">
              {recommendedResources.length || relatedResources.length ? (
                  <NewsAndEvents
                    items={recommendedResources.length > 0 ? recommendedResources : relatedResources}
                    title={'Related'}
                  />
                ) : null}
            </div>
          </section>
          {/* <span id="js-bottom" /> */}
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
  })
)(LongFormArticleContainer);
