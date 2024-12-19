import { Post, POST_TYPE } from '@/components/general/post/Post';
import { getPlaceholder } from '@/helpers/imgloader';
import Image from 'next/image';
import sanityImageLoader from '@/helpers/sanityImageLoader';
import { getPostType } from '../../../helpers/getRouteByType';
import TextClampSSR from '@/components/general/post/TextClampSSR';
import { Topics } from '@/components/general/topics/Topics';
import dateToString from '@/helpers/dateToString';
import { CalendorIcon } from '@/components/icons/CalendorIcon';
import LinkToItem from '@/components/general/LinkToItem';

export const CourseResult = props => {
  const course = {
    ...props.course,
    topics: props.course?.topic,
  };

  return (
    <div className="c-course-result">
      <div className="c-course-result__image-container">
        {course.imageUrl && (
          <div className="c-course-result__image">
            <Image
              loader={sanityImageLoader}
              src={course.imageUrl}
              alt=""
              loading="lazy"
              width={0}
              height={0}
              sizes="180px"
              style={{
                objectFit: 'contain',
                width: '180px',
                height: 'auto',
              }}
            />
          </div>
        )}
      </div>

      <div className="c-post course">
        <LinkToItem type="course" slug={course.slug}>
          <a className="c-post__link u-fake-anchor">
            <div className="c-post__post-info">
              <div className="c-post__post-type u-secondary-heading u-secondary-h4 u-detail--blue--small">
                {getPostType(course)}
              </div>
              <h4 className="c-post__title">{course.title}</h4>

              {course.lead && <div className="c-post__article-content u-body ">{course.lead}</div>}

              <div className="c-post__date u-body--small">
                <CalendorIcon />
                <span>
                  {course.mode === 'Self-paced'
                    ? 'Start any time'
                    : course.startDate
                    ? dateToString({ start: course.startDate.local || course.startDate.utc })
                    : 'Date to be determined'}
                </span>
              </div>
            </div>
          </a>
        </LinkToItem>
      </div>
    </div>
  );
};
