import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../../helpers/redux-store';
import { ArticleHeader } from '../general/article-header/ArticleHeader';
import { Layout } from '../Layout';
import { ArticleSidebar } from '../general/article-sidebar/ArticleSidebar';
import { BreadCrumbV2 } from '../general/BreadCrumbV2';
import LongformArticle from '../LongformArticle';
import Footer from '../general/footer/Footer';
import { PostCarousel } from '../front-page/PostCarousel';
import { POST_TYPE } from '../general/post/Post';
import { ArticleLead, ArticleLeadMain } from '../general/article-lead/ArticleLead';
import { ArticleActions } from '../general/article-actions/ArticleActions';
import { AboutAuthor } from '../blog/AboutAuthor';
import { Disclaimers } from '../general/disclaimers/Disclaimers';
import { Keywords } from '../general/keywords/Keywords';
import { ToggleBlock } from '../../components/publication/ToggleBlock';
import { getParentPath } from '../../helpers/getParentPath';

const ArticleContainer = (props = {}) => {
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
      abbreviations = [],
      acknowledgements = '',
      methodology = [],
      notes = '',
      abstract = '',
      mainPoints = [],
      resources = [],
      featuredImage = {},
      relatedUrl = {},
      publicationType = {},
      articleType = '',
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
    breadCrumbTitle,
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
      <article className="c-publication-container c-article-v2">
        <span id="js-top" />
        <section id="js-scroll-trigger" className="o-wrapper-medium">
          {_type !== 'publication' && !shortversion && getParentPath() !== '' ? (
            <BreadCrumbV2
              home={true}
              title={breadCrumbTitle}
              parentSlug={`/${getParentPath()}`}
              currentTitle={title}
              currentSlug={slug.current}
            />
          ) : null}
          {_type !== 'publication' && !shortversion && getParentPath() === '' ? (
            <BreadCrumbV2 home={true} currentTitle={title} currentSlug={slug.current} />
          ) : null}
          {/* {articleType.length ? (
                  <h2 className="c-longform-grid__standard">{articleType[0].target.title}</h2>
                ) : null}
                <h1 className="c-longform-grid__standard">{title || longTitle}</h1> */}
          {!shortversion && (
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
          {content.length > 0 && (
            <main className="c-reader__main o-wrapper-section c-article__row">
              <div className="c-article__content c-article__col">
                {lead || abstract ? <ArticleLeadMain lead={lead} abstract={abstract} /> : null}
                <LongformArticle content={content} title={title} lead={lead || abstract ? true : false}/>
                {references.length > 0 && <ToggleBlock title="References" content={references} />}
                {abbreviations.length > 0 && (
                  <ToggleBlock title="Abbreviations" content={abbreviations} />
                )}
              </div>
              <div className="c-article__side c-article__col">
                <ArticleSidebar data={props.data} />
              </div>
            </main>
          )}
        </section>

        {!shortversion && (
          <section className="u-bg--lighter-blue c-article__additional-content">
            <div className="o-wrapper-medium">
              <div className="o-wrapper-narrow">
                <ArticleActions data={props.data} setReaderOpen={setReaderOpen} />
                <AboutAuthor authors={authors} />
                <Disclaimers title={true} />
                {keywords.length > 0 ? (
                  <Keywords title={true} keywords={keywords} hr={true} />
                ) : null}
              </div>
            </div>
          </section>
        )}

        <span id="js-bottom" />
      </article>
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

      <Footer />
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
)(ArticleContainer);
