import React, { useRef, useState } from 'react';
import Image from "next/image";
import sanityImageLoader from '../../helpers/sanityImageLoader';
import { getPostType } from '../../helpers/getRouteByType';
import { useScrollInfo } from '../../helpers/useScrollInfo';
import Link from 'next/link';
import LogoU4 from '../icons/LogoU4';
import { CloseButton } from '../general/buttons';
import { ReadingProgress } from './ReadingProgress';
import { PhotoCaptionCredit } from '../general/PhotoCaptionCredit';
import { PageIntro } from '../general/PageIntro';
import { PUBLICATION } from '../../helpers/constants';
import { useSelector } from 'react-redux';
import buildTitleObjects from '../TableOfContents/buildTitleObjects';
import { ContentsMobile } from './ContentsMobile';
import { Scrollchor } from 'react-scrollchor';
import { ToTop } from '../icons/ToTop';
import { ArrowContent } from '../icons/ArrowContents';
import { useOnClickOutside } from '../../helpers/hooks';

export const ReaderHeader = ({ data = '', setReaderOpen = null, targetRef = null }) => {
  const {
    _type = '',
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
  const readingProgressId = useSelector(state => state.readingProgressId);
  const titleObjects = buildTitleObjects(content);
  const sectionNo = 1 + titleObjects.findIndex(i => i.id === readingProgressId);
  const pdfAsset = legacypdf.asset ? legacypdf.asset : pdfFile.asset;
  const [scrolled, setScrolled] = useState(false);
  const [contentsOpen, setContentsOpen] = useState();
  const menuRef = useRef(null);

  const handleClick = () => {
    setReaderOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  useScrollInfo(
    ({ currPos }) => {
      const isScrolled = currPos.y < -200;
      if (scrolled !== isScrolled) {
        setScrolled(isScrolled);
      }
    },
    [scrolled],
    menuRef,
    false,
    0
  );

  const contentRef = useRef();
  useOnClickOutside(contentRef, () => setContentsOpen(false));

  return (
    <header
      className={`c-pubHeader c-reader-header ${scrolled ? 'c-reader-header--scrolled ' : ''}`}
    >
      <span ref={menuRef} />
      <div className="c-reader-header__top u-fixed">
        <ReaderTop handleClick={handleClick} scrolled={scrolled} title={title} />
        {content.length > 0 && scrolled ? <ReadingProgress targetRef={targetRef} /> : null}
        {sectionNo > 0 && scrolled ? (
          <SectionBar
            sectionNo={sectionNo}
            setContentsOpen={setContentsOpen}
            contentsOpen={contentsOpen}
          />
        ) : null}
        {content.length > 0 && contentsOpen ? (
          <div className="u-hidden--desktop" ref={contentRef}>
            <ContentsMobile content={content} scrolled={scrolled} />
          </div>
        ) : null}
      </div>
      <div className="c-reader-header__main">
        {featuredImage.asset && (
          <div className="c-reader-header__featured-image">
            <figure>
              <Image
                loader={sanityImageLoader}
                src={featuredImage.asset.url}
                alt={featuredImage.altText ? featuredImage.altText : ''}
                priority="true"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 30%"
                }} />
            </figure>
            <figcaption className="">
              <PhotoCaptionCredit image={featuredImage} />
            </figcaption>
          </div>
        )}
        <div
          className={`o-wrapper-medium c-reader-header__intro-container ${
            featuredImage.asset ? 'c-reader-header__intro-container--with-img' : ''
          }`}
        >
          <div className="c-reader-header__intro o-wrapper-narrow u-bg--lighter-blue">
            <PageIntro
              title={title}
              subtitle={subtitle}
              contentType={
                _type === 'publication'
                  ? PUBLICATION + ' | ' + publicationType.title
                  : getPostType(data)
              }
              single={true}
            />
          </div>
        </div>
      </div>
      <div className="u-hidden--desktop">
        {scrolled && (
          <div className="c-scroll-top--contents">
            <Scrollchor to="#js-top-reader" disableHistory>
              <ToTop />
            </Scrollchor>
          </div>
        )}
      </div>
    </header>
  );
};

export const ReaderTop = ({ handleClick, scrolled, title }) => {
  return (
    <div
      className={`c-reader-header__top-content o-wrapper-medium ${
        scrolled ? 'c-reader-header__top-content--scrolled' : ''
      }`}
    >
      {/* <Link href="/">
        <a className="u-no-underline">
          <LogoU4 />
        </a>
      </Link> */}
      <div>{scrolled && <h6 className="">{title}</h6>}</div>
      <div className="c-reader-header__close">
        <button className={`c-btn c-btn--primary c-btn--primary`} onClick={handleClick}>
          Close
        </button>
      </div>
    </div>
  );
};

export const SectionBar = ({ sectionNo = 0, setContentsOpen, contentsOpen = false }) => {
  return (
    <div className="c-reader-header__section">
      <div className="o-wrapper-medium u-flex-sb">
        <h5 className="u-secondary-heading u-secondary-h3 u-text--white">{`Section ${sectionNo}`}</h5>
        <div className="u-hidden--desktop">
          <button
            className={`c-contents__button c-btn ${
              contentsOpen ? 'c-contents__button--active' : ''
            }`}
            onClick={e => {
              e.preventDefault();
              setContentsOpen(!contentsOpen);
            }}
          >
            <h5 className="u-secondary-heading u-secondary-h3 u-text--white">Contents</h5>
            <ArrowContent title="Show/hide contents" />
          </button>
        </div>
      </div>
    </div>
  );
};
