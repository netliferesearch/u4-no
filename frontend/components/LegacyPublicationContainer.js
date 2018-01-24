import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../helpers/redux-store';
import {
  Footer,
  Layout,
  LongformArticle,
  PublicationArticleHeader,
  TableOfContentsButton,
  TableOfContentsSidebar,
  TableOfContentsContent,
  CustomScrollSpy,
  ToggleBlock,
  PublicationDrawer,
  PdfViewer,
} from './';

const LegacyPublicationContainer = (props) => {
  const {
    toggleArticleMenu,
    toggleLoadingScreen,
    isArticleMenuOpen,
    showLoadingScreen,
    lead = '',
    abstract,
    _type = '',
    longTitle = '',
    title = '',
    featuredImage = {},
    mainPoints = [],
    isPublicationDrawerOpen,
    resources = [],
    BreadCrumbComponent = null,
    legacypdf = {},
    date = {},
    translation = {},
    language = '',
    publicationType = {},
    url = { asPath }
  } = props;
  const pubyear = date && date.utc ? new Date(date.utc).getFullYear() : '';

  return (
    <Layout
      headComponentConfig={{
        title: title,
        url: url.asPath ? `https://beta.u4.no${url.asPath}` : '',
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
              backgroundImage: `url(${props.featuredImage &&
                props.featuredImage.asset &&
                props.featuredImage.asset.url})`,
              backgroundColor: '#0079CF',
            }}
          />
          <div className="c-hero-bg" />
          <div className="c-hero-sideText">
            {props.featuredImage &&
              props.featuredImage.sourceUrl && (
                <a href={props.featuredImage.sourceUrl}>
                  {props.featuredImage.credit
                    ? props.featuredImage.credit
                    : props.featuredImage.sourceUrl}
                </a>
              )}
            {props.featuredImage &&
              !props.featuredImage.sourceUrl &&
              props.featuredImage.credit && <span>{props.featuredImage.credit}</span>}
          </div>
          <div className="c-hero-header">
            <PublicationArticleHeader
              className="c-hero__grid-container__content links-wrapper-dark-background"
              {...props}
            />
          </div>
        </div>
        <div className="c-longform-grid">
          <div className="c-longform-grid__standard">
            {date &&
              new Date().getFullYear() - pubyear > 5 && (
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
            file={{
              url: legacypdf.asset.url,
            }}
          />
        )}
      </article>
    </Layout>
  );
};

export default connect(
  state => state,
  dispatch => ({
    toggleArticleMenu: bindActionCreators(toggleArticleMenu, dispatch),
    toggleLoadingScreen: bindActionCreators(toggleLoadingScreen, dispatch),
  }),
)(LegacyPublicationContainer);
