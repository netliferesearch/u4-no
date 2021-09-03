import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../../helpers/redux-store';
import dateToString from '../../helpers/dateToString';
import { AuthorList } from './AuthorList';
import TableOfContentsSidebar from '../TableOfContents/TableOfContentsSidebar';
import { PublicationContent } from './PublicationContent';
import { ArticleHeader } from './ArticleHeader';
import { Layout } from '../Layout';
import { PublicationSidebar } from './PublicationSidebar';
import { AboutAuthor } from '../blog/AboutAuthor';
import { Disclaimers } from '../Disclaimers';
import { Cite } from '../Cite';
import { Keywords } from '../Keywords';
import { Topics } from '../general/topics/Topics';
import { BreadCrumbV2 } from '../general/BreadCrumbV2';
import { getRouteByType } from '../../helpers/getRouteByType';
import { Partners } from '../Partners';
import { Reader } from './Reader';
import LongformArticle from '../LongformArticle';
import TnrcFooter from '../TnrcFooter';

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
            <BreadCrumbV2
              home={true}
              title={`All ${publicationType.title}s`}
              parentSlug={getRouteByType(publicationType.title)}
            />
          ) : null}
          {_type === 'publication' && !shortversion && (
            <ArticleHeader
              {...props.data}
              shortversion={shortversion}
              readerOpen={readerOpen}
              setReaderOpen={setReaderOpen}
            />
          )}
        </section>
        <section
          className="o-wrapper u-side-padding"
          style={{ display: readerOpen ? 'none' : 'block' }}
        >
          {_type === 'publication' && !shortversion && (
            <div className="o-wrapper-section c-article__row">
              <div className="c-article__side c-article__col">
                <PublicationSidebar data={props.data} side={'left'} />
              </div>
              <div className="content c-article__col c-article__center">
                <PublicationContent {...props.data} />
                <div className="c-article__additional-info-content">
                  <div className="u-hidden--desktop">
                    <Partners data={props.data} />
                  </div>
                  {topics.length > 0 || keywords.length > 0 ? (
                    <hr className="u-section-underline--no-margins u-hidden--desktop" />
                  ) : null}
                  {topics.length > 0 || keywords.length > 0 ? (
                    <h3 className="u-heading--2 tags">Tags</h3>
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

        {shortversion && (
          <section className="c-article--shortversion o-wrapper u-side-padding">
            <div className="o-wrapper-section c-article__row">
              {BreadCrumbComponent && BreadCrumbComponent}
            </div>
            <div className="o-wrapper-section c-article__row">
              <LongformArticle content={shortversionContent} {...props.data} />
            </div>
          </section>
        )}

        <TnrcFooter publicationTypeId={publicationType._id} />

        {/* <span id="js-bottom" /> */}
      </article>
       {/* )} */}
      {readerOpen && (
        <Reader
          data={props.data}
          setReaderOpen={setReaderOpen}
          legacypdf={legacypdf}
          shortversion={shortversion}
        />
      )}
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
