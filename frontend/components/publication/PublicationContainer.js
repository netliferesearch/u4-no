import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../../helpers/redux-store';
import dateToString from '../../helpers/dateToString';
import { AuthorList } from './AuthorList';
import TableOfContentsSidebar from '../TableOfContents/TableOfContentsSidebar';
import { PublicationContent } from './PublicationContent';
import { ArticleHeader } from '../general/article-header/ArticleHeader';
import { Layout } from '../Layout';
import { ArticleSidebar } from '../general/article-sidebar/ArticleSidebar';
import { AboutAuthor } from '../blog/AboutAuthor';
import { Disclaimers } from '../general/disclaimers/Disclaimers';
import { Cite } from '../publication/Cite';
import { Keywords } from '../Keywords';
import { BreadCrumbV2 } from '../general/BreadCrumbV2';
import { Reader } from './Reader';
import LongformArticle from '../LongformArticle';
import TnrcFooter from '../general/tnrc/TnrcFooter';
import { PUBLICATION, SEARCH_PUBLICATIONS } from '../../helpers/constants';
import Footer from '../general/footer/Footer';
import { PostCarousel } from '../front-page/PostCarousel';
import { POST_TYPE } from '../general/post/Post';
import { ArticleActions } from '../general/article-actions/ArticleActions';
import { PublicationAdditionalInfo } from './PublicationAdditionalInfo';

const PublicationContainer = (props = {}) => {
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
      slug = '',
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
      translations = [],
    } = {},
    shortversion = false,
    shortversionContent = [],
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
  //console.log('publication', props.data);
  return (
    <Layout
      showLoadingScreen={showLoadingScreen}
      showTopTab={!isArticleMenuOpen}
      headComponentConfig={headComponentConfig}
    >
      {/* {!isArticleMenuOpen && ( */}
      <article className="c-publication-container c-article-v2">
        <span id="js-top" />
        <section id="js-scroll-trigger" className="o-wrapper-medium">
          {!shortversion ? (
            <BreadCrumbV2 home={true} title="Publications" parentSlug={SEARCH_PUBLICATIONS} />
          ) : null}
          {_type === 'publication' && !shortversion && (
            <ArticleHeader
              data={props.data}
              shortversion={shortversion}
              readerOpen={readerOpen}
              setReaderOpen={setReaderOpen}
            />
          )}
        </section>

        <hr className="u-section-underline--no-margins" />

        <section
          className="o-wrapper-medium o-wrapper-mobile-full"
          style={{ display: readerOpen ? 'none' : 'block' }}
        >
          {_type === 'publication' && !shortversion && (
            <div className="c-article__row">
              <div className="content c-article__col">
                <PublicationContent {...props.data} />
              </div>
              <div className="c-article__side c-article__col">
                <ArticleSidebar data={props.data} />
              </div>
            </div>
          )}

          {_type !== 'publication' && (
            <div>
              <div className="c-longform-grid u-bg-white u-z-index-x">
                {articleType.length ? (
                  <h2 className="c-longform-grid__standard">{articleType[0].target.title}</h2>
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

        {shortversion && (
          <section className="c-article--shortversion o-wrapper-medium o-wrapper-mobile-full">
            <BreadCrumbV2 home={true} title={title} parentSlug={`/publications/${slug.current}`} />
            <div className="c-article__row">
              <LongformArticle content={shortversionContent} {...props.data} />
            </div>
          </section>
        )}

        {!shortversion && (
          <PublicationAdditionalInfo data={props.data} setReaderOpen={setReaderOpen} />
        )}

        <span id="js-bottom" />
      </article>
      {/* )} */}
      {recommendedResources.length > 0 ? (
        <section className="">
          <div className="o-wrapper-medium o-wrapper-mobile-full">
            <PostCarousel
              posts={recommendedResources}
              type={POST_TYPE.BLOG}
              buttonPath="/publications"
              title="Related Content"
              minPosts={3}
            />
            <hr className="u-section-underline--no-margins" />
          </div>
        </section>
      ) : null}
      {readerOpen && (
        <Reader
          data={props.data}
          setReaderOpen={setReaderOpen}
          legacypdf={legacypdf}
          shortversion={shortversion}
        />
      )}
      <Footer />
      <div id="modal" />
    </Layout>
  );
};

// export default PublicationContainer
export default connect(
  state => state,
  dispatch => ({
    toggleArticleMenu: bindActionCreators(toggleArticleMenu, dispatch),
    toggleLoadingScreen: bindActionCreators(toggleLoadingScreen, dispatch),
  })
)(PublicationContainer);
