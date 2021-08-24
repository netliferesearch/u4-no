import React from 'react';
import { ShareOpen } from '../general/social/ShareOpen';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import { RegisterForm } from './RegisterForm';
import { Topics } from '../general/topics/Topics';

export const CourseHeader = ({ data }) => {
  const {
    title = '',
    lead = '',
    featuredImage = {},
    vimeo = '',
    topics = [],
    courseType = {},
  } = data;
  return data ? (
    <div className="o-wrapper-section c-course-entry__header">
      <div
        className={`c-course-entry__intro ${(featuredImage && featuredImage.asset) || vimeo ? '' : 'c-course-entry__intro--no-img'}`}
      >
        <div>
          <Link href={'/online-courses'}>
            <a className="c-btn--sen">
              <h6>Online course</h6>
            </a>
          </Link>

          <h2 className="u-primary-heading">{title}</h2>
          {lead && <p className="c-course-entry__standfirst">{lead}</p>}
        </div>
        <RegisterForm courseType={courseType.waitingListId} />
        <div className="c-course-entry__header-row">
          {topics ? <Topics title={false} topics={topics} hr={false} /> : null}
          <div className="u-hidden--tablet">
            <ShareOpen text={title} />
          </div>
        </div>
      </div>
      {vimeo ? (
        <div className={`u-video u-hidden--tablet  ${vimeo.size || ''}`}>
          <ReactPlayer
            controls
            width="100%"
            height="0"
            config={{
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
          style={{ backgroundImage: `url('${featuredImage.asset.url}?w=520&fit=crop&crop=focalpoint')` }}
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
