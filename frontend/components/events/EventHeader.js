import React from 'react';
import { PageIntro } from '../general/PageIntro';
import { getPostType } from '../../helpers/getRouteByType';

export const EventHeader = ({ data }) => {
  const {
    title = '',
    lead = '',
    startDate = {},
    location = '',
    featuredImage = {},
    vimeo = '',
    eventLink = '',
    eventType = '',
    _type = 'event',
  } = data;
  const contentType = getPostType(data);
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
          contentType={contentType}
          type="withBreadcrumb"
          single
          date={startDate.utc}
          location={location}
        />
        {eventLink && (
          <div className="c-course-entry__btn-row">
            <button className="c-btn c-btn--primary">
              <a href={eventLink}>Register</a>
            </button>
          </div>
        )}
      </div>
    </div>
  ) : null;
};
