import React from 'react';
import { Document, Page } from 'react-pdf/build/entry.noworker';
import { PUBLICATION } from '../../../helpers/constants';
import { getPostType, getRouteByType } from '../../../helpers/getRouteByType';
import { PageIntro } from '../PageIntro';
import dateToString from '../../../helpers/dateToString';
import { Translations } from '../translations/Translations';
import { ArticleActions } from '../article-actions/ArticleActions';
import sanityImageLoader from '../../../helpers/sanityImageLoader';
import Image from 'next/image';
import { PhotoCaptionCredit } from '../PhotoCaptionCredit';
import LinkToItem from '../LinkToItem';

export const ArticleHeader = ({ data = {}, setReaderOpen = null }) => {
  const {
    _type = '',
    publicationType = {},
    title = '',
    subtitle = '',
    standfirst = '',
    lead = '',
    leadText = '',
    abstract = '',
    slug = {},
    pdfFile = {},
    legacypdf = {},
    pdfThumbnail = {},
    featuredImage = {},
    content = [],
    summary = [],
    language = {},
    translations = [],
    date = {},
    updatedVersion = false,
    _updatedAt = '',
    basedonpublication = false,
  } = data;
  const pdfAsset = legacypdf && legacypdf.asset ? legacypdf.asset : pdfFile.asset;
  const text = _type === 'publication' ? lead || abstract : leadText || lead || standfirst;
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
            {translations.length > 0 && (
              <Translations
                translations={translations}
                language={language}
                type={_type === 'publication' ? 'publication' : getRouteByType(data)}
                currentSlug={slug}
              />
            )}
            <div>
              {date ? (
                <span className="u-body--small u-text--grey">
                  {dateToString({ start: date.utc })}
                </span>
              ) : null}
              {updatedVersion ? (
                <span className="u-body--small u-text--grey u-margin-left-tiny">
                  Updated {dateToString({ start: updatedVersion.date.utc })}
                </span>
              ) : null}
            </div>
          </div>
          <ArticleActions data={data} setReaderOpen={setReaderOpen} />
        </div>

        <div className="c-article-header__col">
          {pdfThumbnail.asset?.url && (
            <div className="pdf-preview">
              <div className='pdf-preview-thumbnail'>
              <Image
                loader={sanityImageLoader}
                src={pdfThumbnail.asset.url}
                loading="eager"
                layout="responsive"
                width={pdfThumbnail.asset.metadata.dimensions.width}
                height={pdfThumbnail.asset.metadata.dimensions.height}
                sizes="289px"
              />
              </div>
            </div>
          )}
          {!pdfThumbnail.asset && (pdfFile.asset || legacypdf.asset) && (
            <div className="pdf-preview">
              <Document file={pdfFile.asset ? pdfFile.asset : legacypdf.asset}>
                <Page pageNumber={1} />
              </Document>
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
                objectFit="cover"
                objectPosition="center center"
              />
              <PhotoCaptionCredit image={featuredImage} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
