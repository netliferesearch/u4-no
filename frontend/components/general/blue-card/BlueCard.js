import React from 'react';
import dateToString from '../../../helpers/dateToString';
import LinkToItem from '../../LinkToItem';
import LocationIcon from '../../icons/LocationIcon';
import { getPostType } from '../../../helpers/getRouteByType';
import { CalendorIcon } from '../../icons/CalendorIcon';
import { ArrowNext } from '../../icons/ArrowNext';

export const BlueCard = ({ post }) => {
  console.log(post);
  var type = null;
  var heading = null;
  if (post.lead) {
    type = 1;
    heading = 'u-heading--4';
  } else {
    type = 2;
    heading = 'u-secondary-heading-dark-blue u-secondary-h2';
  }
  return (
    <LinkToItem type={post._type} slug={post.slug}>
      <a className="c-events__item--small c-events-box">
        <div className="c-featured-post__text " style={{ height: '100%' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', height: '100%' }}>
            <div>
              {getPostType(post) && (
                <h5 className="u-secondary-heading u-secondary-h4 u-detail--blue--small">
                  {getPostType(post)}
                </h5>
              )}
              <h3 className={heading}>{post.title}</h3>
            </div>
            <p className="c-featured-post__intro u-body--grey c-event-intro-text">{post.lead}</p>
            <p className="u-body u-text--dark-blue c-topic-paragraph">{post.longTitle}</p>

            <div style={{ alignSelf: 'flex-end', width: '100%' }}>
              {type === 1 ? (
                <p className="c-events-location u-body--small">
                  <LocationIcon /> {post.startDate.timezone}
                </p>
              ) : null}
              {type === 1 ? (
                <p className="c-featured-post__date c-events-date u-body--small">
                  <CalendorIcon />
                  {post.startDate ? dateToString({ start: post.startDate.utc }) : null}
                </p>
              ) : null}
              {type === 1 ? (
                <div className="c-view-more">
                  <a className="c-events-view-more" href="/publications">
                    View more
                    <ArrowNext />
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </a>
    </LinkToItem>
  );
};
