import React, { useRef, useState } from 'react';
import BEMHelper from 'react-bem-helper';
import { getRouteByType } from '../../helpers/getRouteByType';
import { useScrollInfo } from '../../helpers/useScrollInfo';
import { Link } from '../../routes';
import LogoU4 from '../icons/LogoU4';
import { CloseButton } from './buttons';
import { Contents } from './Contents';
import { PhotoCaptionCredit } from './PhotoCaptionCredit';

const classes = BEMHelper({
  name: 'pubHeader',
  prefix: 'c-',
});

export const LongformArticleHeader = ({ data = '', setReaderOpen = null, targetRef = null }) => {
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
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useScrollInfo(
    ({ currPos }) => {
      const isScrolled = currPos.y < 70;
      if (scrolled !== isScrolled) {
        setScrolled(isScrolled);
      }
    },
    [scrolled],
    menuRef,
    false,
    0
  );

  return (
    <header className="c-pubHeader c-pubHeader--LA">
      <div className="c-pubHeader--LA__top">
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
          <div className="c-pubHeader--LA__featured-image">
            <figure
              className="c-pubHeader--LA__featured-image--bg"
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
        <div className={`c-pubHeader--LA__actions-container ${scrolled ? 'u-fixed' : ''}`}>
          <div className="c-pubHeader--LA__actions-content">
            <hr className="u-section-underline--no-margins" />

            <div className="c-pubHeader__actions o-wrapper-section">
              <Contents title={title} content={content} setReaderOpen={setReaderOpen} />
              <div className="c-pubHeader__row">
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
                {scrolled ? (
                  <div className="c-lAHeader__close">
                    <CloseButton onClick={e => setReaderOpen(false)} />
                  </div>
                ) : null}
              </div>
            </div>

            <hr className="u-section-underline--no-margins" />
          </div>
          <ReadingProgress targetRef={targetRef} />
        </div>
      </div>
      <span ref={menuRef} />
    </header>
  );
};

const ReadingProgress = ({ targetRef }) => {
  const [readingProgress, setReadingProgress] = useState(0);

  useScrollInfo(
    ({ currPos }) => {
      if (!targetRef.current) {
        return;
      }
      const element = targetRef.current;
      const totalHeight = element.clientHeight - element.offsetTop - window.innerHeight;
      const windowScrollTop =
        -currPos.y || document.documentElement.scrollTop || document.body.scrollTop || 0;

      if (windowScrollTop === 0) {
        return setReadingProgress(0);
      }

      if (windowScrollTop > totalHeight) {
        return setReadingProgress(100);
      }

      setReadingProgress((windowScrollTop / totalHeight) * 100);
    },
    [readingProgress],
    targetRef,
    false,
    0
  );

  return <div className={`c-progress-bar`} style={{ width: `${readingProgress}%` }} />;
};