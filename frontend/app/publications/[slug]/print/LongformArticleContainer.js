import React from 'react';
import BlockToContent from '@sanity/block-content-to-react';
import Image from 'next/image';
import sanityImageLoader from 'helpers/sanityImageLoader';
import { toggleArticleMentoggleLoadingScreen } from 'helpers/redux-store';
import dateToString from 'helpers/dateToStg';
import Footer from 'components/general/footer/Footer';
import LongformArticle from '../../../components/publication/LongformArticle';
import PublicationArticleHeader from 'components/PublicationArticleHeader';
import TableOfContentsButton from 'components/TableOfContents/TableOfContentsButton';
import TableOfContentsSidebar from 'components/TableOfContents/TableOfContentsSidebar';
import TableOfContentsBase from 'components/TableOfContents/TableOfContentsBase';
import RecommendedResources from 'components/RecommendedResources';
import { ToggleBlock } from 'components/publication/ToggleBlock';
import AuthorList from 'components/publication/AuthorList';
import PublicationNotification from 'components/PublicationNotification';
import TnrcHeader from 'components/general/tnrc/TnrcHeader';
import TnrcFooter from 'components/general/tnrc/TnrcFooter';
import CreativecommonsCC from 'components/icons/CreativecommonsCC';
import CreativecommonsBY from 'components/icons/CreativecommonsBY';
import CreativecommonsNC from 'components/icons/CreativecommonsNC';
import CreativecommonsND from 'components/icons/CreativecommonsND';

import { translate } from 'helpers/translate';

export default LongFormArticleContainer = (props = {}) => {
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

  return (
    <>
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
                className={`c-hero u-bg--white u-z-index-x ${
                  publicationType._id === 'pubtype-3' ? 'c-hero-no-image' : ''
                }`}
              >
                <div className="c-hero-image">
                  {featuredImage.asset && featuredImage.asset.url && (
                    <Image
                      loader={sanityImageLoader}
                      src={featuredImage.asset.url}
                      alt=""
                      priority="true"
                      fill
                      sizes="100vw"
                      style={{
                        objectFit: 'cover',
                      }}
                    />
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
                {mainPoints && (
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
              <div className="c-longform-grid u-bg--white u-z-index-x">
                {articleType && 
                  <h2 className="c-longform-grid__standard">{articleType[0].target.title}</h2>
                }
                <h1 className="c-longform-grid__standard">{title || longTitle}</h1>
                {authors &&
                  <div className="c-article c-longform-grid__standard">
                    <AuthorList authors={authors} language={language} />
                    {date && date.utc && (
                      <span> (last update: {dateToString({ start: date.utc })})</span>
                    )}
                  </div>
                }

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

          {!shortversion && (recommendedResources || relatedResources) && (
            <div className="o-wrapper">
              <h2>We also recommend</h2>
              <RecommendedResources
                resources={
                  recommendedResources ? recommendedResources : relatedResources
                }
              />
            </div>
          )}
          <span id="js-bottom" />
          <Footer />
        </article>
      )}
    </>
  );
};
