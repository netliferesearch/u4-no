import React from 'react';
import BEMHelper from 'react-bem-helper';
import { getRouteByType } from '../../helpers/getRouteByType';
import { Link } from '../../routes';
import LogoU4 from '../icons/LogoU4';
import { CloseButton } from './buttons';
import { Contents } from './Contents';
import { PhotoCaptionCredit } from './PhotoCaptionCredit';

const classes = BEMHelper({
  name: 'publicationHeader',
  prefix: 'c-',
});

export const LongformArticleHeader = ({ data = '', setReaderOpen = null, readerOpen = false }) => {
  const {
    title = '',
    subtitle = '',
    featuredImage = {},
    summary = '',
    content = '',
    className = '',
    publicationType = {},
    pdfFile = {},
    legacypdf = {},
    slug = '',
  } = data;
  const pdfAsset = legacypdf.asset ? legacypdf.asset : pdfFile.asset;

  return (
    <header className="c-publicationHeader c-lAHader">
      <div className="c-lAHader__top">
        <div className="c-lAHeader__top-content">
          <LogoU4 />
          <div className="c-lAHeader__close">
            <CloseButton onClick={e => setReaderOpen(false)}>
              <span className="u-headline--5 c-btn__label">Close Publication</span>
            </CloseButton>
          </div>
        </div>
        <hr className="u-section-underline--no-margins" />
      </div>
      <div className="c-article-header__container">
        <div {...classes('content')}>
          <Link route={getRouteByType(publicationType.title)}>
            <a className="c-btn--sen">
              <h6>{publicationType.title && `${publicationType.title}`}</h6>
            </a>
          </Link>

          <h2 className="u-headline--black--44">{title}</h2>
          {subtitle ? <p {...classes('subtitle')}>{subtitle}</p> : null}
        </div>
        {featuredImage.asset && (
          <div className="c-lAHader__featured-image">
            <figure
              className="c-lAHader__featured-image--bg"
              style={{ backgroundImage: `url('${featuredImage.asset.url}?w=1072')` }}
            >
              <img
                className="u-visually-hidden-v2"
                src={`${featuredImage.asset.url}?w=1072`}
                alt={featuredImage.altText}
              />
            </figure>
            {/* <figcaption className="">
              <PhotoCaptionCredit featuredImage={featuredImage} />
            </figcaption> */}
          </div>
        )}
        <div className="u-sticky">
          <hr className="u-section-underline--no-margins" />

          <div className="c-publicationHeader__actions o-wrapper-section">
            <Contents title={title} content={content} setReaderOpen={setReaderOpen} />
            {pdfAsset && (
              <a
                href={`/publication/${slug.current}.pdf`}
                //download={`/publication/${slug.current}.pdf`}
                target="_blank"
                className="c-btn c-btn--qua"
              >
                <span>Download as PDF</span>
              </a>
            )}
            {summary.length > 0 && (
              <Link route="publication.shortVersion" params={{ slug: slug.current }}>
                <a className="c-btn c-btn--qua">
                  <span {...classes('button-text')}>Read short version</span>
                  {/* <div {...classes('button-icon')} /> */}
                </a>
              </Link>
            )}
          </div>

          <hr className="u-section-underline--no-margins" />
        </div>
      </div>
    </header>
  );
};
