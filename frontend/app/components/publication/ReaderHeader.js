import React, { useRef, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import sanityImageLoader from 'helpers/sanityImageLoader';
import { getPostType } from 'helpers/getRouteByType';
import { useScrollInfo } from 'helpers/useScrollInfo';
import { ReadingProgress } from 'components/publication/ReadingProgress';
import { PhotoCaptionCredit } from 'components/general/PhotoCaptionCredit';
import { PageIntro } from 'components/general/PageIntro';
import { PUBLICATION } from 'helpers/constants';
import { useSelector } from 'react-redux';
import { ContentsMobile } from './ContentsMobile';
import { Scrollchor } from 'react-scrollchor';
import { ToTop } from 'components/icons/ToTop';
import { ArrowContent } from 'components/icons/ArrowContents';
import { useOnClickOutside } from 'helpers/hooks';

export const ReaderHeader = ({ data = '', titleObjects = [], setReaderOpen = null, targetRef = null }) => {
  const {
    _type = '',
    title = '',
    subtitle = '',
    featuredImage = {},
    imageBlurDataURL = '',
    summary = '',
    publicationType = {},
    pdfFile = {},
    legacypdf = {},
    slug = '',
    topics = [],
  } = data;
  const readingProgressId = useSelector(state => state.readingProgressId);
  const sectionNo = 1 + titleObjects.findIndex(i => i.id === readingProgressId);
  const [scrolled, setScrolled] = useState(false);
  const [contentsOpen, setContentsOpen] = useState();
  const menuRef = useRef(null);
  const publicationLink = `/publications/${slug}`;

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
        <ReaderTop publicationLink={publicationLink} scrolled={scrolled} title={title} />
        { scrolled ? <ReadingProgress targetRef={targetRef} /> : null}
        {sectionNo > 0 && scrolled ? (
          <SectionBar
            sectionNo={sectionNo}
            setContentsOpen={setContentsOpen}
            contentsOpen={contentsOpen}
          />
        ) : null}
        {contentsOpen ? (
          <div className="u-hidden--desktop" ref={contentRef}>
            <ContentsMobile titleObjects={titleObjects} scrolled={scrolled} />
          </div>
        ) : null}
      </div>
      <div className="c-reader-header__main">
        {featuredImage?.asset && (
          <div className="c-reader-header__featured-image">
            <figure>
              <Image
                loader={sanityImageLoader}
                src={featuredImage.asset.url}
                placeholder={imageBlurDataURL ? "blur" : "empty"}
                blurDataURL={imageBlurDataURL}
                alt={featuredImage.altText ? featuredImage.altText : title}
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
            featuredImage?.asset ? 'c-reader-header__intro-container--with-img' : ''
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

export const ReaderTop = ({ publicationLink, scrolled, title }) => {
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
        <Link href={publicationLink}>
          <button className={`c-btn c-btn--primary c-btn--primary`} >
            Close
          </button>
        </Link>
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
            <ArrowContent />
          </button>
        </div>
      </div>
    </div>
  );
};
