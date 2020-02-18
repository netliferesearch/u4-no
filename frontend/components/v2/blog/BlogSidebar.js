import React, { useState } from 'react';
import { BlogAuthorsList } from './BlogAuthorsList';
import dateToString from '../../../helpers/dateToString';
import { DownloadPdf } from './DownloadDropdown';
import { ShareOnSocialMedia } from './ShareOnSocialMedia'
/**
 * V2 - Sidebar component to be used in BlogEntry component
 * @param {object} data
 */

export const BlogSidebar = ({ data }) => {
  const { authors = [], date = {}, _updatedAt = '', pdfFile = {}, legacypdf = {} } = data;
  return (
    data && (
      <section className="c-blog-sidebar">
        <div>
          {date && date.utc && (
            <span className="c-blog-sidebar__bold">{dateToString({ start: date.utc })}</span>
          )}
          {_updatedAt && (
            <span className="c-blog-sidebar__regular">{dateToString({ start: _updatedAt })}</span>
          )}
          {authors.length ? (
            <BlogAuthorsList
              authors={authors}
              //language={language}
            />
          ) : null}
        </div>
        <ShareOnSocialMedia />
        <DownloadPdf pdfFile={legacypdf ? legacypdf : pdfFile} />
      </section>
    )
  )}