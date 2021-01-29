import React from 'react';
import BEMHelper from 'react-bem-helper';
import languageName from '../../helpers/languageName';
import { Translations } from './Translations';
import dateToString from '../../helpers/dateToString';
import { PersonContactBasic } from './PersonBasic';

const classes = BEMHelper({
  name: 'article-sidebar',
  prefix: 'c-',
});

export const CourseSidebar = ({ data, side }) => {
  const {
    language = '',
    translations = {},
    slug = '',
    className = '',
    startDate = '',
    endDate = '',
    courseType = {},
    contact = [],
  } = data;

  return data ? (
    <div className="c-article-sidebar c-course-sidebar">
      {side === 'left' ? (
        <div {...classes('left')}>
          <div className="c-article-sidebar__date" />
          {translations.length > 0 && (
            <Translations
              translations={translations}
              language={language}
              route={'/courses'}
              currentSlug={slug}
            />
          )}
          <div className="c-article-sidebar__row--regular">
            {courseType.waitingListId !== 15 &&
              courseType.waitingListId !== 16 &&
              contact.filter(c => c._id === 'author-31').length > 0 && (
                <div id="contacts" className="">
                  <PersonContactBasic person={contact.find(c => c._id === 'author-31')} />
                </div>
              )}
          </div>
        </div>
      ) : null}

      {side === 'right' ? (
        <div {...classes('right')}>
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

          <div className="c-article-sidebar__row--regular">
            <hr className="u-section-underline--no-margins" />
            <h3 className="u-heading--5">Cost</h3>
            <p className="u-grey-text"></p>
          </div>

          {language && (
            <div className="c-article-sidebar__row--regular">
              <hr className="u-section-underline--no-margins" />
              <h3 className="u-heading--5">Language:</h3>
              <p className="u-grey-text">{languageName({ langcode: language })}</p>
            </div>
          )}

          <div className="c-article-sidebar__row--regular">
            <hr className="u-section-underline--no-margins" />
            <h3 className="u-heading--5">Duration</h3>
            <p className="u-grey-text" />
          </div>

          <div className="c-article-sidebar__row--regular">
            <hr className="u-section-underline--no-margins" />
            <h3 className="u-heading--5">Comitment</h3>
            <p className="u-grey-text" />
          </div>

          <div className="c-article-sidebar__row--regular">
            <div>
              <a
                // href={`/publications/${slug.current}.pdf`}
                //download={`/publication/${slug.current}.pdf`}
                target="_blank"
                className="c-btn c-btn--sec"
              >
                <span>View course leaflet (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
};
