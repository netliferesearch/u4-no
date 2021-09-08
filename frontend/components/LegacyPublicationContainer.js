import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../helpers/redux-store';
import Image from 'next/image';
import sanityImageLoader from '../helpers/sanityImageLoader';
import Footer from '../components/general/footer/Footer';
import Layout from './Layout';
import PublicationArticleHeader from './PublicationArticleHeader';
import PdfViewer from './PdfViewer';
import PublicationNotification from './PublicationNotification';
import RecommendedResources from './RecommendedResources';
import { ArticleHeader } from './general/article-header/ArticleHeader';
import { BreadCrumbV2 } from './general/BreadCrumbV2';
import { SEARCH_PUBLICATIONS } from '../helpers/constants';
import { PublicationContent } from './publication/PublicationContent';
import { ArticleSidebar } from './general/article-sidebar/ArticleSidebar';
import { PostCarousel } from './front-page/PostCarousel';
import { POST_TYPE } from './general/post/Post';
import { Cite } from './Cite';
import { ArticleActions } from './general/article-actions/ArticleActions';
import { AboutAuthor } from './blog/AboutAuthor';
import { Disclaimers } from './Disclaimers';
import { Keywords } from './Keywords';

const LegacyPublicationContainer = props => {
  const {
    data: {
      _type,
      lead = '',
      abstract = '',
      featuredImage = {},
      legacypdf = {},
      date = {},
      authors = [],
      publicationType = {},
      title = '',
      recommendedResources = [],
      relatedResources = [],
      updatedVersion = false,
      headsUp = false,
      keywords = [],
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
      <article className="u-relative c-legacy-publication-container">
        <section className="o-wrapper-medium">
          <BreadCrumbV2 home={true} title="Publications" parentSlug={SEARCH_PUBLICATIONS} />
          {_type === 'publication' && (
            <ArticleHeader
              data={props.data}
              shortversion={false}
              //readerOpen={readerOpen}
              //setReaderOpen={setReaderOpen}
            />
          )}
        </section>

        <hr className="u-section-underline--no-margins" />

        <section className="o-wrapper-medium">
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
        {/* <div className="c-longform-grid">
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
            {!lead && abstract && (
              <div className="c-article" dangerouslySetInnerHTML={{ __html: abstract }} />
            )}
          </div>
        </div> */}
        {legacypdf.asset && <PdfViewer file={{ url: legacypdf.asset.url }} />}
        {/* {(recommendedResources.length > 0 || relatedResources.length > 0) && (
          <div className="o-wrapper">
            <h2>We also recommend</h2>
            <RecommendedResources
              resources={recommendedResources.length > 0 ? recommendedResources : relatedResources}
            />
          </div>
        )} */}
        <section className="u-bg--blue">
          <div className="o-wrapper-medium">
            <div className="o-wrapper-narrow">
              <Cite {...props.data} />
            </div>
          </div>
        </section>
        <section className="u-bg--lighter-blue c-article__additional-content">
          <div className="o-wrapper-medium">
            <div className="o-wrapper-narrow">
              <ArticleActions data={props.data} />
              <AboutAuthor authors={authors} />
              <Disclaimers title={true} />
              {keywords.length > 0 ? <Keywords title={true} keywords={keywords} hr={true} /> : null}
            </div>
          </div>
        </section>
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

// const LegacyPublicationContainer = props => {
//   const {
//     data: {
//       lead = '',
//       abstract = '',
//       featuredImage = {},
//       legacypdf = {},
//       date = {},
//       publicationType = {},
//       title = '',
//       recommendedResources = [],
//       relatedResources = [],
//       updatedVersion = false,
//       headsUp = false,
//     } = {},
//     BreadCrumbComponent = null,
//     isArticleMenuOpen,
//     showLoadingScreen,
//     url = { asPath: '' },
//   } = props;
//   const pubyear = date && date.utc ? new Date(date.utc).getFullYear() : '';

//   return (
//     <Layout
//       headComponentConfig={{
//         title,
//         url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
//       }}
//       showLoadingScreen={showLoadingScreen}
//       showTopTab={!isArticleMenuOpen}
//     >
//       <article className="u-relative">
//         {BreadCrumbComponent && BreadCrumbComponent}
//         <div className={`c-hero ${publicationType._id === 'pubtype-3' ? 'c-hero-no-image' : ''}`}>
//           <div className="c-hero-image">
//             {featuredImage.asset && featuredImage.asset.url && (
//               <Image
//                 loader={sanityImageLoader}
//                 src={featuredImage.asset.url}
//                 alt=""
//                 layout="fill"
//                 objectFit="cover"
//                 priority="true"
//               />
//             )}
//           </div>
//           <div className="c-hero-bg" />
//           <div className="c-hero-sideText">
//             {featuredImage && featuredImage.sourceUrl && (
//               <a href={featuredImage.sourceUrl}>
//                 {featuredImage.credit ? featuredImage.credit : featuredImage.sourceUrl}
//               </a>
//             )}
//             {featuredImage && !featuredImage.sourceUrl && featuredImage.credit && (
//               <span>{featuredImage.credit}</span>
//             )}
//           </div>
//           <div className="c-hero-header">
//             <PublicationArticleHeader
//               className="c-hero__grid-container__content links-wrapper-dark-background"
//               {...props.data}
//             />
//           </div>
//         </div>
//         <div className="c-longform-grid">
//           <div className="c-longform-grid__standard">
//             <PublicationNotification
//               headsUp={headsUp}
//               updatedVersion={updatedVersion}
//               date={date}
//             />

//             {lead && (
//               <div className="c-article">
//                 <p>{lead}</p>
//               </div>
//             )}
//             {/* Legacy publication abstracts come with html included
//                 so we go and render it out.
//                */}
//             {!lead && abstract && (
//               <div className="c-article" dangerouslySetInnerHTML={{ __html: abstract }} />
//             )}
//           </div>
//         </div>
//         {legacypdf.asset && <PdfViewer file={{ url: legacypdf.asset.url }} />}
//         {(recommendedResources.length > 0 || relatedResources.length > 0) && (
//           <div className="o-wrapper">
//             <h2>We also recommend</h2>
//             <RecommendedResources
//               resources={recommendedResources.length > 0 ? recommendedResources : relatedResources}
//             />
//           </div>
//         )}

//         <Footer />
//       </article>
//     </Layout>
//   );
// };

// LegacyPublicationContainer.propTypes = {
//   data: PropTypes.shape({
//     _type: PropTypes.string,
//     abstract: PropTypes.string,
//     date: PropTypes.object,
//     featuredImage: PropTypes.string,
//     language: PropTypes.string,
//     lead: PropTypes.string,
//     legacypdf: PropTypes.object,
//     longTitle: PropTypes.string,
//     mainPoints: PropTypes.string,
//     publicationType: PropTypes.object,
//     recommendedResources: PropTypes.array,
//     relatedResources: PropTypes.array,
//     resources: PropTypes.string,
//     title: PropTypes.string,
//     translation: PropTypes.string,
//   }).isRequired,
//   url: PropTypes.shape({
//     asPath: PropTypes.string,
//   }).isRequired,
// };

// export default connect(
//   state => state,
//   dispatch => ({
//     toggleArticleMenu: bindActionCreators(toggleArticleMenu, dispatch),
//     toggleLoadingScreen: bindActionCreators(toggleLoadingScreen, dispatch),
//   })
// )(LegacyPublicationContainer);
