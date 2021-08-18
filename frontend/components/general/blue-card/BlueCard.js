import React from 'react';
import dateToString from '../../../helpers/dateToString';
import LinkToItem from '../LinkToItem';
import LocationIcon from '../../icons/LocationIcon';
import { getPostType } from '../../../helpers/getRouteByType';
import { CalendorIcon } from '../../icons/CalendorIcon';
import { ArrowNext } from '../../icons/ArrowNext';

export const CARD_TYPE = {
  LARGE: '2-col',
  MEDIUM: '3-col',
  SMALL: '4-col',
  TOPIC: 'topic',
};

export const BlueCard = ({ post, type }) => {
  return (
    <LinkToItem type={post._type} slug={post.slug}>
      <a className="c-blue-card">
        <div>
          {getPostType(post) && (
            <h4 className="u-secondary-heading u-secondary-h4 u-detail--blue--small">
              {getPostType(post)}
            </h4>
          )}
          {type === CARD_TYPE.TOPIC ? (
            <h2 className="u-secondary-heading u-secondary-h2">{post.title}</h2>
          ) : (
            <h4>{post.title}</h4>
          )}
        </div>
        <p className="c-featured-post__intro u-body--grey c-event-intro-text">{post.lead}</p>
        <p className="u-body u-text--dark-blue c-topic-paragraph">{post.longTitle}</p>
        {post.lead && (
          <div className="c-blue-card__info">
            <div>
              <p className="c-events-location u-body--small">
                <LocationIcon /> {post.startDate.timezone}
              </p>
            </div>
            <div
              className="c-blue-card__details"
              // style={{ display: 'flex', alignSelf: 'flex-end', width: '100%' }}
            >
              <p
                style={{ width: '50%' }}
                className="c-featured-post__date c-events-date u-body--small"
              >
                <CalendorIcon />
                {post.startDate ? dateToString({ start: post.startDate.utc }) : null}
              </p>
              <div className="c-blue-card__more">
                <a className="c-events-view-more" href="/publications">
                  View more
                  <ArrowNext />
                </a>
              </div>
            </div>
          </div>
        )}
      </a>
    </LinkToItem>
  );
};
