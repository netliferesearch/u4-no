import React from 'react';
import { PageIntro } from '../general/PageIntro';
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
  } = data;
  let contentType;
  switch (eventType) {
    case 'incountryworkshop':
      contentType = 'In-country workshop';
      break;
    case 'hqworkshop':
      contentType = 'HQ workshop';
      break;
    default:
      contentType = 'Event';
      break;
  }
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
          single={true}
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
