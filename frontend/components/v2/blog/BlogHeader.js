import React, { useState } from 'react';
import { BlogAuthorsList } from './BlogAuthorsList';
import dateToString from '../../../helpers/dateToString';
import { DownloadPdf } from '../DownloadDropdown';
import { ShareOnSocialMedia } from '../ShareOnSocialMedia';
/**
 * V2 - Sidebar component to be used in BlogEntry component
 * @param {object} data
 */

const getFileUrl = (pdfFile, legacypdf) => {
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

export const BlogHeader = ({ data }) => {
  const {
    pdfFile = {},
    legacypdf = {},
    title = '',
    standfirst = '',
    featuredImage = {},
  } = data;

  return data ? (
    <div className="o-wrapper-section-desktop c-blog-entry__header">
      <div className="c-blog-entry__intro">
        <h6>Blog</h6>
        <h2>{title}</h2>
        {standfirst && <p className="c-blog-entry__lead">{standfirst}</p>}
        {/* {topics &&
            topics.map((topic, index) => (
              <span className="topic" key={index}>
                {topic.title}
              </span>
            ))} */}
        <div className="o-wrapper-section c-blog-entry__row">
          <div className="u-grey-container c-blog-sidebar__share-container">
            <ShareOnSocialMedia title={title} />
          </div>
          <DownloadPdf url={getFileUrl(pdfFile, legacypdf)} />
        </div>
      </div>
      {featuredImage.asset && (
        <figure className="c-blog-entry__featured-image">
          <img
            src={`${featuredImage.asset.url}?w=800`}
            alt={featuredImage.asset.altText ? featuredImage.asset.altText : 'Featured image'}
          />
        </figure>
      )}
    </div>
  ) : null;
};
