import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Head from 'next/head';
import BEMHelper from 'react-bem-helper';
import { get } from 'lodash';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../printSerializers';
import { toggleArticleMenu, toggleLoadingScreen } from '../../helpers/redux-store';
import { PrintLongformArticle } from './';
import {
  CreativecommonsCC,
  CreativecommonsBY,
  CreativecommonsNC,
  CreativecommonsND,
  CmiLogo,
} from '../icons';
import { Footer, AuthorList, EditorList, LongformArticleContainer, Logo } from '../';
import translate from '../../helpers/translate';

const classes = BEMHelper({
  name: 'print',
  prefix: 'c-',
});

const renderCaption = caption => {
  if (Array.isArray(caption)) {
    return <BlockContent blocks={caption} />;
  }
  return <em>{caption}</em>;
};

const LongFormArticleContainer = props => {
  const {
    lead = '',
    _type = '',
    longTitle = '',
    title = '',
    mainPoints = [],
    subtitle = '',
    publicationType = {},
    authors = [],
    editors = [],
    keywords = [],
    reference = '',
    publicationNumber = '',
    featuredImage = {},
    partners = [],
    notes = [],
    institutions = [],
    u4 = [],
    language = 'en_US',
  } = props;

  const __ = translate(language);

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
                  <AuthorList authors={authors.map(({ target }) => target)} intro={__('by')} />
                  <br />
                </span>
              ) : null}
              {editors ? (
                <span>
                  <EditorList
                    editors={editors.map(({ target }) => target)}
                    intro={
                      publicationType._id === 'pubtype-3' ? __('reviewed_by') : __('series_editor')
                    }
                    pluralize={publicationType._id !== 'pubtype-3'}
                  />
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
        {partners && (
          <div className="page2__partners">
            <h2>
              {partners.map(({ _id = '', institution = {}, description = '' }, index) => (
                <div key={_id + index}>
                  {description && <span>{description} </span>}
                  <span>{institution.name}</span>
                  {partners.length === index + 1
                    ? '.'
                    : partners.length - 1 > index + 1
                    ? ', '
                    : ' ' + __('and') + ' '}
                </div>
              ))}
              {partners.map(
                ({ _id = '', institution = {}, description = '' }, index) =>
                  get(institution, 'logo.asset.url') && (
                    <img
                      key={_id + index}
                      className="page2__partner-logo"
                      alt="Partner Logo"
                      src={institution.logo.asset.url}
                    />
                  )
              )}
            </h2>
          </div>
        )}
        <div className="page2__disclaimer">
          <h2>{__('disclaimer')}</h2>
          <p>{__('disclaimer_text')}</p>
        </div>
        {institutions.length && (
          <div className="page2__funding-partners">
            <h2>{__('partner_agencies')}</h2>
            <p>
              {institutions.map(({ _id, name }, index) => (
                <span key={_id + index}>
                  {` ${name}`}
                  <br />
                </span>
              ))}
            </p>
          </div>
        )}
        <div className="page2__about-u4">
          <h2>{__('about_u4')}</h2>
          {u4.about && <BlockContent blocks={u4.about} serializers={serializers(u4.about)} />}
        </div>
        {featuredImage && (
          <div className="page2__coverphoto">
            <h2>{__('cover_photo')}</h2>
            {featuredImage.caption && renderCaption(featuredImage.caption)}
            <p>
              {featuredImage.credit && (
                <span>
                  {featuredImage.credit} {featuredImage.license && `(CC ${featuredImage.license})`}{' '}
                </span>
              )}
              {featuredImage.sourceUrl && (
                <a href={featuredImage.sourceUrl}>{featuredImage.sourceUrl}</a>
              )}
            </p>
          </div>
        )}
        {Array.isArray(reference) && (
          <div className="page2__bibliographic-reference">
            <h2>{__('publisher_and_bibliographic_reference')}</h2>
            <p>
              {Array.isArray(reference) && (
                <BlockContent
                  blocks={reference.filter(ref => ref)}
                  serializers={serializers(reference.filter(ref => ref))}
                />
              )}
            </p>
          </div>
        )}

        {keywords && (
          <div className="page2__keywords">
            <h2>{__('keywords')}</h2>
            <p>
              {keywords.map(({ target: { _id = '', keyword = '' } = {} }, index) => (
                <span key={_id + index}>
                  {keyword} {index + 1 < keywords.length && ' - '}
                </span>
              ))}
            </p>
          </div>
        )}
        {publicationType && (
          <div className="page2__publication-type">
            <h2>{__('publication_type')}</h2>
            <p>{publicationType.title}</p>
            {publicationType.description && (
              <BlockContent
                blocks={publicationType.description}
                serializers={serializers(publicationType.description)}
              />
            )}
          </div>
        )}
        {notes.length > 0 && (
          <div className="page2__publication-notes">
            <h2>{__('notes')}</h2>
            {notes && <BlockContent blocks={notes} serializers={serializers(notes)} />}
          </div>
        )}
        <div className="page2__cc">
          <h2>{__('creative_commons')}</h2>
          <p>
            <CreativecommonsCC className="page2-ccimage" />
            <CreativecommonsBY className="page2-ccimage" />
            <CreativecommonsNC className="page2-ccimage" />
            <CreativecommonsND className="page2-ccimage" />
            <br />
            {__('creative_commons_text')}
          </p>
        </div>
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
                <h2>{__('main_points')}</h2>
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

      <span id="js-bottom" />
      <Footer />
      <Head>
        <link rel="icon" type="image/png" href="/static/favicon.png" />
      </Head>
    </article>
  );
};

LongformArticleContainer.propTypes = {
  lead: PropTypes.string,
  _type: PropTypes.string.isRequired,
  longTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  mainPoints: PropTypes.arrayOf(PropTypes.string),
  subtitle: PropTypes.string,
  publicationType: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
  editors: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.object),
  reference: PropTypes.arrayOf(PropTypes.object),
  publicationNumber: PropTypes.number,
  featuredImage: PropTypes.shape({
    asset: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
  language: PropTypes.string,
  partners: PropTypes.arrayOf(PropTypes.object),
  notes: PropTypes.arrayOf(PropTypes.object),
  institutions: PropTypes.arrayOf(PropTypes.object),
  u4: PropTypes.arrayOf(PropTypes.object),
};

export default connect(
  state => state,
  dispatch => ({
    toggleArticleMenu: bindActionCreators(toggleArticleMenu, dispatch),
    toggleLoadingScreen: bindActionCreators(toggleLoadingScreen, dispatch),
  })
)(LongFormArticleContainer);
