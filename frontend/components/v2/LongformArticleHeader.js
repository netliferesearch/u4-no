import React, { useState } from 'react';
import BEMHelper from 'react-bem-helper';
import { getRouteByType } from '../../helpers/getRouteByType';
import { Link } from '../../routes';
import LogoU4 from '../icons/LogoU4';
import { CloseButton } from './buttons';
import { Contents } from './Contents';
import { PhotoCaptionCredit } from './PhotoCaptionCredit';

const classes = BEMHelper({
  name: 'article-header-v2',
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
    <header {...classes('', null, className)}>
      <div className="c-header--reader__top">
        <div className="c-header--reader__top">
          <LogoU4 />
          <CloseButton onClick={e => setReaderOpen(false)} />
        </div>
        <hr className="u-section-underline--no-margins" />
      </div>
      <div className="o-wrapper-section c-article-header__container">
        <div {...classes('content')}>
          <Link route={getRouteByType(publicationType.title)}>
            <a className="c-btn--sen">
              <h6>{publicationType.title && `${publicationType.title}`}</h6>
            </a>
          </Link>

          <h2 className="u-headline--black--44">{title}</h2>
          {subtitle ? <p {...classes('subtitle')}>{subtitle}</p> : null}
          {console.log(featuredImage)}
          {featuredImage.asset && (
            <img
              className=""
              src={`${featuredImage.asset.url}?w=1072`}
              alt={featuredImage.credit}
            />
            //   <div
            //   className="c-blog-entry__featured-image c-blog-entry__featured-image--bg u-hidden--tablet"
            //   style={{ backgroundImage: `url('${featuredImage.asset.url}?w=1072')` }}
            // />
          )}
          <figcaption className="">
            <PhotoCaptionCredit featuredImage={featuredImage} />
          </figcaption>
          <hr className="u-section-underline--no-margins" />

          <div {...classes('actions')}>
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
        </div>
        <hr className="u-section-underline--no-margins" />
      </div>
    </header>
  );
};
