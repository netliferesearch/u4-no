import React from 'react';
import BlockToContent from '@sanity/block-content-to-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleArticleMenu, toggleLoadingScreen } from '../helpers/redux-store';
import dateToString from '../helpers/dateToString';

import Footer from './Footer';
import Layout from './Layout';
import LongformArticle from './LongformArticle';
import PublicationArticleHeader from './PublicationArticleHeader';
import TableOfContentsButton from './TableOfContents/TableOfContentsButton';
import TableOfContentsSidebar from './TableOfContents/TableOfContentsSidebar';
import TableOfContentsBase from './TableOfContents/TableOfContentsBase';
import RecommendedResources from './RecommendedResources';
import ToggleBlock from './ToggleBlock';
import AuthorList from './AuthorList';
import PublicationNotification from './PublicationNotification';
import TnrcHeader from './TnrcHeader';
import TnrcFooter from './TnrcFooter';

import CreativecommonsCC from './icons/CreativecommonsCC';
import CreativecommonsBY from './icons/CreativecommonsBY';
import CreativecommonsNC from './icons/CreativecommonsNC';
import CreativecommonsND from './icons/CreativecommonsND';

import { translate } from '../helpers/translate';

const LongFormArticleContainer = (props = {}) => {
  const {
    data: {
      lead = '',
      _type = '',
      longTitle = '',
      title = '',
      authors = [],
      date = {},
      standfirst = '',
      mainPoints = [],
      resources = [],
      methodology = [],
      references = [],
      featuredImage = {},
      relatedUrl = {},
      publicationType = {},
      articleType = [],
      recommendedResources = [],
      relatedResources = [],
      headsUp = [],
      updatedVersion = false,
      language = '',
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
  } = props;

  const trans = translate(language);

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
        preloadImage: featuredImage.asset && featuredImage.asset.url,
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
      {isArticleMenuOpen && (
        <div
          className={`c-article-nav-fullscreen ${
            isArticleMenuOpen ? 'c-article-nav-fullscreen c-article-nav-fullscreen--open' : ''
          }`}
        >
          <TableOfContentsButton {...props.data} />
          <TableOfContentsBase
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
      )}

      {!isArticleMenuOpen && (
        <article>
          {_type === 'publication' && !isPublicationDrawerOpen && (
            <TableOfContentsButton {...props.data} />
          )}
          {/* <CustomScrollSpy {...props.data} /> */}

          <span id="js-top" />
          <div id="js-scroll-trigger">
            {BreadCrumbComponent && BreadCrumbComponent}
            {_type === 'publication' && !shortversion && (
              <div
                className={`c-hero u-bg-white u-z-index-x ${
                  publicationType._id === 'pubtype-3' ? 'c-hero-no-image' : ''
                }`}
              >
                <div className="c-hero-image" style={{ backgroundColor: '#0079CF' }}>
                  {featuredImage.asset && featuredImage.asset.url && (
                    <picture>
                      <source
                        srcSet={`${
                          featuredImage.asset.url
                        }?auto=format&w=1120&q=80&crop=focalpoint&fit=scale`}
                        media="(min-width: 640px)"
                      />
                      <img
                        style={{ width: '100%', height: '100%', 'object-fit': 'cover' }}
                        alt=""
                        src={`${
                          featuredImage.asset.url
                        }?auto=format&w=600&q=80&crop=focalpoint&fit=scale`}
                      />
                    </picture>
                  )}
                </div>
                <div className="c-hero-bg" />
                <div className="c-hero-sideText">
                  {!featuredImage.sourceUrl && featuredImage.credit && (
                    <div style={{ display: 'inline' }}>{featuredImage.credit}</div>
                  )}
                  {featuredImage.sourceUrl && (
                    <a className="u-margin-left-tiny" href={featuredImage.sourceUrl}>
                      {featuredImage.credit ? featuredImage.credit : featuredImage.sourceUrl}
                    </a>
                  )}
                  {featuredImage.license && (
                    <span>
                      {' '}
                      {featuredImage.license.startsWith('copyrighted') || 'CC'}{' '}
                      {featuredImage.license.toUpperCase()}
                    </span>
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
                <PublicationNotification
                  headsUp={headsUp}
                  updatedVersion={updatedVersion}
                  date={date}
                />
                <TnrcHeader publicationTypeId={publicationType._id} />
                {lead && (
                  <div className="c-article">
                    <p>{lead}</p>
                  </div>
                )}
                {mainPoints.length > 0 && (
                  <div className="c-article c-article_mainPoints">
                    <h2>{trans('main_points')}</h2>
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
              {_type === 'publication' && !isPublicationDrawerOpen && (
                <div className="c-longform-grid__sidebar-right">
                  <TableOfContentsSidebar {...props.data} />
                </div>
              )}
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
                    <AuthorList authors={authors} language={language} />
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
          <LongformArticle content={shortversion ? props.content : ''} {...props.data} />

          <TnrcFooter publicationTypeId={publicationType._id} />

          {!shortversion && props.data.methodology ? (
            <div className="c-longform-grid">
              <div className="c-longform-grid__standard">
                <ToggleBlock title={trans('methodology')} content={props.data.methodology} />
              </div>
            </div>
          ) : null}
          {!shortversion && props.data.references ? (
            <div className="c-longform-grid">
              <div className="c-longform-grid__standard">
                <ToggleBlock title={trans('references')} content={props.data.references} />
              </div>
            </div>
          ) : null}
          {!shortversion && props.data.acknowledgements ? (
            <div className="c-longform-grid">
              <div className="c-longform-grid__standard">
                <ToggleBlock
                  title={trans('acknowledgements')}
                  content={props.data.acknowledgements}
                />
              </div>
            </div>
          ) : null}
          {!shortversion && props.data.notes ? (
            <div className="c-longform-grid">
              <div className="c-longform-grid__standard">
                <ToggleBlock title={trans('notes')} content={props.data.notes}>
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
                        {featuredImage.license.startsWith('copyrighted') || 'CC'}{' '}
                        {featuredImage.license.toUpperCase()}
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
                <ToggleBlock title={trans('abstract')} content={props.data.abstract} />
              </div>
            </div>
          ) : null}
          {!shortversion && props.data._type === 'publication' && (
            <div className="c-longform-grid">
              <div className="c-longform-grid__standard">
                <ToggleBlock title={trans('disclaimer')} content={trans('disclaimer_text')} />
              </div>
            </div>
          )}
          {_type === 'publication' && (
            <div className="c-longform-grid">
              <div className="c-longform-grid__standard">
                <p>
                  <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                    <CreativecommonsCC className="page2-ccimage" />
                    <CreativecommonsBY className="page2-ccimage" />
                    <CreativecommonsNC className="page2-ccimage" />
                    <CreativecommonsND className="page2-ccimage" />
                  </a>
                  <br />
                  {trans('creative_commons_text')} (
                  <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                    {trans('creative_commons_licenses')}
                  </a>
                  )
                </p>
              </div>
            </div>
          )}

          {!shortversion && (recommendedResources.length > 0 || relatedResources.length > 0) && (
            <div className="o-wrapper">
              <h2>We also recommend</h2>
              <RecommendedResources
                resources={
                  recommendedResources.length > 0 ? recommendedResources : relatedResources
                }
              />
            </div>
          )}
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
  })
)(LongFormArticleContainer);
