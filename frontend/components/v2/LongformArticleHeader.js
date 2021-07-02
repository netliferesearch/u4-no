import React, { useRef, useState } from 'react';
import BEMHelper from 'react-bem-helper';
import { getRouteByType } from '../../helpers/getRouteByType';
import { useScrollInfo } from '../../helpers/useScrollInfo';
import Link from 'next/link';
import LogoU4 from '../icons/LogoU4';
import { CloseButton } from './buttons';
import { Contents } from './Contents';
import { Topics } from './Topics';

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
    content = [],
    publicationType = {},
    pdfFile = {},
    legacypdf = {},
    slug = '',
    topics = [],
  } = data;
  const pdfAsset = legacypdf.asset ? legacypdf.asset : pdfFile.asset;
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  const handleClick = () => {
    setReaderOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

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
    <header className={`c-pubHeader c-pubHeader--LA ${scrolled ? 'c-pubHeader--scrolled' : ''}`}>
      <div className="c-pubHeader--LA__top">
        <div className="c-lAHeader__top-content">
          <Link href="/">
            <a className="u-no-underline u-hidden--tablet">
              <LogoU4 />
            </a>
          </Link>
          <div className="c-lAHeader__close">
            <CloseButton onClick={e => setReaderOpen(false)}>
              <span className="u-heading--5 c-btn__label">Close Publication</span>
            </CloseButton>
          </div>
        </div>
        <hr className="u-section-underline--no-margins" />
      </div>
      <div className="c-pubHeader--LA__main u-scroll-bar">
        <div className="c-article-header__container">
          <div className="c-pubHeader__content o-wrapper u-side-padding">
            <Link href={getRouteByType(publicationType.title)}>
              <a className="c-btn--sen">
                <h6>{publicationType.title && `${publicationType.title}`}</h6>
              </a>
            </Link>
            <div className="u-hidden--desktop">
              <Topics title={false} topics={topics} hr={false} linkType="5" />
            </div>
            <h2 className="u-heading--black--44">{title}</h2>
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
        </div>
      </div>
      <div className={`c-pubHeader--LA__actions-container ${scrolled ? 'u-fixed' : ''}`}>
        <hr className="u-section-underline--no-margins" />
        <div className="c-pubHeader--LA__actions-content u-scroll-bar">
          <div className="c-pubHeader__actions o-wrapper-section u-side-padding">
            <Contents title={title} content={content} setReaderOpen={setReaderOpen} />
            <div className="c-pubHeader__row">
              {summary.length > 0 && (
                <div>
                  <Link href="publication.shortVersion" params={{ slug: slug.current }}>
                    <a className="c-btn c-btn--qua">
                      <span {...classes('button-text')}>Read short version</span>
                      {/* <div {...classes('button-icon')} /> */}
                    </a>
                  </Link>
                </div>
              )}
              {pdfAsset && (
                <div className="u-hidden--tablet">
                  <a
                    href={`/publications/${slug.current}.pdf`}
                    //download={`/publication/${slug.current}.pdf`}
                    target="_blank"
                    className="c-btn c-btn--sec"
                  >
                    <span>Download PDF</span>
                  </a>
                </div>
              )}
              {scrolled ? (
                <div className="c-lAHeader__close">
                  <CloseButton onClick={handleClick} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <hr className="u-section-underline--no-margins" />
        {content.length > 0 ? <ReadingProgress targetRef={targetRef} /> : null}
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
