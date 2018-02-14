import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../helpers/redux-store';
import {
  Footer,
  Layout,
  PublicationArticleHeader,
  PdfViewer,
} from './';

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
              backgroundImage: `url(${featuredImage &&
                featuredImage.asset &&
                featuredImage.asset.url})`,
              backgroundColor: '#0079CF',
            }}
          />
          <div className="c-hero-bg" />
          <div className="c-hero-sideText">
            {featuredImage &&
              featuredImage.sourceUrl && (
                <a href={featuredImage.sourceUrl}>
                  {featuredImage.credit
                    ? featuredImage.credit
                    : featuredImage.sourceUrl}
                </a>
              )}
            {featuredImage &&
              !featuredImage.sourceUrl &&
              featuredImage.credit && <span>{featuredImage.credit}</span>}
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
            {date &&
              new Date().getFullYear() - Number(pubyear) > 5 && (
                <div className="c-notification">
                  <p className="c-notification__body">
                    This publication is from {pubyear}. Some of the content may be outdated. Search
                    related topics to find more recent resources.
                  </p>
                </div>
              )}
            {lead && (
              <div className="c-article">
                <p>{lead}</p>
              </div>
            )}
            {/* Legacy publication abstracts come with html included
                so we go and render it out.
               */}
            {!lead &&
              abstract && (
                <div className="c-article" dangerouslySetInnerHTML={{ __html: abstract }} />
              )}
          </div>
        </div>
        {legacypdf.asset && (
          <PdfViewer
            file={{ url: legacypdf.asset.url }}
          />
        )}
        <Footer />
      </article>
    </Layout>
  );
};

LegacyPublicationContainer.propTypes = {
  data: PropTypes.shape({
    lead: PropTypes.string,
    abstract: PropTypes.string,
    _type: PropTypes.string,
    longTitle: PropTypes.string,
    featuredImage: PropTypes.string,
    mainPoints: PropTypes.string,
    resources: PropTypes.string,
    legacypdf: PropTypes.string,
    date: PropTypes.string,
    translation: PropTypes.string,
    language: PropTypes.string,
    publicationType: PropTypes.string,
    title: PropTypes.string,
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
