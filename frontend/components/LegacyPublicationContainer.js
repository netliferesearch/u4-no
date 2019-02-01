import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../routes';
import { connect } from 'react-redux';
import BlockContent from '@sanity/block-content-to-react';
import serializers from './serializers';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../helpers/redux-store';
import buildUrl from '../helpers/buildUrl';
import bibliographicReference from '../helpers/bibliographicReference';
import { Footer, Layout, PublicationArticleHeader, PdfViewer, PublicationNotification } from './';

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
              backgroundImage: `url(${featuredImage &&
                featuredImage.asset &&
                featuredImage.asset.url})`,
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
    legacypdf: PropTypes.object,
    date: PropTypes.object,
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
