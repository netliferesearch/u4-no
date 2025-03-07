import React from 'react';
import { ShareOpen } from '../general/social/ShareOpen';
import VimeoPlayer from '@/app/components/general/VimeoPlayer';
import { RegisterForm } from './RegisterForm';
import { PageIntro } from '../general/PageIntro';
import { getPostType } from '@/helpers/getRouteByType';
import sanityImageLoader from '@/helpers/sanityImageLoader';
import Image from 'next/image';

export const CourseHeader = ({ data }) => {
  const {
    title = '',
    lead = '',
    featuredImage = {},
    vimeo = '',
    courseType = {},
    language = 'en_US',
    mode = '',
    registrationLink,
  } = data;
  return data ? (
    <div className="c-course-entry__header">
      <div
        className={`c-course-entry__intro ${
          (featuredImage && featuredImage.asset) || vimeo ? '' : 'c-course-entry__intro--no-img'
        }`}
      >
        <PageIntro
          title={title}
          text={lead}
          contentType={getPostType(data)}
          type="withBreadcrumb"
          single
        />
        <div className="c-course-entry__btn-row">
          <RegisterForm
            courseType={courseType?.waitingListId}
            language={language}
            registrationLink={registrationLink}
          />
          <ShareOpen text={title} />
        </div>
      </div>
      {vimeo ? (
        <div className={`u-video u-hidden--tablet  ${vimeo.size || ''}`}>
          <VimeoPlayer
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
            alt={title}
            loader={sanityImageLoader}
            src={featuredImage.asset.url}
            width="484"
            height="273"
            placeholder={featuredImage.asset.metadata.lqip ? 'blur' : 'empty'}
            blurDataURL={featuredImage.asset.metadata.lqip}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          />
        </div>
      ) : null}
    </div>
  ) : null;
};
