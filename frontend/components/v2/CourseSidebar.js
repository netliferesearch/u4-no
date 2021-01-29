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
          <div className="c-article-sidebar__row--regular c-course-sidebar__row-first">
            <div className="u-hidden--desktop">
              <Share text={title} />
            </div>
            {otherLanguages.length > 0 && (
              <Translations
                translations={otherLanguages}
                language={language}
                type={'course'}
                currentSlug={slug}
              />
            )}
          </div>
          <div className="u-hidden--desktop">
            <div className="c-article-sidebar__row--regular">
              <h3 className="u-heading--5">Course Type</h3>
              <p className="u-grey-text">{courseType.title}</p>
            </div>
            {startDate.utc && (
              <div className="c-article-sidebar__row--regular">
                <hr className="u-section-underline--no-margins" />
                <h3 className="u-heading--5">When</h3>
                <p className="u-grey-text">
                  {dateToString({ start: startDate.utc, end: endDate.utc || '' })}
                </p>
              </div>
            )}
            {cost ? (
              <div className="c-article-sidebar__row--regular">
                <hr className="u-section-underline--no-margins" />
                <h3 className="u-heading--5">{cost}</h3>
                <p className="u-grey-text" />
              </div>
            ) : null}
            {language && (
              <div className="c-article-sidebar__row--regular">
                <hr className="u-section-underline--no-margins" />
                <h3 className="u-heading--5">Language:</h3>
                <p className="u-grey-text">{languageName({ langcode: language })}</p>
              </div>
            )}
            {duration ? (
              <div className="c-article-sidebar__row--regular">
                <hr className="u-section-underline--no-margins" />
                <h3 className="u-heading--5">Duration</h3>
                <p className="u-grey-text">{duration}</p>
              </div>
            ) : null}

            {commitment ? (
              <div className="c-article-sidebar__row--regular">
                <hr className="u-section-underline--no-margins" />
                <h3 className="u-heading--5">Commitment</h3>
                <p className="u-grey-text">{commitment}</p>
              </div>
            ) : null}

            <hr className="u-section-underline--no-margins" />
          </div>

          <div className="c-article-sidebar__row--regular">
            {(courseType.waitingListId !== 15 &&
              courseType.waitingListId !== 16 &&
              coordinator.length > 0) ||
            contact.filter(c => c._id === 'author-31').length > 0 ? (
              <div className="u-hidden--tablet">
                <h3 className="u-heading--5">Course coordinator:</h3>
                <PersonContactBasic
                  person={coordinator[0] || contact.find(c => c._id === 'author-31')}
                />
              </div>
            ) : null}
          </div>
          <div className="c-article-sidebar__row--regular">
            {(courseType.waitingListId !== 15 &&
              courseType.waitingListId !== 16 &&
              coordinator.length > 0) ||
            contact.filter(c => c._id === 'author-31').length > 0 ? (
              <div className="u-hidden--desktop">
                <CourseCoordinator
                  person={coordinator[0] || contact.find(c => c._id === 'author-31')}
                  url={pdfAsset.asset.url}
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
            <p className="u-grey-text">{courseType.title}</p>
          </div>

          {startDate.utc && (
            <div className="c-article-sidebar__row--regular">
              <hr className="u-section-underline--no-margins" />
              <h3 className="u-heading--5">When</h3>
              <p className="u-grey-text">
                {dateToString({ start: startDate.utc, end: endDate.utc || '' })}
              </p>
            </div>
          )}

          {cost ? (
            <div className="c-article-sidebar__row--regular">
              <hr className="u-section-underline--no-margins" />
              <h3 className="u-heading--5">{cost}</h3>
              <p className="u-grey-text" />
            </div>
          ) : null}

          {language && (
            <div className="c-article-sidebar__row--regular">
              <hr className="u-section-underline--no-margins" />
              <h3 className="u-heading--5">Language:</h3>
              <p className="u-grey-text">{languageName({ langcode: language })}</p>
            </div>
          )}

          {duration ? (
            <div className="c-article-sidebar__row--regular">
              <hr className="u-section-underline--no-margins" />
              <h3 className="u-heading--5">Duration</h3>
              <p className="u-grey-text">{duration}</p>
            </div>
          ) : null}

          {commitment ? (
            <div className="c-article-sidebar__row--regular">
              <hr className="u-section-underline--no-margins" />
              <h3 className="u-heading--5">Commitment</h3>
              <p className="u-grey-text">{commitment}</p>
            </div>
          ) : null}

          {pdfAsset.asset ? (
            <div className="c-article-sidebar__row--regular">
              <div>
                <a href={pdfAsset.asset.url} target="_blank" className="c-btn c-btn--sec">
                  <span>View course leaflet (PDF)</span>
                </a>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  ) : null;
};
