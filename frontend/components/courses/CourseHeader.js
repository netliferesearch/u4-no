import React from 'react';
import { ShareOpen } from '../general/social/ShareOpen';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import { RegisterForm } from './RegisterForm';
import { Topics } from '../general/topics/Topics';
import { PageIntro } from '../general/PageIntro';
import { BreadCrumbV2 } from '../general/BreadCrumbV2';
import sanityImageLoader from '../../helpers/sanityImageLoader';
import Image from 'next/image';

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
    <div className="c-course-entry__header">
      <div
        className={`c-course-entry__intro ${
          (featuredImage && featuredImage.asset) || vimeo ? '' : 'c-course-entry__intro--no-img'
        }`}
      >
        <PageIntro title={title} text={lead} contentType="Online course" type="withBreadcrumb" single={true}/>
        <div className="c-course-entry__header-row">
          <RegisterForm courseType={courseType.waitingListId} />
          <ShareOpen text={title} />
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
        <div className="c-course-entry__image-wrapper">
          <Image
            loader={sanityImageLoader}
            src={featuredImage.asset.url}
            loading="lazy"
            width="484"
            height="273"
            objectFit="cover"
            objectPosition="center center"
          />
        </div>
      ) : null}
    </div>
  ) : null;
};
