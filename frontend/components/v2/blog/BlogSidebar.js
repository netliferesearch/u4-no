import React, { useState } from 'react';
import { BlogAuthorsList } from './BlogAuthorsList';
import dateToString from '../../../helpers/dateToString';
import { DownloadPdf } from '../DownloadDropdown';
import { ShareOnSocialMedia } from '../ShareOnSocialMedia'
/**
 * V2 - Sidebar component to be used in BlogEntry component
 * @param {object} data
 */

export const BlogSidebar = ({ data }) => {
  const { authors = [], date = {}, _updatedAt = '', pdfFile = {}, legacypdf = {}, title = '', slug = '' } = data;
  return (
    data && (
      <div className="c-blog-sidebar">
        <div className="c-blog-sidebar__date">
          {date && date.utc && (
            <span className="c-blog-sidebar__row--bold">{dateToString({ start: date.utc })}</span>
          )}
          {_updatedAt && (
            <span className="c-blog-sidebar__row--regular">Updated {dateToString({ start: _updatedAt })}</span>
          )}
        </div>
        {authors.length ? (
            <BlogAuthorsList
              authors={authors}
              //language={language}
            />
          ) : null}
        <ShareOnSocialMedia title={title}/>
        {/* Legacy PDF overrides pdfFile */}
        {/* {console.log(pdfFile.asset ? pdfFile.asset : null)}
        {console.log(legacypdf.asset ? legacypdf.asset : null)}
        {legacypdf && legacypdf.asset || pdfFile && pdfFile.asset ? (<DownloadPdf pdfFile={legacypdf.asset ? legacypdf.asset.url : pdfFile.asset.url} />) : null} */}
        
      </div>
    )
  )}