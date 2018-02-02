import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Head from 'next/head';
import BEMHelper from 'react-bem-helper';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../serializers';
import { get } from 'lodash';
import bibliographicReference from '../../helpers/bibliographicReference';
import { toggleArticleMenu, toggleLoadingScreen } from '../../helpers/redux-store';
import { PrintLongformArticle } from './';
import {
  CreativecommonsCC,
  CreativecommonsBY,
  CreativecommonsNC,
  CreativecommonsND,
  CmiLogo,
} from '../icons';
import { Footer, ToggleBlock, AuthorList, EditorList, Logo } from '../';

const classes = BEMHelper({
  name: 'print',
  prefix: 'c-',
});

const renderCaption = (caption) => {
  if (Array.isArray(caption)) {
    return <BlockContent blocks={caption} />;
  }
  return <em>{caption}</em>;
};

const LongFormArticleContainer = (props) => {
  console.log('props', props);
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
    keywords = [],
    legacypdf = {},
    reference = '',
    publicationNumber = '',
    featuredImage = {},
    partners = [],
    notes = [],
    acknowledgements = '',
    institutions = [],
  } = props;
  return (
    <article className="u-relative u-print-width o-wrapper-page">
      <div {...classes('front')}>
        <div {...classes('front-logo-top')}>
          <Logo />
        </div>
        {featuredImage.asset && (
          <figure {...classes('front-image')}>
            <img src={featuredImage.asset.url} alt={featuredImage.credit} />
          </figure>
        )}
        <div {...classes('front-text')}>
          <div {...classes('meta')}>
            <p {...classes('meta-inline', null, 'c-print__publication-type-and-number')}>
              {publicationType.title} {publicationNumber}
            </p>
            <br />
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
                  <EditorList editors={editors.map(({ target }) => target)} intro="Series editor" />
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
        { partners &&
        <div className="page2__partners">
          <h2>
            {
              partners.map(({ _key = '', institution = {}, description = '' }, index) => (
                <span key={_key + index}>
                  {description && <span>{description} </span>}
                  <span>{institution.name}</span>
                  {(partners.length === index + 1) ? '.' : (partners.length - 1 > index + 1) ? ', ' : ' and '}
                </span>
              ))
            }
            {
              partners.map(({ _key = '', institution = {}, description = '' }, index) => get(institution, 'logo.asset.url') && <img className="page2__partner-logo" alt="Partner Logo" src={institution.logo.asset.url} />)
            }
          </h2>
        </div>
        }
        <div className="page2__disclaimer">
          <h2>Disclaimer</h2>
          <p>
            All views in this text are the author(s)’, and may differ from the U4 partner agencies’
            policies.
          </p>

        </div>
        {
          institutions.length && (
            <div className="page2__funding-partners">
              <h2>Partner Agencies that fund U4</h2>
              <p>
                {institutions.map((inst, index) =>
                  (<span>
                    {` ${inst.name}`}<br />
                  </span>))}
              </p>
            </div>)
        }
        <div className="page2__about-u4" />
        { featuredImage &&
        <div className="page2__coverphoto">
          <h2>Cover photo</h2>
          {featuredImage.caption && renderCaption(featuredImage.caption) }
          <p>{featuredImage.credit && <span>{featuredImage.credit} {featuredImage.license && `(${featuredImage.license})`} </span>}
            {featuredImage.sourceUrl && <a href={featuredImage.sourceUrl}>{featuredImage.sourceUrl}</a>}
          </p>
        </div>
        }
        { Array.isArray(reference) &&
          <div className="page2__bibliographic-reference">
            <h2>Publisher and bibliographic reference</h2>
            <p>{Array.isArray(reference) && <BlockContent blocks={reference.filter(ref => ref)} serializers={serializers} />}</p>
          </div>
        }

        { keywords &&
        <div className="page2__keywords">
          <h2>Keywords</h2>
          <p>
            {
              keywords.map(({ target: { _id = '', keyword = '' } = {} }, index) => <span key={_id + index}>{keyword} {index + 1 < keywords.length && ' - '}</span>)
            }
          </p>
        </div>
        }
        {
          publicationType &&
          <div className="page2__publication-type">
            <h2>Publication type</h2>
            <p>{publicationType.title}</p>
            {publicationType.description && <BlockContent blocks={publicationType.description} serializers={serializers} />}
          </div>
        }
        {
          notes.length > 0 &&
          <div className="page2__publication-notes">
            <h2>Notes</h2>
            {notes && <BlockContent blocks={notes} serializers={serializers} />}
          </div>
        }
        <div className="page2__about-the-autors" />
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
        </div>
      )}
      {_type !== 'publication' && (
        <div className="c-longform-grid">
          <h1 className="c-longform-grid__standard">{longTitle || title}</h1>
          {lead && <div className="c-article c-longform-grid__standard">{lead}</div>}
          <div className="c-longform-grid__sidebar-right" />
        </div>
      )}

      <PrintLongformArticle {...props} />

      {props.references ? (
        <div className="c-longform-grid">
          <div className="c-longform-grid__standard">
            <h3>References</h3>
            {typeof props.references === 'string' && <p>{props.references}</p>}
            {typeof props.references !== 'string' && (
              <BlockContent blocks={props.references} serializers={serializers} />
            )}
          </div>
        </div>
      ) : null}

      <span id="js-bottom" />
      <Footer />
      <Head>
        <link rel="icon" type="image/png" href="/static/favicon.png" />
      </Head>
    </article>
  );
};

export default connect(
  state => state,
  dispatch => ({
    toggleArticleMenu: bindActionCreators(toggleArticleMenu, dispatch),
    toggleLoadingScreen: bindActionCreators(toggleLoadingScreen, dispatch),
  }),
)(LongFormArticleContainer);
