import React, { useState } from 'react';
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
import { PublicationContent, Layout, PublicationArticleHeader } from './';
import { PublicationSidebar } from './PublicationSidebar';
import { AboutAuthor } from './AboutAuthor';
import { Disclaimers } from './Disclaimers';
import { Cite } from './Cite';
import { Keywords } from './Keywords';
import { Topics } from './Topics';
import { BreadCrumbV2 } from './BreadCrumbV2';
import { getRouteByType } from '../../helpers/getRouteByType';
import { AcknowledgementsPartners } from './AknowledgementsPartners';
import { Reader } from './Reader';

const LongFormArticleContainer = (props = {}) => {
  const {
    data: {
      _type = '',
      longTitle = '',
      title = '',
      content = '',
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
      keywords = [],
      topics = [],
      pdfFile = {},
      legacypdf = {},
      recommendedResources = [],
      relatedResources = [],
      headsUp = [],
      updatedVersion = false,
      summary = [],
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

  const [readerOpen, setReaderOpen] = useState(false);

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
        <article className="c-article-v2">
          {/* {_type === 'publication' && !isPublicationDrawerOpen && (
            <TableOfContentsButton {...props.data} />
          )} */}
          <span id="js-top" />
          <div id="js-scroll-trigger" className="o-wrapper u-side-padding">
            {_type === 'publication' && !shortversion && (
              <PublicationArticleHeader
                {...props.data}
                shortversion={shortversion}
                readerOpen={readerOpen}
                setReaderOpen={setReaderOpen}
              />
            )}
          </div>
          <section
            className="o-wrapper u-side-padding"
            style={{ display: readerOpen ? 'none' : 'block' }}
          >
            <div className="o-wrapper-section c-article__row u-hidden--tablet">
              <BreadCrumbV2
                title={`All ${publicationType.title}s`}
                parentSlug={getRouteByType(publicationType.title)}
                home={false}
              />
            </div>
            {_type === 'publication' && (
              <div className="o-wrapper-section c-article__row">
                <div className="c-article__side c-article__col">
                  <PublicationSidebar data={props.data} side={'left'} />
                </div>
                <div className="content c-article__col c-article__center">
                  <PublicationContent {...props.data} />
                  <div className="c-article__additional-content">
                    <div className="u-hidden--desktop">
                      <AcknowledgementsPartners data={props.data} />
                    </div>
                    {topics.length > 0 || keywords.length > 0 ? (
                      <hr className="u-section-underline--no-margins u-hidden--desktop" />
                    ) : null}
                    {topics.length > 0 || keywords.length > 0 ? (
                      <h3 className="u-headline--sec tags">Tags</h3>
                    ) : null}
                    {topics.length > 0 ? <Topics title={true} topics={topics} hr={false} /> : null}
                    {keywords.length > 0 ? (
                      <Keywords title={true} keywords={keywords} hr={false} />
                    ) : null}
                    <AboutAuthor authors={authors} />
                    <Cite {...props.data} />
                    <Disclaimers title={true} />
                  </div>
                </div>
                <div className="c-article__side c-article__col">
                  <PublicationSidebar data={props.data} side={'right'} />
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

          {/* <section className="o-wrapper" style={{ display: readerOpen ? 'none' : 'block' }}>
            <div className="o-wrapper-section">
              {recommendedResources.length || relatedResources.length ? (
                <RelatedSimple
                  items={recommendedResources.length > 0 ? recommendedResources : relatedResources}
                  title={'We also recommend'}
                />
              ) : null}
            </div>
          </section> */}
          {/* <span id="js-bottom" /> */}
        </article>
      )}
      {readerOpen && (
        <Reader data={props.data} setReaderOpen={setReaderOpen} legacypdf={legacypdf} />
      )}
      <div id="modal" />
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
