import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../helpers/redux-store';

import Footer from './Footer';
import Layout from './Layout';
import PublicationArticleHeader from './PublicationArticleHeader';
import PdfViewer from './PdfViewer';
import PublicationNotification from './PublicationNotification';
import recommendedResources from './RecommendedResources';

const LegacyPublicationContainer = (props) => {
  const {
    data: {
      lead = '',
      abstract = '',
      featuredImage = {},
      legacypdf = {},
      date = {},
      publicationType = {},
      title = '',
      recommendedResources = [],
      relatedResources = [],
      updatedVersion = false,
      headsUp = false,
    } = {},
    BreadCrumbComponent = null,
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
      <article className="u-relative">
        {BreadCrumbComponent && BreadCrumbComponent}
        <div className={`c-hero ${publicationType._id === 'pubtype-3' ? 'c-hero-no-image' : ''}`}>
          <div
            className="c-hero-image"
            style={{
              backgroundImage:
                featuredImage && featuredImage.asset && featuredImage.asset.url
                  ? `url(${featuredImage.asset.url})`
                  : '',
              backgroundColor: '#0079CF',
            }}
          />
          <div className="c-hero-bg" />
          <div className="c-hero-sideText">
            {featuredImage && featuredImage.sourceUrl && (
              <a href={featuredImage.sourceUrl}>
                {featuredImage.credit ? featuredImage.credit : featuredImage.sourceUrl}
              </a>
            )}
            {featuredImage && !featuredImage.sourceUrl && featuredImage.credit && (
              <span>{featuredImage.credit}</span>
            )}
          </div>
          <div className="c-hero-header">
            <PublicationArticleHeader
              className="c-hero__grid-container__content links-wrapper-dark-background"
              {...props.data}
            />
          </div>
        </div>
        <div className="c-longform-grid">
          <div className="c-longform-grid__standard">
            <PublicationNotification
              headsUp={headsUp}
              updatedVersion={updatedVersion}
              date={date}
            />

            {lead && (
              <div className="c-article">
                <p>{lead}</p>
              </div>
            )}
            {/* Legacy publication abstracts come with html included
                so we go and render it out.
               */}
            {!lead && abstract && (
              <div className="c-article" dangerouslySetInnerHTML={{ __html: abstract }} />
            )}
          </div>
        </div>
        {legacypdf.asset && <PdfViewer file={{ url: legacypdf.asset.url }} />}
        {(recommendedResources.length > 0 || relatedResources.length > 0) && (
          <div className="o-wrapper">
            <h2>We also recommend</h2>
            <RecommendedResources
              resources={recommendedResources.length > 0 ? recommendedResources : relatedResources}
            />
          </div>
        )}

        <Footer />
      </article>
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
  }),
)(LegacyPublicationContainer);
