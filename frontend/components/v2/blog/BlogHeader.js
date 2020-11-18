import React from 'react';
import { Share } from '../ShareOnSocialMedia';
import { Link } from '../../../routes';
import { PhotoCaptionCredit } from '../PhotoCaptionCredit';

export const BlogHeader = ({ data }) => {
  const { title = '', standfirst = '', featuredImage = {}, topics = [] } = data;
  return data ? (
    <div className="o-wrapper-section-desktop c-blog-entry__header">
      <div
        className={`c-blog-entry__intro ${
          featuredImage.asset ? '' : 'c-blog-entry__intro--no-img'
        }`}
      >
        <div>
          <h6>Blog</h6>
          <h2>{title}</h2>
          {standfirst && <p className="c-blog-entry__standfirst">{standfirst}</p>}
          {/* <DownloadPdf url={getFileUrl(pdfFile, legacypdf)} /> */}
        </div>
        <div className="c-blog-entry__header-row">
          {topics ? (
            <div className="c-blog-entry__topics">
              {topics.map((topic, index) => (
                <span className="topic" key={index}>
                  <Link route="topic.entry" params={{ slug: topic.slug.current }}>
                    <a className="c-btn--ter">
                      <div>{topic.title}</div>
                    </a>
                  </Link>
                  <span>{`${topics.length > 1 && index + 1 < topics.length ? ', ' : ''}`}</span>
                </span>
              ))}
            </div>
          ) : null}
          <div className="c-blog-sidebar__share-container u-hidden--tablet">
            <Share text={title} />
          </div>
        </div>
      </div>
      {featuredImage.asset && (
        <figure className="c-blog-entry__featured-image">
          <img
            src={`${featuredImage.asset.url}?w=800`}
            alt={featuredImage.asset.altText ? featuredImage.asset.altText : 'Featured image'}
          />
          <figcaption className="u-hidden--desktop">
            <PhotoCaptionCredit featuredImage={featuredImage} />
          </figcaption>
        </figure>
      )}
    </div>
  ) : null;
};
