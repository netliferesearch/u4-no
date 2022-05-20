import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../../helpers/redux-store';
import { PublicationContent } from './PublicationContent';
import { ArticleHeader } from '../general/article-header/ArticleHeader';
import { Layout } from '../Layout';
import { ArticleSidebar } from '../general/article-sidebar/ArticleSidebar';
import { BreadCrumbV2 } from '../general/BreadCrumbV2';
import { Reader } from './Reader';
import LongformArticle from '../LongformArticle';
import { PUBLICATIONS } from '../../helpers/constants';
import Footer from '../general/footer/Footer';
import { PostCarousel } from '../front-page/PostCarousel';
import { POST_TYPE } from '../general/post/Post';
import { PublicationAdditionalInfo } from './PublicationAdditionalInfo';

const PublicationContainer = (props = {}) => {
  const {
    data: {
      _type = '',
      title = '',
      lead = '',
      standfirst = '',
      slug = '',
      featuredImage = {},
      relatedUrl = {},
      legacypdf = {},
      pdfThumbnail = {},
      recommendedResources = [],
    } = {},
    shortversion = false,
    shortversionContent = [],
    headComponentConfigOverride,
    isArticleMenuOpen,
    showLoadingScreen,
    url = {},
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
      <article className="c-publication-container c-article-v2">
        <span id="js-top" />
        <section id="js-scroll-trigger" className="o-wrapper-medium">
          {_type === 'publication' && !shortversion ? (
            <BreadCrumbV2 home={true} title="Publications" parentSlug={PUBLICATIONS} />
          ) : null}
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
        </section>
        {shortversion && (
          <section className="c-article--shortversion ">
            <div className="o-wrapper-medium">
              <BreadCrumbV2
                home={true}
                title={title}
                parentSlug={`/publications/${slug.current}`}
              />
            </div>
            <div className="o-wrapper-medium">
              <div className="c-article__row">
                <div className="content c-article__col">
                  <LongformArticle content={shortversionContent} />
                </div>
              </div>
            </div>
          </section>
        )}

        {!shortversion && (
          <PublicationAdditionalInfo data={props.data} setReaderOpen={setReaderOpen} />
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
