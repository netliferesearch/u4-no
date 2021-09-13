import React, { useRef, useState } from 'react';
import Image from 'next/image';
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

export const ReaderTop = ({ handleClick }) => {
  return (
    <div className="c-reader-header__top-content o-wrapper-medium">
      <Link href="/">
        <a className="u-no-underline u-hidden--tablet">
          <LogoU4 />
        </a>
      </Link>
      <div className="c-reader-header__close">
        <CloseButton onClick={handleClick}>
          {/* <span className="u-secondary-heading c-btn__label">Close Publication</span> */}
        </CloseButton>
      </div>
    </div>
  );
};

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
    <header
      className={`c-pubHeader c-reader-header ${scrolled ? 'c-reader-header--scrolled ' : ''}`}
    >
      <span ref={menuRef} />
      <div className="c-reader-header__top u-fixed">
        <ReaderTop handleClick={handleClick} />
        {content.length > 0 && scrolled ? <ReadingProgress targetRef={targetRef} /> : null}
      </div>
      <div className="c-reader-header__main">
        {featuredImage.asset && (
          <div className="c-reader-header__featured-image">
            <figure
            // className="c-reader-header__featured-image--bg"
            // style={{ backgroundImage: `url('${featuredImage.asset.url}?w=1072')` }}
            >
              <Image
                loader={sanityImageLoader}
                src={featuredImage.asset.url}
                alt={featuredImage.altText ? featuredImage.altText : ''}
                layout="fill"
                objectFit="cover"
                objectPosition="center 30%"
                priority="true"
              />
            </figure>
            <figcaption className="">
              <PhotoCaptionCredit featuredImage={featuredImage} />
            </figcaption>
          </div>
        )}
        <div className="o-wrapper-medium">
          <div className="c-reader-header__intro o-wrapper-narrow">
            <PageIntro
              title={title}
              subtitle={subtitle}
              //text={false}
              contentType={
                _type === 'publication'
                  ? PUBLICATION + ' | ' + publicationType.title
                  : getPostType(data)
              }
              //type="withBreadcrumb"
              single={true}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
