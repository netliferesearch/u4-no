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
    topics = [],
  } = data;

  return data ? (
    <div className="o-wrapper-section-desktop c-blog-entry__header">
      <div className="c-blog-entry__intro">
        <div>
          <h6>Blog</h6>
          <h2>{title}</h2>
          {standfirst && <p className="c-blog-entry__standfirst">{standfirst}</p>}
          <DownloadPdf url={getFileUrl(pdfFile, legacypdf)} />
        </div>
        <div className="c-blog-entry__header-row">
          {topics ? (
            <div className="c-blog-entry__topics">
              {topics.map((topic, index) => (
                <span className="topic" key={index}>
                  {`${topic.title}${topics.length > 1 && index + 1 < topics.length ? ', ' : ''}`}
                </span>
              ))}
            </div>
          ) : null}
          {/* <div className="u-grey-container c-blog-sidebar__share-container">
            <ShareOnSocialMedia title={title} />
          </div> */}
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
