import React from 'react';
import { LocationIcon } from '../icons/LocationIcon';
import { CalendorIcon } from '../icons/CalendorIcon';
import DateToString from '../../helpers/dateToString';
import { Topics } from '../general/topics/Topics';

export const EventSidebar = ({ data }) => {
  const { startDate = {}, pdfAsset = {}, topics = [] } = data;
  return data ? (
    <div className="c-article-sidebar c-course-sidebar">
      <div className="c-course-sidebar__right">
        {startDate.utc || data.location ? (
          <div className="c-article-sidebar__item">
            <h4 className="u-secondary-heading u-secondary-h4">Event details</h4>
            <hr className="u-section-underline--grey" />
            {data.location && (
              <p className="u-text--grey">
                <LocationIcon /> {data.location}
              </p>
            )}
            {startDate.utc && (
              <p className="u-text--grey">
                <CalendorIcon />
                {DateToString({ start: startDate.utc })}
              </p>
            )}
          </div>
        ) : null}

        {topics.length ? (
          <div className="c-article-sidebar__item">
            <h4 className="u-secondary-heading u-secondary-h4">Topics</h4>
            <hr className="u-section-underline--grey" />
            <Topics title={false} topics={topics} hr={false} />
          </div>
        ) : null}
        {pdfAsset.asset ? (
          <div className="c-article-sidebar__select">
            <a href={pdfAsset.asset.url} target="_blank" className="c-btn c-btn--primary">
              <span>View event leaflet</span>
            </a>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};
