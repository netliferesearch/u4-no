import React from 'react';
import { Share } from '../ShareOnSocialMedia';
import Link from 'next/link';
import { PhotoCaptionCredit } from '../PhotoCaptionCredit';
import { Topics } from '../Topics';

export const BlogHeader = ({ data }) => {
  const { title = '', standfirst = '', featuredImage = {}, topics = [] } = data;
  return data ? (
    <div
      className="o-wrapper-section-desktop--full c-blog-entry__header"
      //style={{ backgroundImage: `url('${featuredImage.asset.url}?w=700')` }}
    >
      <div
        className={`c-blog-entry__intro ${
          featuredImage.asset ? '' : 'c-blog-entry__intro--no-img'
        }`}
      >
        <div>
          <Link route={'/blog'}>
            <a className="c-btn--sen">
              <h6>Blog</h6>
            </a>
          </Link>

          <h2>{title}</h2>
          {standfirst && <p className="c-blog-entry__standfirst">{standfirst}</p>}
          {/* <DownloadPdf url={getFileUrl(pdfFile, legacypdf)} /> */}
        </div>
        <div className="c-blog-entry__header-row">
          {topics ? <Topics title={false} topics={topics} hr={false} linkType={'5'} /> : null}
          <div className="c-blog-sidebar__share-container u-hidden--tablet">
            <Share text={title} />
          </div>
        </div>
      </div>
      {featuredImage.asset && (
        <div
          className="c-blog-entry__featured-image c-blog-entry__featured-image--bg u-hidden--tablet"
          style={{ backgroundImage: `url('${featuredImage.asset.url}?w=1000')` }}
        />
        // <figure className="c-blog-entry__featured-image u-hidden--tablet">
        //   <img
        //     src={`${featuredImage.asset.url}?w=800`}
        //     alt={featuredImage.asset.altText ? featuredImage.asset.altText : 'Featured image'}
        //   />
        //   <figcaption className="u-hidden--desktop">
        //     <PhotoCaptionCredit featuredImage={featuredImage} />
        //   </figcaption>
        // </figure>
      )}
    </div>
  ) : null;
};
