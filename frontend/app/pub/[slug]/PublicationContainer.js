'use client';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from 'helpers/redux-store';
import { PublicationContent } from 'components/publication/PublicationContent';
import { ArticleHeader } from 'components/general/article-header/ArticleHeader';
import { ArticleSidebar } from 'components/general/article-sidebar/ArticleSidebar';
import { BreadCrumbV2 } from 'components/general/BreadCrumbV2';
import { Reader } from 'components/publication/Reader';
import { PUBLICATIONS } from 'helpers/constants';
import Footer from 'components/general/footer/Footer';
import { PostCarousel } from 'components/front-page/PostCarousel';
import { POST_TYPE } from 'components/general/post/Post';
import { PublicationAdditionalInfo } from 'components/publication/PublicationAdditionalInfo';

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
    isArticleMenuOpen,
    showLoadingScreen,
    url = {},
    children = {},
  } = props;

  const [readerOpen, setReaderOpen] = useState(false);

  return (
    <>
      <article className="c-publication-container c-article-v2">
        <span id="js-top" />
        <section id="js-scroll-trigger" className="o-wrapper-medium">
          {_type === 'publication' ? (
            <BreadCrumbV2 home={true} title="Publications" parentSlug={PUBLICATIONS} />
          ) : null}
          <ArticleHeader
            data={props.data}
            readerOpen={readerOpen}
            setReaderOpen={setReaderOpen}
          />
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

        <PublicationAdditionalInfo data={props.data} setReaderOpen={setReaderOpen} />

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
        >
          {children}
        </Reader>
      )}
      <Footer />
      <div id="modal" />
    </>
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
