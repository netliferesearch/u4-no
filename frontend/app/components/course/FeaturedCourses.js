import { SectionIntro } from '@/components/general/SectionIntro';
import LinkToItem from '@/components/general/LinkToItem';
import { BlueCard, CONTENT_BY_TYPE, CARD_TYPE } from '@/components/general/blue-card/BlueCard';
import { getPostType } from '@/helpers/getRouteByType';
import { TextClampSSR } from '@/components/general/post/TextClampSSR';
import { ArrowNext } from '@/components/icons/ArrowNext';
import Image from 'next/image';
import sanityImageLoader from '@/helpers/sanityImageLoader';
import { CalendorIcon } from '@/components/icons/CalendorIcon';

export const FeaturedCourses = ({ courses, title = 'Featured courses', text = '' }) => {
  if (!courses || courses.length === 0) return null;

  const columnClass = courses.length >= 3 ? 'column-3' : `column-${courses.length}`;
  const cardTypes = ['', CARD_TYPE.FULL, CARD_TYPE.LARGE, CARD_TYPE.MEDIUM];
  const cardType = courses.length >= 3 ? CARD_TYPE.MEDIUM : cardTypes[courses.length];

  return (
    <div>
      <SectionIntro title={title} text={text} />
      <div className="c-featured-courses">
        {courses.map(course => (
          <CourseCard type={cardType} post={course} key={course._id} />
        ))}
      </div>
    </div>
  );
};

const CourseCard = ({ post = {} }) => (
  <LinkToItem type="course" slug={post.slug}>
    <a className="c-featured-courses__item">
      <div className="c-featured-courses__content">
        <div className="c-blue-card__top-content">
          {getPostType(post) && (
            <h4 className="c-blue-card__type u-secondary-heading u-secondary-h4 u-detail--blue--small">
              {getPostType(post)}
            </h4>
          )}
          <div className="c-blue-card__text">
            <h4 className="c-blue-card__heading u-primary-heading">{post.title}</h4>
            <div>
              {post.lead && (
                <div className="c-blue-card__lead u-body--dark-grey">
                  <TextClampSSR text={post.lead} lines={5} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="c-blue-card__bottom-content ">
          <div className="c-blue-card__info">
            {post.location && (
              <p className="c-blue-card__location u-body--small">
                <LocationIcon /> {post.location}
              </p>
            )}
            <p className="c-blue-card__date u-body--small course-date">
              <CalendorIcon />
              <>
                {post.mode === 'Self-paced'
                  ? 'Start any time'
                  : post.startDate
                  ? dateToString({ start: post.startDate.local || post.startDate.utc })
                  : 'Date to be determined'}
              </>
            </p>
          </div>
        </div>
      </div>
      {post.imageUrl && (
        <div className="c-featured-courses__image">
          <Image
            loader={sanityImageLoader}
            src={post.imageUrl}
            alt=""
            loading="lazy"
            sizes="579px, 180px"
            width={0}
            height={0}
            style={{
              objectFit: 'contain',
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      )}
    </a>
  </LinkToItem>
);
