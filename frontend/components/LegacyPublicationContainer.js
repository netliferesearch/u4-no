import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Document } from 'react-pdf/build/entry.noworker';
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
    mainPoints = [],
    isPublicationDrawerOpen,
    resources = [],
    BreadCrumbComponent = null,
    legacypdf = {},
  } = props;
  return (
    <Layout showLoadingScreen={showLoadingScreen} showTopTab={!isArticleMenuOpen}>
      <article className="u-relative">
        {BreadCrumbComponent && BreadCrumbComponent}
        <div className="c-hero">
          <div className="c-hero-bg" />
          <div className="c-hero-header">
            <PublicationArticleHeader
              className="c-hero__grid-container__content links-wrapper-dark-background"
              {...props}
            />
          </div>
        </div>
        <div className="c-longform-grid">
          <div className="c-longform-grid__standard">
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
          <div className="c-longform-grid__larger">
            <Document
              file={{
                url: legacypdf.asset.url,
              }}
            />
          </div>
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
