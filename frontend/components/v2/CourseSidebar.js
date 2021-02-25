import React from 'react';
import BEMHelper from 'react-bem-helper';
import languageName from '../../helpers/languageName';
import { Translations } from './Translations';
import dateToString from '../../helpers/dateToString';
import { PersonContactBasic } from './PersonBasic';
import { Share } from './ShareOnSocialMedia';
import { CourseCoordinator } from './PersonBasic';
const classes = BEMHelper({
  name: 'article-sidebar',
  prefix: 'c-',
});

export const CourseSidebar = ({ data, side }) => {
  const {
    title = '',
    language = '',
    slug = '',
    className = '',
    startDate = '',
    endDate = '',
    courseType = {},
    coordinator = [],
    contact = [],
    otherLanguages = [],
    cost = '',
    duration = '',
    commitment = '',
    pdfAsset = {},
  } = data;

  return data ? (
    <div className="c-article-sidebar c-course-sidebar">
      {side === 'left' ? (
        <div className="c-article-sidebar__left c-course-sidebar__left">
          {otherLanguages.length > 0 && (
            <div className="u-hidden--tablet">
              <div className="c-article-sidebar__row--regular c-course-sidebar__row-first u-hidden--tablet">
                <Translations
                  translations={otherLanguages}
                  language={language}
                  type={'course'}
                  currentSlug={slug}
                />
              </div>
            </div>
          )}
          <div className="u-hidden--desktop">
            <div className="c-article-sidebar__row--regular c-course-sidebar__row-first">
              <Share text={title} />
              {otherLanguages.length > 0 && (
                <Translations
                  translations={otherLanguages}
                  language={language}
                  type={'course'}
                  currentSlug={slug}
                />
              )}
            </div>
          </div>
          <div className="u-hidden--desktop">
            <div className="c-article-sidebar__row--regular">
              <h3 className="u-heading--5">Course Type</h3>
              <p className="u-text--grey">{courseType.title}</p>
            </div>
            {startDate.utc && (
              <div className="c-article-sidebar__row--regular">
                <hr className="u-section-underline--no-margins" />
                <h3 className="u-heading--5">When</h3>
                <p className="u-text--grey">
                  {dateToString({ start: startDate.utc, end: endDate.utc || '' })}
                </p>
              </div>
            )}
            {cost ? (
              <div className="c-article-sidebar__row--regular">
                <hr className="u-section-underline--no-margins" />
                <h3 className="u-heading--5">{cost}</h3>
                <p className="u-text--grey" />
              </div>
            ) : null}
            {language && (
              <div className="c-article-sidebar__row--regular">
                <hr className="u-section-underline--no-margins" />
                <h3 className="u-heading--5">Language:</h3>
                <p className="u-text--grey">{languageName({ langcode: language })}</p>
              </div>
            )}
            {duration ? (
              <div className="c-article-sidebar__row--regular">
                <hr className="u-section-underline--no-margins" />
                <h3 className="u-heading--5">Duration</h3>
                <p className="u-text--grey">{duration}</p>
              </div>
            ) : null}

            {commitment ? (
              <div className="c-article-sidebar__row--regular">
                <hr className="u-section-underline--no-margins" />
                <h3 className="u-heading--5">Commitment</h3>
                <p className="u-text--grey">{commitment}</p>
              </div>
            ) : null}

            <hr className="u-section-underline--no-margins" />
          </div>
          <div className="u-hidden--tablet">
            <div className="c-article-sidebar__row--regular">
              {(courseType.waitingListId !== 15 &&
                courseType.waitingListId !== 16 &&
                coordinator.length > 0) ||
              contact.filter(c => c._id === 'author-31').length > 0 ? (
                <div>
                  <h3 className="u-heading--5">Course coordinator:</h3>
                  <PersonContactBasic
                    person={coordinator[0] || contact.find(c => c._id === 'author-31')}
                  />
                </div>
              ) : null}
            </div>
          </div>
          <div className="c-article-sidebar__row--regular">
            {(courseType.waitingListId !== 15 &&
              courseType.waitingListId !== 16 &&
              coordinator.length > 0) ||
            contact.filter(c => c._id === 'author-31').length > 0 ? (
              <div className="u-hidden--desktop">
                <CourseCoordinator
                  person={coordinator[0] || contact.find(c => c._id === 'author-31')}
                  url={pdfAsset.asset ? pdfAsset.asset.url : ''}
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {side === 'right' ? (
        <div className="c-course-sidebar__right u-hidden--tablet">
          <div className="c-article-sidebar__row--regular">
            <h3 className="u-heading--5">Course Type</h3>
            <p className="u-text--grey">{courseType.title}</p>
          </div>

          {startDate.utc && (
            <div className="c-article-sidebar__row--regular">
              <hr className="u-section-underline--no-margins" />
              <h3 className="u-heading--5">When</h3>
              <p className="u-text--grey">
                {dateToString({ start: startDate.utc, end: endDate.utc || '' })}
              </p>
            </div>
          )}

          {cost ? (
            <div className="c-article-sidebar__row--regular">
              <hr className="u-section-underline--no-margins" />
              <h3 className="u-heading--5">{cost}</h3>
              <p className="u-text--grey" />
            </div>
          ) : null}

          {language && (
            <div className="c-article-sidebar__row--regular">
              <hr className="u-section-underline--no-margins" />
              <h3 className="u-heading--5">Language:</h3>
              <p className="u-text--grey">{languageName({ langcode: language })}</p>
            </div>
          )}

          {duration ? (
            <div className="c-article-sidebar__row--regular">
              <hr className="u-section-underline--no-margins" />
              <h3 className="u-heading--5">Duration</h3>
              <p className="u-text--grey">{duration}</p>
            </div>
          ) : null}

          {commitment ? (
            <div className="c-article-sidebar__row--regular">
              <hr className="u-section-underline--no-margins" />
              <h3 className="u-heading--5">Commitment</h3>
              <p className="u-text--grey">{commitment}</p>
            </div>
          ) : null}

          {pdfAsset.asset ? (
            <div className="c-article-sidebar__select">
              <a href={pdfAsset.asset.url} target="_blank" className="c-btn c-btn--sec">
                <span>View course leaflet (PDF)</span>
              </a>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  ) : null;
};
