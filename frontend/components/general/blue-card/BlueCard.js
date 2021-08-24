import React from 'react';
import dateToString from '../../../helpers/dateToString';
import LinkToItem from '../LinkToItem';
import LocationIcon from '../../icons/LocationIcon';
import { getPostType } from '../../../helpers/getRouteByType';
import { CalendorIcon } from '../../icons/CalendorIcon';
import { ArrowNext } from '../../icons/ArrowNext';
import TextClamp from 'react-string-clamp';

export const CARD_TYPE = {
  LARGE: '2-col',
  MEDIUM: '3-col',
  SMALL: '4-col',
  TOPIC: 'topic',
};

export const CONTENT_BY_TYPE = {
  COURSE: { label: 'Register', slug: 'courses/' },
  TOPIC: { label: '', slug: 'topics/' },
  PUBLICATION: { label: 'View More', slug: 'publications/' },
};

export const BlueCard = ({ post, type, content = {} }) => {
  return (
    <LinkToItem type={post._type} slug={post.slug}>
      <a className={`c-blue-card c-blue-card--${type}`}>
        <div className="c-blue-card__top-content">
          <div>
            {getPostType(post) && (
              <h4 className="c-blue-card__type u-secondary-heading u-secondary-h4 u-detail--blue--small">
                {getPostType(post)}
              </h4>
            )}
            {type === CARD_TYPE.TOPIC ? (
              <h2 className="u-secondary-heading u-secondary-h2 u-text--dark-blue">{post.title}</h2>
            ) : (
              <h4 className="c-blue-card__heading u-primary-heading">{post.title}</h4>
            )}
          </div>
          {post.lead && (
            <div className="c-blue-card__content--lead u-body--dark-grey">
              <TextClamp text={post.lead} lines={3} />
            </div>
          )}
          {type === CARD_TYPE.TOPIC && post.standfirst ? (
            <div className="u-body u-text--dark-blue c-blue-card__p--topic">
              <TextClamp text={post.standfirst} lines={3} />
            </div>
          ) : (
            <p className="u-body u-text--dark-blue c-blue-card__p--topic">{post.longTitle}</p>
          )}
        </div>
        {type === CARD_TYPE.TOPIC && post._updatedAt && (
          <p className="c-blue-card__date u-body--small">
            {post._updatedAt && 'Updated ' + dateToString({ start: post._updatedAt })}
          </p>
        )}
        {type !== CARD_TYPE.TOPIC && (
          <div className="c-blue-card__info">
            <p className="c-blue-card__location u-body--small">
              <LocationIcon /> {post.startDate.timezone}
            </p>
            <div className="c-blue-card__details">
              <p className="c-blue-card__date u-body--small">
                <CalendorIcon />
                {post.startDate && dateToString({ start: post.startDate.utc })}
              </p>
              <div className="c-blue-card__more">
                <div className="c-blue-card__link">
                  <h4 className="u-secondary-heading u-secondary-h4">{content.label}</h4>
                  <ArrowNext />
                </div>
              </div>
            </div>
          </div>
        )}
      </a>
    </LinkToItem>
  );
};
