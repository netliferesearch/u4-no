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

const classes = BEMHelper({
  name: 'article-sidebar',
  prefix: 'c-',
});

export const PublicationSidebar = ({ data, side }) => {
  const {
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
  } = data;

  return data ? (
    <div {...classes('', null, className)}>
      {side === 'left' ? (
        <div {...classes('right')}>
          <BreadCrumbV2 title={`All Publications`} parentSlug={"/search?filters=publications-only&sort=year-desc"} home={false} />
          <div>
            <p>
              <strong>{dateToString({ start: date.utc })}</strong>
            </p>
            {updatedVersion ? (
              <p>Updated {dateToString({ start: updatedVersion.date.utc })}</p>
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
          {bibliographicReference({ publicationType, publicationNumber, reference })}

          {translations.length > 0 && (
            <p>
              Available in{' '}
              {translations.map(
                (item = {}, index) =>
                  item.slug &&
                  item.title && (
                    <LinkToItem type="publication" slug={item.slug} key={item._id}>
                      <span>
                        <a {...classes('language')}>{languageName({ langcode: item.language })}</a>
                        {index + 2 < translations.length && <span>, </span>}
                        {index + 2 === translations.length && <span> and </span>}
                      </span>
                    </LinkToItem>
                  )
              )}
              {'.'}
            </p>
          )}
        </div>
      ) : null}

      {side === 'right' ? (
        <div {...classes('right')}>
          {(pdfFile.asset || legacypdf.asset) && (
            <div {...classes('right pdf-preview')}>
              {/* {useMediaQuery('tablet') && ( */}
              <Document file={pdfFile.asset ? pdfFile.asset : legacypdf.asset}>
                <Page pageNumber={1} />
              </Document>
              {/* )} */}
            </div>
          )}
          {acknowledgements || partners.length > 0 || publicationType._id === 'pubtype-3' ? (
            <h3 className="u-black-mid-headline">In collaboration with</h3>
          ) : null}
          {acknowledgements ? (
            <div {...classes('meta')}>
              {/* <h3 className="u-black-mid-headline">Acknowledgements</h3> */}
              <div {...classes('content')}>
                {typeof acknowledgements === 'string' && <p>{acknowledgements}</p>}
                {typeof acknowledgements !== 'string' && (
                  <BlockContent blocks={acknowledgements} serializers={serializers} />
                )}
              </div>
            </div>
          ) : null}
          {partners.length > 0 || publicationType._id === 'pubtype-3' ? (
            <div {...classes('meta')}>
              {/* <h3 className="u-black-mid-headline">Partners</h3> */}
              {partners.length > 0 ? <PartnersList institutions={partners} /> : null}
              {publicationType._id === 'pubtype-3' && (
                <div className="c-article-header__institution">
                  {/* <p>The U4 Helpdesk is operated by </p> */}
                  <div className="c-logo">
                    <PartnerLogo10Blue />
                  </div>
                </div>
              )}
            </div>
          ) : null}
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
