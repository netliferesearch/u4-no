import React from 'react';
import BEMHelper from 'react-bem-helper';
import languageName from '../../helpers/languageName';
import { LinkToItem } from '../';
import { AuthorList, EditorList } from './';
import dateToString from '../../helpers/dateToString';
import { RelatedSimple } from './RelatedSimple';
import { Document, Page } from 'react-pdf/build/entry.noworker';
import { BreadCrumbV2 } from './BreadCrumbV2';
import { PartnersList } from './PartnersList';
import { PartnerLogo10Blue } from '../icons/PartnerLogo10Blue';
import bibliographicReference from '../../helpers/bibliographicReference';
import { getRouteByType } from '../../helpers/getRouteByType';
import { Translations } from './Translations';
import { AcknowledgementsPartners } from './AknowledgementsPartners';

const classes = BEMHelper({
  name: 'article-sidebar',
  prefix: 'c-',
});

export const PublicationSidebar = ({ data, side }) => {
  const {
    language = '',
    className = '',
    publicationType = {},
    publicationNumber = '',
    authors = [],
    editors = [],
    reference = '',
    translations = {},
    date = {},
    updatedVersion = false,
    recommendedResources = [],
    relatedResources = [],
    acknowledgements = '',
    pdfFile = {},
    legacypdf = {},
    partners = [],
    slug = '',
  } = data;

  return data ? (
    <div {...classes('', null, className)}>
      {side === 'left' ? (
        <div {...classes('left')}>
          <div className="c-article-sidebar__date">
            {date && date.utc && (
              <span className="c-article-sidebar__row--regular">
                {dateToString({ start: date.utc })}
              </span>
            )}
            {updatedVersion ? (
              <span className="c-article-sidebar__row--regular">
                Updated {dateToString({ start: updatedVersion.date.utc })}
              </span>
            ) : null}
          </div>
          {authors.length ? <AuthorList authors={authors} /> : null}
          {editors.length ? (
            <EditorList
              editors={editors}
              intro={publicationType._id === 'pubtype-3' ? 'Reviewed by' : 'Series editor'}
              pluralize={publicationType._id !== 'pubtype-3'}
            />
          ) : null}
          <p className="c-article-sidebar__row--regular">
            {bibliographicReference({ publicationType, publicationNumber, reference })}
          </p>
          {translations.length > 0 && (
            <Translations
              translations={translations}
              language={language}
              route={'/publications'}
              currentSlug={slug}
            />
          )}
        </div>
      ) : null}

      {side === 'right' ? (
        <div {...classes('right')}>
          {(pdfFile.asset || legacypdf.asset) && (
            <div className="c-article-sidebar__row--regular">
              <div {...classes('right pdf-preview')}>
                {/* {useMediaQuery('tablet') && ( */}
                <Document file={pdfFile.asset ? pdfFile.asset : legacypdf.asset}>
                  <Page pageNumber={1} />
                </Document>
                {/* )} */}
              </div>
            </div>
          )}
          <div className="c-article-sidebar__row--regular">
            <div className="u-hidden--tablet">
              <AcknowledgementsPartners data={data} />
            </div>
          </div>
          {/* {keywords.length > 0 ? <Keywords title={true} keywords={keywords} hr={false}/> : null} */}
          {recommendedResources.length || relatedResources.length ? (
            <RelatedSimple
              items={recommendedResources.length > 0 ? recommendedResources : relatedResources}
              title={'We also recommend'}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  ) : null;
};
