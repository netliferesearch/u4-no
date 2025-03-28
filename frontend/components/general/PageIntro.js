import React from 'react';
import DateToString from '../../helpers/dateToString';
import { CalendorIcon } from '../icons/CalendorIcon';
import { LocationIcon } from '../icons/LocationIcon';
import { ArticleLead } from './article-lead/ArticleLead';

export const PageIntro = ({
  pubType = '',
  title = '',
  subtitle = '',
  text = '',
  abstract = '',
  contentType = '',
  type = 'basic',
  onDark = false,
  single = false,
  date = '',
  altDateText = null,
  location = '',
}) => {
  return (
    <div className={`c-page-intro c-page-intro--${type} ${single ? 'c-page-intro--single' : ''}`}>
      {contentType && (
        <h4
          className={`u-secondary-heading u-secondary-h4 u-detail--blue--small ${
            onDark ? 'u-text--white' : ''
          }`}
          dir="ltr"
        >
          {contentType}
        </h4>
      )}
      {title && (
        <>
          {single ? (
            <h2
              className={`c-page-intro__h ${
                onDark ? 'u-primary-heading--white' : 'u-primary-heading'
              }`}
            >
              {title}
            </h2>
          ) : (
            <h1
              className={`c-page-intro__h ${
                onDark ? 'u-primary-heading--white' : 'u-primary-heading'
              }`}
            >
              {title}
            </h1>
          )}
        </>
      )}
      {subtitle && (
        <h4
          className={`c-page-intro__h ${onDark ? 'u-primary-heading--white' : 'u-primary-heading'}`}
        >
          {subtitle}
        </h4>
      )}
      {text && pubType === 'publication' && (
        <ArticleLead lead={abstract ? '' : text} abstract={abstract} />
      )}
      {text && pubType !== 'publication' && (
        <div
          className={`c-page-intro__p ${onDark ? 'u-text--white' : 'u-text--dark-grey'} ${
            single ? 'u-body--large u-text--dark-grey' : 'u-body'
          }`}
        >
          {text}
        </div>
      )}
      {(location || date || altDateText) && (
        <div className="c-blue-card__info">
          {location && (
            <p className="c-blue-card__location ">
              <LocationIcon /> {location}
            </p>
          )}
          {(date || altDateText) && (
            <div className="c-blue-card__details">
              <p className="c-blue-card__date ">
                <CalendorIcon />
                {altDateText ? altDateText : DateToString({ start: date })}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
