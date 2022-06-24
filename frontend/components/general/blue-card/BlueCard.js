import React from 'react';
import dateToString from '../../../helpers/dateToString';
import LinkToItem from '../LinkToItem';
import { getPostType } from '../../../helpers/getRouteByType';
import { CalendorIcon } from '../../icons/CalendorIcon';
import { LocationIcon } from '../../icons/LocationIcon';
import { ArrowNext } from '../../icons/ArrowNext';
import TextClamp from 'react-string-clamp';

export const CARD_TYPE = {
  FULL: '1-col',
  LARGE: '2-col',
  MEDIUM: '3-col',
  SMALL: '4-col',
  TOPIC: 'topic',
};

export const CONTENT_BY_TYPE = {
  COURSE: { id: 'course', label: 'Register', slug: 'courses/' },
  TOPIC: { id: 'topic', label: '', slug: 'topics/' },
  COLLECTION: { id: 'collection', label: '', slug: 'collections/' },
  PUBLICATION: { id: 'publication', label: 'View More', slug: 'publications/' },
};

export const BlueCard = ({ post, type, content = {} }) => {
  return (
    <LinkToItem type={post._type} slug={post.slug}>
      <a className={`c-blue-card c-blue-card--${type} c-blue-card--${post._type  === CONTENT_BY_TYPE.COLLECTION.id ? 'dark' : 'light'}`}>
        {type === CARD_TYPE.TOPIC ? <TopicContent post={post} /> : null}
        {post._type === CONTENT_BY_TYPE.COLLECTION.id ? <CollectionContent post={post} /> : null}
        {content.id === CONTENT_BY_TYPE.PUBLICATION.id &&
        !(post._type === CONTENT_BY_TYPE.COLLECTION.id) ? (
          <PublicationContent post={post} />
        ) : null}
        {content.id === CONTENT_BY_TYPE.COURSE.id ? (
          <CourseContent post={post} content={CONTENT_BY_TYPE.COURSE} />
        ) : null}
      </a>
    </LinkToItem>
  );
};

export const TopicContent = ({ post = {} }) => (
  <>
    <div className="c-blue-card__top-content">
      <h2 className="u-secondary-heading u-secondary-h2 u-text--dark-blue">{post.title}</h2>
      {post.standfirst ? (
        <div className="u-body u-text--dark-blue c-blue-card__p--topic">
          <TextClamp text={post.standfirst} lines={3} />
        </div>
      ) : (
        <p className="u-body u-text--dark-blue c-blue-card__p--topic">{post.longTitle}</p>
      )}
    </div>
    <div>
      {post._updatedAt && (
        <p className="c-blue-card__date u-body--small">
          {post._updatedAt && 'Updated ' + dateToString({ start: post._updatedAt })}
        </p>
      )}
    </div>
  </>
);

export const CollectionContent = ({ post = {} }) => (
  <>
    <div className="c-blue-card__top-content">
      {getPostType(post) && (
        <h4 className="c-blue-card__type u-secondary-heading u-secondary-h4 u-detail--blue--small">
          {getPostType(post)}
        </h4>
      )}
      {post.title && <h4 className="c-blue-card__heading u-primary-heading">{post.title}</h4>}
    </div>
    {/* <div>
      {post._updatedAt && (
        <p className="c-blue-card__date u-body--small">
          {post._updatedAt && 'Updated ' + dateToString({ start: post._updatedAt })}
        </p>
      )}
    </div> */}
  </>
);

export const PublicationContent = ({ post = {} }) => (
  <>
    <div className="c-blue-card__top-content">
      {getPostType(post) && (
        <h4 className="c-blue-card__type u-secondary-heading u-secondary-h4 u-detail--blue--small">
          {getPostType(post)}
        </h4>
      )}
      <h4 className="c-blue-card__heading u-primary-heading">{post.title}</h4>
      {post.standfirst ? (
        <div className="c-blue-card__lead u-body--dark-grey">
          <TextClamp text={post.standfirst} lines={3} />
        </div>
      ) : null}
    </div>
    <div>
      {post.date && (
        <p className="c-blue-card__date u-body--small">
          {post.date && dateToString({ start: post.date.utc })}
        </p>
      )}
    </div>
  </>
);

export const CourseContent = ({ post = {}, content = {} }) => (
  <>
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
              <TextClamp text={post.lead} lines={3} />
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
        <div className="c-blue-card__details">
          <p className="c-blue-card__date u-body--small">
            {post.startDate && <CalendorIcon />}
            {post.startDate && dateToString({ start: post.startDate.utc })}
          </p>
          {post._type !== 'event' && (
            <div className="c-blue-card__more">
              <div className="c-blue-card__link">
                <h4 className="u-secondary-heading u-secondary-h4">{content.label}</h4>
                <ArrowNext />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="c-blue-card__more">
        <div className="c-blue-card__link">
          <h4 className="u-secondary-heading u-secondary-h4">{content.label}</h4>
          <ArrowNext />
        </div>
      </div>
    </div>
  </>
);
