import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../../helpers/redux-store';
import Footer from '../general/footer/Footer';
import Layout from '../Layout';
import { ArticleHeader } from '../general/article-header/ArticleHeader';
import { BreadCrumbV2 } from '../general/BreadCrumbV2';
import { PUBLICATIONS } from '../../helpers/constants';
import { PublicationContent } from './PublicationContent';
import { ArticleSidebar } from '../general/article-sidebar/ArticleSidebar';
import { PostCarousel } from '../front-page/PostCarousel';
import { POST_TYPE } from '../general/post/Post';
import { PublicationAdditionalInfo } from './PublicationAdditionalInfo';

const LegacyPublicationContainer = props => {
  const {
    data: { _type, date = {}, title = '', recommendedResources = [], relatedResources = [] } = {},
    isArticleMenuOpen,
    showLoadingScreen,
    url = { asPath: '' },
  } = props;
  const pubyear = date && date.utc ? new Date(date.utc).getFullYear() : '';

  return (
    <Layout
      headComponentConfig={{
        title,
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
      }}
      showLoadingScreen={showLoadingScreen}
      showTopTab={!isArticleMenuOpen}
    >
      <article className="u-relative c-legacy-publication-container">
        <section className="o-wrapper-medium">
          <BreadCrumbV2 home={true} title="Publications" parentSlug={PUBLICATIONS} />
          {_type === 'publication' && <ArticleHeader data={props.data} shortversion={false} />}
        </section>

        <hr className="u-section-underline--no-margins" />

        <section className="o-wrapper-medium o-wrapper-mobile-full">
          {_type === 'publication' && (
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
        <PublicationAdditionalInfo data={props.data} />

        {recommendedResources.length > 0 || relatedResources.length > 0 ? (
          <section className="">
            <div className="o-wrapper-medium o-wrapper-mobile-full">
              <PostCarousel
                posts={recommendedResources.length > 0 ? recommendedResources : relatedResources}
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
      </article>
      <div id="modal" />
    </Layout>
  );
};

LegacyPublicationContainer.propTypes = {
  data: PropTypes.shape({
    _type: PropTypes.string,
    abstract: PropTypes.string,
    date: PropTypes.object,
    featuredImage: PropTypes.string,
    language: PropTypes.string,
    lead: PropTypes.string,
    legacypdf: PropTypes.object,
    longTitle: PropTypes.string,
    mainPoints: PropTypes.string,
    publicationType: PropTypes.object,
    recommendedResources: PropTypes.array,
    relatedResources: PropTypes.array,
    resources: PropTypes.string,
    title: PropTypes.string,
    translation: PropTypes.string,
  }).isRequired,
  url: PropTypes.shape({
    asPath: PropTypes.string,
  }).isRequired,
};

export default connect(
  state => state,
  dispatch => ({
    toggleArticleMenu: bindActionCreators(toggleArticleMenu, dispatch),
    toggleLoadingScreen: bindActionCreators(toggleLoadingScreen, dispatch),
  })
)(LegacyPublicationContainer);
