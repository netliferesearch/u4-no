import React, { useState } from 'react';
import { BlogAuthorsList } from './BlogAuthorsList';
import dateToString from '../../../helpers/dateToString';
import { DownloadPdf } from '../DownloadDropdown';
import { ShareOnSocialMedia } from '../ShareOnSocialMedia';
/**
 * V2 - Sidebar component to be used in BlogEntry component
 * @param {object} data
 */

export const BlogSidebar = ({ data }) => {
  const {
    authors = [],
    date = {},
    _updatedAt = '',
    pdfFile = {},
    legacypdf = {},
    title = '',
    slug = '',
  } = data;

  const getFileUrl = () => {
    //Legacy PDF overrides pdfFile
    if (legacypdf && legacypdf.asset) {
      return legacypdf.asset.url;
    }
    if (!legacypdf || !legacypdf.asset) {
      if (pdfFile && pdfFile.asset) {
        return pdfFile.asset.url;
      } else {
        return null;
      }
    }
    return null;
  };

  return (
    data && (
      <div className="c-blog-sidebar">
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
        <div className="u-grey-container c-blog-sidebar__share-container">
          <ShareOnSocialMedia title={title} />
        </div>

        <DownloadPdf url={getFileUrl()} />
      </div>
    )
  );
};
