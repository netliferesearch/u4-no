import React from 'react';
//import { Document, Page } from 'react-pdf/build/entry.noworker';
import LinkToItem from 'components/general/LinkToItem';
import { PageIntro } from 'components/general/PageIntro';
import { PhotoCaptionCredit } from 'components/general/PhotoCaptionCredit';
import { Translations } from 'components/general/translations/Translations';
import { PUBLICATION } from 'helpers/constants';
import dateToString from 'helpers/dateToString';
import { getPostType, getRouteByType } from 'helpers/getRouteByType';
import sanityImageLoader from 'helpers/sanityImageLoader';
import Image from "next/image";
import { ArticleActions } from './ArticleActions';

export const ArticleHeader = ({ data = {} }) => {
  const {
    _type = '',
    publicationType = {},
    title = '',
    subtitle = '',
    standfirst = '',
    lead = '',
    leadText = '',
    abstract = '',
    explainerText = '',
    slug = {},
    pdfFile = {},
    legacypdf = {},
    pdfThumbnail = {},
    featuredImage = {},
    language = {},
    translations = null,
    date = false,
    guideUpdateDate = false,
    updatedVersion = false,
    basedonpublication = false,
  } = data;

  const text = _type === 'publication' ? lead || abstract : leadText || lead || standfirst || explainerText;
  // {lead || abstract ? <ArticleLead lead={lead} abstract={abstract} /> : null}

  return (
    <header className="c-article-header">
      <div className="c-article-header__container">
        <div className="c-article-header__col">
          <PageIntro
            pubType={_type}
            title={title}
            subtitle={subtitle}
            text={text}
            abstract={abstract}
            contentType={getPostType(data)}
            type="withBreadcrumb"
            single
          />
          <div className="c-article-header__meta">
            {basedonpublication && (
              <LinkToItem
                type="publication"
                slug={basedonpublication.slug}
                key={basedonpublication._id}
              >
                <span className="u-body--small">
                  <a className="" title={basedonpublication.title}>
                    Read the associated publication
                  </a>
                </span>
              </LinkToItem>
            )}
            {translations &&
              <Translations
                translations={translations}
                language={language}
                type={_type === 'publication' ? 'publication' : getRouteByType(data)}
                currentSlug={slug}
              />
            }
            <div>
              {date &&
                <span className="u-body--small u-text--grey">
                  {dateToString({ start: date.utc })}
                </span>
              }
              {updatedVersion &&
                <span className="u-body--small u-text--grey u-margin-left-tiny">
                  Updated {dateToString({ start: updatedVersion.date.utc })}
                </span>
              }
              {guideUpdateDate &&
                <span className="u-body--small u-text--grey">
                  Last updated at: {dateToString({ start: guideUpdateDate.utc })}
                </span>
              }
            </div>
          </div>
          <ArticleActions data={data} />
        </div>

        <div className="c-article-header__col">
          {pdfThumbnail?.asset?.url && (
            <div className="pdf-preview">
              <div className='pdf-preview-thumbnail'>
                <Image
                  alt={title}
                  loader={sanityImageLoader}
                  src={pdfThumbnail.asset.url}
                  priority="true"
                  width={pdfThumbnail.asset.metadata.dimensions.width}
                  height={pdfThumbnail.asset.metadata.dimensions.height}
                  placeholder={pdfThumbnail.asset.metadata.lqip ? "blur" : "empty"}
                  blurDataURL={pdfThumbnail.asset.metadata.lqip}
                  sizes="289px"
                  style={{
                    width: "100%",
                    height: "auto"
                  }} />
              </div>
            </div>
          )}
          {!pdfThumbnail?.asset && (pdfFile?.asset || legacypdf?.asset) && (
            <div className="pdf-preview">
              {/*
              <Document file={pdfFile.asset ? pdfFile.asset : legacypdf.asset}>
                <Page pageNumber={1} />
              </Document>
              */}
            </div>
          )}
          {_type === 'blog-post' && featuredImage && featuredImage.asset && (
            <div className="c-article-header__img">
              <Image
                loader={sanityImageLoader}
                src={featuredImage.asset.url}
                loading="eager"
                width="691"
                height="353"
                placeholder={featuredImage.asset.metadata.lqip ? "blur" : "empty"}
                blurDataURL={featuredImage.asset.metadata.lqip}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "cover",
                  objectPosition: "center center"
                }} />
              <PhotoCaptionCredit image={featuredImage} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
