import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Head from 'next/head';
import BEMHelper from 'react-bem-helper';
import get from 'lodash/get';
import BlockContent from '@sanity/block-content-to-react';
import serializers from './printSerializers';
import { toggleArticleMenu, toggleLoadingScreen } from '../../helpers/redux-store';
import { translate, translateField, langCode } from '../../helpers/translate';
import dateToString from '../../helpers/dateToString';

import PrintLongformArticle from './PrintLongformArticle_v2';
import { Cite } from './PrintCite';
import CreativecommonsCC from '../icons/CreativecommonsCC';
import CreativecommonsBY from '../icons/CreativecommonsBY';
import CreativecommonsNC from '../icons/CreativecommonsNC';
import CreativecommonsND from '../icons/CreativecommonsND';
import CmiLogo from './icons/CmiLogo';
import Logo from './icons/Logo';
import LogoWhite from './icons/LogoWhite';

import LongformArticleContainer from '../LongformArticleContainer';
import Footer from '../general/footer/Footer';
import AuthorList from '../publication/AuthorList';
import EditorList from '../EditorList';
import { dateFormat } from 'highcharts';

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

const renderImageCredit = image => {
  const licenseText = image.license && image.license.toUpperCase().startsWith('BY') ? `CC-${image.license.toUpperCase()}` : image.license;
  return (
    image.credit ? (
    <span>
      {image.credit} { ` \u2013 license: ${licenseText}`}
    </span>
    ) : ('')
  )
}

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
    reference = [],
    publicationNumber = '',
    featuredImage = {},
    partners = [],
    notes = [],
    institutions = [],
    u4 = [],
    language = 'en',
    slug = {},
    shortSlug = {},
    date = {},
    updatedVersion = {}
  } = props;

  const lang = langCode(language);
  const trans = translate(language);
  const transField = translateField(language);

  return (
    <article className="u-relative u-print-width o-wrapper-page print_v2">

      <div className='front-cover'>


        <div className='front-cover-pubtype'>
          {publicationType.title} {publicationNumber}
        </div>

        <div className='front-cover-title-area'>
          <div className='front-cover-title'>{title}</div>
          <div className='front-cover-subtitle'>{subtitle}</div>
       </div>

       <div className='front-cover-authors-area'>
        {authors && 
          authors.map(person => (person.target ? person.target : person))
          .map(
              ({
                _id = Math.random(),
                firstName = '',
                surname = '',
              }) => (
                <div key={_id} className="front-cover-authorname">
                  {`${firstName} ${surname}`}
                </div>
              )
            )}
        {editors.length ? (<div className="front-cover-editorintro">Series editor</div>) : null }
        {editors && 
          editors.map(person => (person.target ? person.target : person))
          .map(
              ({
                _id = Math.random(),
                firstName = '',
                surname = '',
              }) => (
                <div key={_id} className="front-cover-authorname">
                  {`${firstName} ${surname}`}
                </div>
              )
            )}
        </div>

        <div className='cover-u4-logo'>
          <Logo />
        </div>

        <div className='cover-cmi-logo'>
          <CmiLogo />
        </div>

        <div className='front-cover-logos-area'>
        {partners.map(
                ({ _id = '', institution = {} }, index) =>
                  get(institution, 'logo.asset.url') && (
                    <img
                      key={_id + index}
                      className="cover-partner-logo"
                      alt="Partner Logo"
                      src={institution.logo.asset.url}
                    />
                  )
              )}         
        </div>

        {featuredImage.asset && (
          <img className='front-cover-image' src={featuredImage.asset.url} alt={`${featuredImage.altText} ${featuredImage.credit}`}  />
        )}
        <div className="front-cover-art-left artifact">
          <svg width="80" height="556" viewBox="0 0 80 556" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" >
          <path d="M0 556C9.74132 548.984 19.0259 540.936 27.8453 531.857C62.5134 495.92 79.9208 450.163 79.9208 394.594V0H0.147894L0.140173 372.705C0.140173 376.336 0.0935015 379.889 0 383.363V556Z" fill="#0079CF"/>
          </svg>
        </div>

        <div className="front-cover-art-right artifact">
          <svg width="164" height="227" viewBox="0 0 164 227" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" >
          <path d="M164 0L0 226.266H164V169.665H113.146L164 99.5322V0Z" fill="#162063"/>
          </svg>
        </div>

      </div>

      <div className='front-inside'>
      
        <div className='inside-left inside-background'>

          <div className='front-inside-about'>
            <div className='line-above'>
              <BlockContent
                blocks={transField(u4, 'about')}
                serializers={serializers(transField(u4, 'about'))}
              />
            </div>
            <div className='inside-text'>
            <a href="https://www.u4.no" title="Homepage - U4 Anti-Corruption Resource Centre">www.u4.no</a>
          </div>

          <div className='inside-text'>
            <a href="mailto:u4@cmi.no" title="Send e-mail to U4 Anti-Corruption Resource Centre">u4@cmi.no</a>
          </div>

          </div>


          <div className='inside-heading line-above'>
            Read online
          </div>
          
          <div className='inside-text'>
            {shortSlug.current ? `www.u4.no/r/${shortSlug.current}` : `www.u4.no/publications/${slug.current}` }
          </div>

        </div>

        <div className='inside-right'>

          { partners.length >0 && (
            <div className="front-inside-notes">
              <div className='inside-heading line-above'>{trans('collaborators')}</div>
          
              {partners.map(({ _id = '', institution = {}, description = '' }, index) => (
                <div key={_id + index} className='inside-text'>
                  {description && <span>{description} </span>}
                  {!description && institution.name && <span>{institution.name}</span>}
                  {partners.length === index + 1
                    ? ''
                    : partners.length - 1 > index + 1
                    ? ', '
                    : ` ${trans('and')} `}
                </div>
              ))}
              {partners.map(
                ({ _id = '', institution = {}, description = '' }, index) =>
                  get(institution, 'logo.asset.url') && (
                    <img
                      key={_id + index}
                      className="cover-partner-logo"
                      alt={institution.name}
                      src={institution.logo.asset.url}
                    />
                  )
              )}
            </div>
          )}


          {notes.length > 0 && (
            <div className="front-inside-notes">
              <div className='inside-heading line-above'>{trans('notes')}</div>
              <div className='inside-text'>
                {notes && <BlockContent blocks={notes} serializers={serializers(notes)} />}
              </div>
            </div>
          )}
        </div>

      </div>


      <div className='main-points'>

        <div className="two-columns column-fill-auto">
        {lead && (
          <p className='main-points-lead'>{lead}</p>
            )}
            {mainPoints.length > 0 && (
              <div className="">
                <div className='inside-heading'>{trans('main_points')}</div>
                <ul className="main-points-list">
                  {mainPoints.map((mainPoint, index) => (
                    <li key={index} className="main-points-list-item">
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

      <PrintLongformArticle {...props} />

      <div className='back-inside'>
      
        <div className='inside-left'>

          {keywords && (
            <div className='margin-below'>
              <div className='inside-heading line-above'>
                {trans('keywords')}
              </div>
              <div className='inside-text'>
                  {keywords.map(({ target: { _id = '', keyword = '' } = {} }, index) => (
                    <span key={_id + index}>
                      {keyword} {index + 1 < keywords.length && ' \u2013 '}
                    </span>
                  ))}
              </div>
            </div>
          )}

          <div className='inside-heading line-above'>
            How to cite
          </div>
          <div className='back-inside-details'>
            <Cite {...props} />
          </div>

          <div className='back-inside-details'>
            <div className='back-inside-details-heading'>
              Publication
            </div>
            <div className='back-inside-details-content'>
            {date ? (
                <div>First published
                  {' ' + dateToString({ start: date.utc })}
                </div>
              ) : null}
              {updatedVersion?.date ? (
                <div>
                  Updated {dateToString({ start: updatedVersion.date.utc })}
                </div>
              ) : null}
            </div>
          </div>

          <div className='back-inside-details'>
            <div className='back-inside-details-heading'>
              {trans('disclaimer')}
            </div>
            <div className='back-inside-details-content'>
              {trans('disclaimer_text')}
            </div>
          </div>

          {featuredImage && (
            <div className='back-inside-details'>
              <div className='back-inside-details-heading'>
                {trans('cover_photo')}
              </div>
              <div className='back-inside-details-content'>
                {featuredImage.caption && renderCaption(featuredImage.caption)}
                <div>
                  <div>{renderImageCredit(featuredImage)}</div>
                  {featuredImage.sourceUrl && (
                    <div>
                      <a href={featuredImage.sourceUrl} title="Link to the original source">{featuredImage.sourceUrl}</a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className='back-inside-details'>
            <div className='back-inside-details-heading'>{trans('creative_commons')}</div>
            <div className='back-inside-details-content'>
              {trans('creative_commons_text')} ({trans('creative_commons_licenses')})
            </div>
          </div>

          <div className='back-inside-cc-logos'>
            <CreativecommonsCC className="back-inside-cc-logo" />
            <CreativecommonsBY className="back-inside-cc-logo" />
            <CreativecommonsNC className="back-inside-cc-logo" />
            <CreativecommonsND className="back-inside-cc-logo" />
          </div>

        </div>

        <div className='inside-right inside-background'>

          {institutions.length && (
            <div>
              <div className="inside-heading line-above">{trans('u4_partner_agencies')}</div>
              <div className='inside-text'>
                {institutions.map((inst, index) => (
                  <p key={inst._id}>
                    {transField(inst, 'name')}
                    {lang !== 'en' && inst[`name_${lang}`] && `(${inst.name})`}
                    <br />
                  </p>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>


      <div className='back-cover'>

        <div className='back-cover-content-area'>
          <div className='back-cover-content'>
            <div className='line-above'>
              <BlockContent
                blocks={transField(u4, 'about')}
                serializers={serializers(transField(u4, 'about'))}
              />
            </div>

            <div className='back-cover-u4-logo'>
              <LogoWhite />
            </div>

          </div>
        </div>

        <div className='back-cover-art artifact'>
          <svg width="280" height="591" viewBox="0 0 280 591" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" >
          <path d="M280 482.481C262.245 501.603 239.771 512.768 212.496 515.975C203.911 517.229 188.781 517.608 178.496 515.975C146.375 512.198 121.068 497.385 102.129 471.535C87.2778 450.522 79.8521 417.42 79.8521 372.075V0H0V393.985C0 449.609 17.4247 495.404 52.1272 531.385C75.7644 555.718 102.74 572.652 132.891 582.171C164.371 593.943 227.131 593.943 258.109 582.171C265.603 579.805 272.901 576.981 280 573.699V482.481Z" fill="#0078CF"/>
          </svg>
        </div>

        <div className='back-cover-footer-left'>
          www.u4.no
        </div>

        <div className='back-cover-footer-right'>
          u4@cmi.no
        </div>

      </div>

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
