import React, { useState } from 'react';
import { BlogAuthorsList } from './BlogAuthorsList';
import dateToString from '../../../helpers/dateToString';
import { DownloadPdf } from '../DownloadDropdown';
import { ShareOnSocialMedia } from '../ShareOnSocialMedia';
import { TagsSection } from '../TagsSection';
import { RelatedSimple } from '../RelatedSimple';
import { Keywords } from '../Keywords';
/**
 * V2 - Sidebar component to be used in BlogEntry component
 * @param {object} data
 */

export const BlogSidebar = ({ data, side }) => {
  const {
    authors = [],
    date = {},
    _updatedAt = '',
    relatedContent = '',
    topics = '',
    keywords = '',
  } = data;

  return data ? (
    <div className="c-blog-sidebar">
      {side === 'left' ? (
        <div className=" c-blog-sidebar--left">
          <div className="c-blog-sidebar__date">
            {date && date.utc && (
              <span className="c-blog-sidebar__row--bold">{dateToString({ start: date.utc })}</span>
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
          {/* <div className="u-grey-container c-blog-sidebar__share-container">
        <ShareOnSocialMedia title={title} />
      </div>

      <DownloadPdf url={getFileUrl()} /> */}
        </div>
      ) : null}
      {side === 'right' ? (
        <div className="c-blog-sidebar c-blog-sidebar--right">
          {keywords.length > 0 ? <Keywords title={true} keywords={keywords} /> : null}
          {relatedContent ? <RelatedSimple items={relatedContent} title={'Related'} /> : null}
        </div>
      ) : null}
    </div>
  ) : null;
};
