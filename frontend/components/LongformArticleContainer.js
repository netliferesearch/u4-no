import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../helpers/redux-store';
import dateToString from '../helpers/dateToString';
import { AuthorList } from './AuthorList';
import TableOfContentsSidebar from './TableOfContents/TableOfContentsSidebar';
import { PublicationContent } from './publication/PublicationContent';
import { PublicationArticleHeader } from './publication/PublicationArticleHeader';
import { PublicationSidebar } from './publication/PublicationSidebar';
import { Layout } from './Layout';
import { AboutAuthor } from './AboutAuthor';
import { Disclaimers } from './Disclaimers';
import { Cite } from './Cite';
import { Keywords } from './Keywords';
import { Topics } from './Topics';
import { BreadCrumbV2 } from './BreadCrumbV2';
import { getRouteByType } from '../helpers/getRouteByType';
import { Partners } from './Partners';
import { Reader } from './publication/Reader';
import LongformArticle from './LongformArticle';
import TnrcFooter from './TnrcFooter';

const LongFormArticleContainer = (props = {}) => {
  console.log("LongFormArticleContainer V2")
  const {
    data: {
      lead = '',
      _type = '',
      longTitle = '',
      title = '',
      authors = [],
      date = {},
      standfirst = '',
      mainPoints = [],
      resources = [],
      methodology = [],
      references = [],
      featuredImage = {},
      relatedUrl = {},
      publicationType = {},
      articleType = [],
      recommendedResources = [],
      relatedResources = [],
      headsUp = [],
      updatedVersion = false,
      language = '',
    } = {},
    shortversion = false,
    headComponentConfigOverride,
    isArticleMenuOpen,
    showLoadingScreen,
    toggleArticleMenu,
    toggleLoadingScreen,
    isPublicationDrawerOpen,
    BreadCrumbComponent = null,
    url = {},
    translation = {},
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
      {console.log("LongFormArticleContainer V2 return")}
      {!isArticleMenuOpen && (
        <article className="c-article-v2">
          <span id="js-top" />
          <div id="js-scroll-trigger" className="o-wrapper u-side-padding">
            {_type === 'publication' && !shortversion && (
              <PublicationArticleHeader
                {...props.data}
                shortversion={shortversion}
                readerOpen={readerOpen}
                setReaderOpen={setReaderOpen}
              />
            )}
          </div>
          <section
            className="o-wrapper u-side-padding"
            style={{ display: readerOpen ? 'none' : 'block' }}
          >
            {!shortversion ? (
              <div className="o-wrapper-section c-article__row u-hidden--tablet">
                <BreadCrumbV2
                  title={`All ${publicationType.title}s`}
                  parentSlug={getRouteByType(publicationType.title)}
                  home={false}
                />
              </div>
            ) : null}
            {_type === 'publication' && !shortversion && (
              <div className="o-wrapper-section c-article__row">
                <div className="c-article__side c-article__col">
                  <PublicationSidebar data={props.data} side={'left'} />
                </div>
                <div className="content c-article__col c-article__center">
                  <PublicationContent {...props.data} />
                  <div className="c-article__additional-info-content">
                    <div className="u-hidden--desktop">
                      <Partners data={props.data} />
                    </div>
                    {topics.length > 0 || keywords.length > 0 ? (
                      <hr className="u-section-underline--no-margins u-hidden--desktop" />
                    ) : null}
                    {topics.length > 0 || keywords.length > 0 ? (
                      <h3 className="u-primary-heading tags">Tags</h3>
                    ) : null}
                    {topics.length > 0 ? <Topics title={true} topics={topics} hr={false} /> : null}
                    {keywords.length > 0 ? (
                      <Keywords title={true} keywords={keywords} hr={false} />
                    ) : null}
                    <AboutAuthor authors={authors} />
                    <Cite {...props.data} />
                    <Disclaimers title={true} />
                  </div>
                </div>
                <div className="c-article__side c-article__col">
                  <PublicationSidebar data={props.data} side={'right'} />
                </div>
              </div>
            )}

            {_type !== 'publication' && (
              <div>
                <div className="c-longform-grid u-bg-white u-z-index-x">
                  {articleType.length ? (
                    <h2 className="c-longform-grid__standard c-article-header__meta c-article-header__meta-uppercase">
                      {articleType[0].target.title}
                    </h2>
                  ) : null}
                  <h1 className="c-longform-grid__standard">{title || longTitle}</h1>
                  {authors.length ? (
                    <div className="c-article c-longform-grid__standard">
                      <AuthorList authors={authors} />
                      {date && date.utc && (
                        <span> (last update: {dateToString({ start: date.utc })})</span>
                      )}
                    </div>
                  ) : null}
                  {lead && <div className="c-article c-longform-grid__standard">{lead}</div>}
                </div>
                <div className="c-longform-grid">
                  <div className="c-longform-grid__sidebar-right">
                    <TableOfContentsSidebar alwaysFollow {...props.data} />
                  </div>
                </div>
              </div>
            )}
          </section>

          {shortversion && (
            <section className="c-article--shortversion o-wrapper u-side-padding">
              <div className="o-wrapper-section c-article__row">
                {BreadCrumbComponent && BreadCrumbComponent}
              </div>
              <div className="o-wrapper-section c-article__row">
                <LongformArticle content={shortversionContent} {...props.data} />
              </div>
            </section>
          )}

          <TnrcFooter publicationTypeId={publicationType._id} />

          {/* <span id="js-bottom" /> */}
        </article>
      )}
      {readerOpen && (
        <Reader
          data={props.data}
          setReaderOpen={setReaderOpen}
          legacypdf={legacypdf}
          shortversion={shortversion}
        />
      )}
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
)(LongFormArticleContainer);


// import React from 'react';
// import BlockToContent from '@sanity/block-content-to-react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import { toggleArticleMenu, toggleLoadingScreen } from '../helpers/redux-store';
// import dateToString from '../helpers/dateToString';

// import Footer from './Footer';
// import Layout from './Layout';
// import LongformArticle from './LongformArticle';
// import PublicationArticleHeader from './PublicationArticleHeader';
// import TableOfContentsButton from './TableOfContents/TableOfContentsButton';
// import TableOfContentsSidebar from './TableOfContents/TableOfContentsSidebar';
// import TableOfContentsBase from './TableOfContents/TableOfContentsBase';
// import RecommendedResources from './RecommendedResources';
// import ToggleBlock from './ToggleBlock';
// import AuthorList from './AuthorList';
// import PublicationNotification from './PublicationNotification';
// import TnrcHeader from './TnrcHeader';
// import TnrcFooter from './TnrcFooter';

// import CreativecommonsCC from './icons/CreativecommonsCC';
// import CreativecommonsBY from './icons/CreativecommonsBY';
// import CreativecommonsNC from './icons/CreativecommonsNC';
// import CreativecommonsND from './icons/CreativecommonsND';

// import { translate } from '../helpers/translate';

// const LongFormArticleContainer = (props = {}) => {
//   const {
//     data: {
//       lead = '',
//       _type = '',
//       longTitle = '',
//       title = '',
//       authors = [],
//       date = {},
//       standfirst = '',
//       mainPoints = [],
//       resources = [],
//       methodology = [],
//       references = [],
//       featuredImage = {},
//       relatedUrl = {},
//       publicationType = {},
//       articleType = [],
//       recommendedResources = [],
//       relatedResources = [],
//       headsUp = [],
//       updatedVersion = false,
//       language = '',
//     } = {},
//     shortversion = false,
//     headComponentConfigOverride,
//     isArticleMenuOpen,
//     showLoadingScreen,
//     toggleArticleMenu,
//     toggleLoadingScreen,
//     isPublicationDrawerOpen,
//     BreadCrumbComponent = null,
//     url = {},
//     translation = {},
//   } = props;

//   const trans = translate(language);

//   const headComponentConfig =
//     headComponentConfigOverride ||
//     Object.assign(
//       {
//         title,
//         description: lead || standfirst,
//         image:
//           featuredImage.asset && featuredImage.asset.url
//             ? `${featuredImage.asset.url}?w=1200&h=630&fit=min`
//             : '',
//         url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
//         ogp: relatedUrl.openGraph ? relatedUrl.openGraph : {},
//       },
//       relatedUrl
//     );
//   return (
//     <Layout
//       showLoadingScreen={showLoadingScreen}
//       showTopTab={!isArticleMenuOpen}
//       headComponentConfig={headComponentConfig}
//     >
//       {isArticleMenuOpen && (
//         <div
//           className={`c-article-nav-fullscreen ${
//             isArticleMenuOpen ? 'c-article-nav-fullscreen c-article-nav-fullscreen--open' : ''
//           }`}
//         >
//           <TableOfContentsButton {...props.data} />
//           <TableOfContentsBase
//             showAllItems
//             onItemSelected={e => {
//               const linkThatWasClicked = e.target;
//               // prevent this from triggering multiple times
//               if (!showLoadingScreen) {
//                 toggleLoadingScreen();
//                 setTimeout(() => {
//                   toggleArticleMenu();
//                   linkThatWasClicked.click();
//                   setTimeout(() => {
//                     toggleLoadingScreen();
//                   }, 1);
//                 }, 1);
//               }
//             }}
//             {...props.data}
//           />
//         </div>
//       )}

//       {!isArticleMenuOpen && (
//         <article>
//           {_type === 'publication' && !isPublicationDrawerOpen && (
//             <TableOfContentsButton {...props.data} />
//           )}
//           {/* <CustomScrollSpy {...props.data} /> */}

//           <span id="js-top" />
//           <div id="js-scroll-trigger">
//             {BreadCrumbComponent && BreadCrumbComponent}
//             {_type === 'publication' && !shortversion && (
//               <div
//                 className={`c-hero u-bg-white u-z-index-x ${
//                   publicationType._id === 'pubtype-3' ? 'c-hero-no-image' : ''
//                 }`}
//               >
//                 <div
//                   className="c-hero-image"
//                   style={{
//                     backgroundImage:
//                       featuredImage.asset && featuredImage.asset.url
//                         ? `url(${featuredImage.asset.url}?w=1120&q=80&crop=focalpoint&fit=scale)`
//                         : '',
//                     backgroundColor: '#0079CF',
//                   }}
//                 />
//                 <div className="c-hero-bg" />
//                 <div className="c-hero-sideText">
//                   {!featuredImage.sourceUrl && featuredImage.credit && (
//                     <div style={{ display: 'inline' }}>{featuredImage.credit}</div>
//                   )}
//                   {featuredImage.sourceUrl && (
//                     <a className="u-margin-left-tiny" href={featuredImage.sourceUrl}>
//                       {featuredImage.credit ? featuredImage.credit : featuredImage.sourceUrl}
//                     </a>
//                   )}
//                   {featuredImage.license && (
//                     <span>
//                       {' '}
//                       {featuredImage.license.startsWith('copyrighted') || 'CC'}{' '}
//                       {featuredImage.license.toUpperCase()}
//                     </span>
//                   )}
//                 </div>
//                 <div className="c-hero-header">
//                   <PublicationArticleHeader
//                     className="c-hero__grid-container__content links-wrapper-dark-background"
//                     {...props.data}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//           {_type === 'publication' && (
//             <div className="c-longform-grid">
//               <div className="c-longform-grid__standard">
//                 <PublicationNotification
//                   headsUp={headsUp}
//                   updatedVersion={updatedVersion}
//                   date={date}
//                 />
//                 <TnrcHeader publicationTypeId={publicationType._id} />
//                 {lead && (
//                   <div className="c-article">
//                     <p>{lead}</p>
//                   </div>
//                 )}
//                 {mainPoints.length > 0 && (
//                   <div className="c-article c-article_mainPoints">
//                     <h2>{trans('main_points')}</h2>
//                     <ul className="c-article_mainPoints-list">
//                       {mainPoints.map((mainPoint, index) => (
//                         <li key={index} className="c-article_mainPoints-item">
//                           <span className="c-article_mainPoints-firstWords">
//                             {mainPoint
//                               .split(' ')
//                               .slice(0, 3)
//                               .join(' ')}{' '}
//                           </span>
//                           <span className="c-article_mainPoints-lastWords">
//                             {mainPoint
//                               .split(' ')
//                               .slice(3)
//                               .join(' ')}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//               {_type === 'publication' && !isPublicationDrawerOpen && (
//                 <div className="c-longform-grid__sidebar-right">
//                   <TableOfContentsSidebar {...props.data} />
//                 </div>
//               )}
//             </div>
//           )}
//           {_type !== 'publication' && (
//             <div>
//               <div className="c-longform-grid u-bg-white u-z-index-x">
//                 {articleType.length ? (
//                   <h2 className="c-longform-grid__standard c-article-header__meta c-article-header__meta-uppercase">
//                     {articleType[0].target.title}
//                   </h2>
//                 ) : null}
//                 <h1 className="c-longform-grid__standard">{title || longTitle}</h1>
//                 {authors.length ? (
//                   <div className="c-article c-longform-grid__standard">
//                     <AuthorList authors={authors} language={language} />
//                     {date && date.utc && (
//                       <span> (last update: {dateToString({ start: date.utc })})</span>
//                     )}
//                   </div>
//                 ) : null}

//                 {lead && <div className="c-article c-longform-grid__standard">{lead}</div>}
//               </div>
//               <div className="c-longform-grid">
//                 <div className="c-longform-grid__sidebar-right">
//                   <TableOfContentsSidebar alwaysFollow {...props.data} />
//                 </div>
//               </div>
//             </div>
//           )}
//           <LongformArticle content={shortversion ? props.content : ''} {...props.data} />

//           <TnrcFooter publicationTypeId={publicationType._id} />

//           {!shortversion && props.data.methodology ? (
//             <div className="c-longform-grid">
//               <div className="c-longform-grid__standard">
//                 <ToggleBlock title={trans('methodology')} content={props.data.methodology} />
//               </div>
//             </div>
//           ) : null}
//           {!shortversion && props.data.references ? (
//             <div className="c-longform-grid">
//               <div className="c-longform-grid__standard">
//                 <ToggleBlock title={trans('references')} content={props.data.references} />
//               </div>
//             </div>
//           ) : null}
//           {!shortversion && props.data.acknowledgements ? (
//             <div className="c-longform-grid">
//               <div className="c-longform-grid__standard">
//                 <ToggleBlock
//                   title={trans('acknowledgements')}
//                   content={props.data.acknowledgements}
//                 />
//               </div>
//             </div>
//           ) : null}
//           {!shortversion && props.data.notes ? (
//             <div className="c-longform-grid">
//               <div className="c-longform-grid__standard">
//                 <ToggleBlock title={trans('notes')} content={props.data.notes}>
//                   {featuredImage.caption && (
//                     <div className="c-longform-grid__standard">
//                       <p>
//                         <b>Header image:</b>
//                       </p>
//                       <BlockToContent
//                         blocks={featuredImage.caption}
//                         serializers={{
//                           types: {
//                             block: props => <p style={{ display: 'inline' }}>{props.children}</p>,
//                           },
//                         }}
//                       />
//                     </div>
//                   )}
//                   <div className="c-longform-grid__standard">
//                     {!featuredImage.sourceUrl && featuredImage.credit && (
//                       <span>Photo: {featuredImage.credit} </span>
//                     )}

//                     {featuredImage.sourceUrl && (
//                       <span>
//                         Photo:
//                         <a className="u-margin-left-tiny" href={featuredImage.sourceUrl}>
//                           {featuredImage.credit ? featuredImage.credit : featuredImage.sourceUrl}
//                         </a>
//                       </span>
//                     )}
//                     {featuredImage.license && (
//                       <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
//                         {' '}
//                         {featuredImage.license.startsWith('copyrighted') || 'CC'}{' '}
//                         {featuredImage.license.toUpperCase()}
//                       </a>
//                     )}
//                   </div>
//                 </ToggleBlock>
//               </div>
//             </div>
//           ) : null}
//           {!shortversion && props.data.abstract ? (
//             <div className="c-longform-grid">
//               <div className="c-longform-grid__standard">
//                 <ToggleBlock title={trans('abstract')} content={props.data.abstract} />
//               </div>
//             </div>
//           ) : null}
//           {!shortversion && props.data._type === 'publication' && (
//             <div className="c-longform-grid">
//               <div className="c-longform-grid__standard">
//                 <ToggleBlock title={trans('disclaimer')} content={trans('disclaimer_text')} />
//               </div>
//             </div>
//           )}
//           {_type === 'publication' && (
//             <div className="c-longform-grid">
//               <div className="c-longform-grid__standard">
//                 <p>
//                   <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
//                     <CreativecommonsCC className="page2-ccimage" />
//                     <CreativecommonsBY className="page2-ccimage" />
//                     <CreativecommonsNC className="page2-ccimage" />
//                     <CreativecommonsND className="page2-ccimage" />
//                   </a>
//                   <br />
//                   {trans('creative_commons_text')} (
//                   <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
//                     {trans('creative_commons_licenses')}
//                   </a>
//                   )
//                 </p>
//               </div>
//             </div>
//           )}

//           {!shortversion && (recommendedResources.length > 0 || relatedResources.length > 0) && (
//             <div className="o-wrapper">
//               <h2>We also recommend</h2>
//               <RecommendedResources
//                 resources={
//                   recommendedResources.length > 0 ? recommendedResources : relatedResources
//                 }
//               />
//             </div>
//           )}
//           <span id="js-bottom" />
//           <Footer />
//         </article>
//       )}
//     </Layout>
//   );
// };

// export default connect(
//   state => state,
//   dispatch => ({
//     toggleArticleMenu: bindActionCreators(toggleArticleMenu, dispatch),
//     toggleLoadingScreen: bindActionCreators(toggleLoadingScreen, dispatch),
//   })
// )(LongFormArticleContainer);
