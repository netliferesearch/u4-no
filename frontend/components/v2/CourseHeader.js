import React from 'react';
import { Share } from './ShareOnSocialMedia';
import { Link } from '../../routes';
import ReactPlayer from 'react-player';
import { PhotoCaptionCredit } from './PhotoCaptionCredit';
import { RegisterForm } from './RegisterForm';
import { Topics } from './Topics';

export const CourseHeader = ({ data }) => {
  const {
    title = '',
    lead = '',
    featuredImage = '',
    vimeo = '',
    topics = [],
    courseType = {},
  } = data;
  return data ? (
    <div className="o-wrapper-section c-course-entry__header">
      <div
        className={`c-course-entry__intro ${featuredImage ? '' : 'c-blog-entry__intro--no-img'}`}
      >
        <div>
          <Link route={'/online-courses'}>
            <a className="c-btn--sen">
              <h6>Online course</h6>
            </a>
          </Link>

          <h2 className="u-heading--1">{title}</h2>
          {lead && <p className="c-blog-entry__standfirst">{lead}</p>}
        </div>
        <RegisterForm courseType={courseType.waitingListId} />
        <div className="c-blog-entry__header-row">
          {topics ? <Topics title={false} topics={topics} hr={false} /> : null}
          <div className="c-blog-sidebar__share-container u-hidden--tablet">
            <Share text={title} />
          </div>
        </div>
      </div>
      {vimeo ? (
        <div className={`u-video ${vimeo.size || ''}`}>
          <ReactPlayer
            controls
            width="100%"
            height="0"
            vimeoConfig={{
              preload: true,
            }}
            style={{
              margin: '40px auto 40px',
            }}
            url={vimeo.src}
          />
        </div>
      ) : featuredImage && featuredImage.asset ? (
        <div
          className="c-course-entry__featured-image c-course-entry__featured-image--bg"
          style={{ backgroundImage: `url('${featuredImage.asset.url}?w=520')` }}
        />
      ) : // <figure className="c-course-entry__featured-image u-hidden--tablet">
      //   <img
      //     src={`${featuredImage.asset.url}?w=520`}
      //     alt={featuredImage.asset.altText ? featuredImage.asset.altText : 'Featured image'}
      //   />
      // </figure>
      null}
    </div>
  ) : null;
};
