import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleArticleMenu, toggleLoadingScreen } from '../../helpers/redux-store';
import { PrintLongformArticle } from './';
import { CreativecommonsCC, CreativecommonsBY, CreativecommonsNC, CreativecommonsND, CmiLogo } from '../icons';
import BEMHelper from 'react-bem-helper';
import {
  Footer,
  Layout,
  PublicationArticleHeader,
  TableOfContentsButton,
  TableOfContentsSidebar,
  TableOfContentsContent,
  CustomScrollSpy,
  ToggleBlock,
  PublicationDrawer,
  AuthorList,
  EditorList,
  Logo,

} from '../';

const classes = BEMHelper({
  name: 'print',
  prefix: 'c-',
});

const LongFormArticleContainer = (props) => {
  const {
    toggleArticleMenu,
    toggleLoadingScreen,
    isArticleMenuOpen,
    showLoadingScreen,
    lead = '',
    _type = '',
    longTitle = '',
    title = '',
    mainPoints = [],
    isPublicationDrawerOpen,
    resources = [],
    BreadCrumbComponent = null,
    subtitle = '',
    slug = {},
    topics = [],
    className = '',
    publicationType = {},
    authors = [],
    editors = [],
    shortVersion = [],
    pdfFile = {},
    legacypdf = {},
    reference = '',
    publicationNumber = '',
    partners = [],
  } = props;
  return (
    <article className="u-relative u-print-width o-wrapper-page">
      {console.log(partners)}
      <div {...classes('front')}>
        <div {...classes('front-logo-top')}>
          <Logo />
        </div>
        <figure {...classes('front-image')}>
          <img src={props.featuredImage.asset.url} alt={props.featuredImage.credit} />
        </figure>
        <div {...classes('front-text')}>
          <div {...classes('meta')}>
            <p {...classes('meta-inline', null, 'c-print__publication-type-and-number')}>{publicationType.title} {publicationNumber}</p><br />
          </div>
          <h1 {...classes('title')}>{title}</h1>
          <p {...classes('subtitle')}>{subtitle}</p>
          <div {...classes('meta')}>
            <p {...classes('float-left')}>
              {authors ? (
                <span>
                  <AuthorList authors={authors.map(({ target }) => target)} />
                  <br />
                </span>
              ) : null}
              {editors.length ? (
                <span>
                  <EditorList editors={editors.map(({ target }) => target)} />
                  <br />
                </span>
              ) : null}
            </p>
            <div {...classes('float-right')}>
              <CmiLogo />
            </div>
          </div>
        </div>

      </div>

      <div className="page2">

        <h2>Partners in this publication</h2>


        {props.partners.map(partner =>
          <img src={partner.institution.logo.asset.url} />)
        }
        <h2>Acknowledgments</h2>
        <p>{props.acknowledgements}</p>
        <h2>Publisher</h2>
        <p>U4 Anti-Corruption Resource Centre, Chr. Michelsen Institute, Bergen, Norway.</p>
        <h2>Disclaimer</h2>
        <p>All views in this text are the author(s)’, and may differ from the U4 partner agencies’ policies.</p>
        <h2>U4 partner agencies</h2>
        <p>The U4 Anti-Corruption Resource Centre is an institutional partnership of bilateral international development agencies/ministries of foreign affairs: Australian Government – Department of Foreign Affairs and Trade, Danida – Ministry of Foreign Affairs of Denmark, Ministry for Foreign Affairs of Finland, Germany – Federal Ministry for Economic Cooperation and Development and GIZ, Norad – The Norwegian Agency for Development Cooperation, Sida – Swedish International Development Cooperation Agency, Switzerland – Swiss Agency for Development and Cooperation, UK Aid – Department for International Development.</p>
        <h2>About U4</h2>
        <p>At U4, we work to reduce the harmful impact of corruption on society. We share research and evidence to help international development actors get sustainable results. U4 is a permanent centre at the Chr. Michelsen Institute (CMI) in Norway. CMI is a non-profit, multi-disciplinary research institute with social scientists specialising in development studies.</p>
        <h2>Cover photo</h2>
        <p>{props.featuredImage.caption.map(caption => caption.children[0].text)} {props.featuredImage.credit} {props.featuredImage.sourceUrl} <br />
        CIFOR CC BY-NC-SA
        </p>
        <h2>Creative commons</h2>
        <p><CreativecommonsCC className="page2-ccimage" />
          <CreativecommonsBY className="page2-ccimage" />
          <CreativecommonsNC className="page2-ccimage" />
          <CreativecommonsND className="page2-ccimage" /><br />
        CC BY-NC-ND 4.0
        </p>
        <h2>Online version</h2>
        <p>{props.relatedUrl.url}</p>
      </div>
      {_type === 'publication' && (
        <div className="c-longform-grid">
          <div className="c-longform-grid__standard">
            {lead && (
              <div className="c-article">
                <p>{lead}</p>
              </div>
            )}
            {mainPoints.length > 0 && (
              <div className="c-article c-article_mainPoints">
                <h2>Main points</h2>
                <ul className="c-article_mainPoints-list">
                  {mainPoints.map((mainPoint, index) => (
                    <li key={index} className="c-article_mainPoints-item">
                      <span className="c-article_mainPoints-firstWords">
                        {mainPoint
                          .split(' ')
                          .slice(0, 3)
                          .join(' ')}{' '}
                      </span>
                      <span className="c-article_mainPoints-lastWords">
                        {mainPoint
                          .split(' ')
                          .slice(3)
                          .join(' ')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {_type === 'publication' &&
              !isPublicationDrawerOpen && (
              <div className="c-longform-grid__sidebar-right">
                <TableOfContentsSidebar {...props} />
              </div>
            )}
        </div>
      )}
      {_type !== 'publication' && (
        <div className="c-longform-grid">
          <h1 className="c-longform-grid__standard">{longTitle || title}</h1>
          {lead && <div className="c-article c-longform-grid__standard">{lead}</div>}
          <div className="c-longform-grid__sidebar-right">
            <TableOfContentsSidebar alwaysFollow {...props} />
          </div>
        </div>
      )}

      <PrintLongformArticle {...props} />
      {props.references ? (
        <div className="c-longform-grid">
          <div className="c-longform-grid__standard">
            <div className="footnotes">
              <ol>
                <ToggleBlock title="References" active content={props.references} />
              </ol>
            </div>
          </div>
        </div>
      ) : null}
      {props.acknowledgements ? (
        <div className="c-longform-grid">
          <div className="c-longform-grid__standard">
            <ToggleBlock title="Acknowledgements" content={props.acknowledgements} />
          </div>
        </div>
      ) : null}
      {props.notes ? (
        <div className="c-longform-grid">
          <div className="c-longform-grid__standard">
            <ToggleBlock title="Notes" content={props.notes} />
          </div>
        </div>
      ) : null}
      {props.abstract ? (
        <div className="c-longform-grid">
          <div className="c-longform-grid__standard">
            <ToggleBlock title="Abstract" content={props.abstract} />
          </div>
        </div>
      ) : null}
      {props._type === 'publication' && (
        <div className="c-longform-grid">
          <div className="c-longform-grid__standard">
            <ToggleBlock title="Disclaimer" content="All views in this text are the author(s)’, and may differ from the U4 partner agencies’ policies." />
          </div>
        </div>
      )}
      <span id="js-bottom" />
      <Footer />
    </article>);
};


export default connect(
  state => state,
  dispatch => ({
    toggleArticleMenu: bindActionCreators(toggleArticleMenu, dispatch),
    toggleLoadingScreen: bindActionCreators(toggleLoadingScreen, dispatch),
  }),
)(LongFormArticleContainer);
