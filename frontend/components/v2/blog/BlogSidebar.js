import React, { useState } from 'react';
import { BlogAuthorsList } from './BlogAuthorsList';
import dateToString from '../../../helpers/dateToString';
import { DownloadPdf } from '../DownloadDropdown';
import { Share, ShareOnSocialMedia } from '../ShareOnSocialMedia';
import { TagsSection } from '../TagsSection';
import { RelatedSimple } from '../RelatedSimple';
import { Keywords } from '../Keywords';
import LinkToItem from '../../LinkToItem';
import { Translations } from '../Translations';
/**
 * V2 - Sidebar component to be used in BlogEntry component
 * @param {object} data
 */

export const BlogSidebar = ({ data, side }) => {
  const {
    title = '',
    authors = [],
    date = {},
    _updatedAt = '',
    relatedContent = '',
    topics = '',
    keywords = '',
    language = '',
    translations = '',
    slug=''
  } = data;

  return data ? (
    <div className="c-blog-sidebar">
      {side === 'left' ? (
        <div className=" c-blog-sidebar--left">
          <div className="c-blog-sidebar__date">
            {date && date.utc && (
              <span className="c-blog-sidebar__row--regular">
                {dateToString({ start: date.utc })}
              </span>
            )}
            {_updatedAt && (
              <span className="c-blog-sidebar__row--regular">
                Updated {dateToString({ start: _updatedAt })}
              </span>
            )}
          </div>
          {authors.length ? (
            <BlogAuthorsList
              authors={authors}
              //language={language}
            />
          ) : null}
          {translations.length > 0 && (
            <div className="u-hidden--tablet">
              <Translations translations={translations} language={language} currentSlug={slug}/>
            </div>
          )}
          <div className="u-hidden--desktop">
            <Share text={title} />
            {translations.length > 0 && (
              <Translations translations={translations} language={language} currentSlug={slug}/>
            )}
          </div>
        </div>
      ) : null}
      {side === 'right' ? (
        <div className="c-blog-sidebar--right">
          {keywords.length > 0 ? <Keywords title={true} keywords={keywords} hr={true} /> : null}
          {relatedContent.length > 0 ? (
            <RelatedSimple items={relatedContent} title={'Related'} />
          ) : null}
        </div>
      ) : null}
    </div>
  ) : null;
};
