import React from 'react';
import BEMHelper from 'react-bem-helper';
import languageName from '../../helpers/languageName';
import { Translations } from './Translations';
import moment from 'moment';
import dateToString from '../../helpers/dateToString';
import Team from '../Team';
import { PersonBasic, PersonContactBasic } from './PersonBasic';

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
    <div {...classes('', null, className)}>
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
              contact.filter(c => c._id === "author-31").length > 0 && (
                <div id="contacts" className="">
                  <PersonContactBasic person={contact.find(c => c._id === "author-31")} />
                </div>
              )}
          </div>
        </div>
      ) : null}

      {side === 'right' ? (
        <div {...classes('right')}>
          <div className="c-article-sidebar__row--regular">
            <h3 className="u-heading--7">Course Type</h3>
            <p>{courseType.title}</p>
          </div>

          {startDate.utc && (
            <div className="c-article-sidebar__row--regular">
              <h3 className="u-heading--7">When</h3>
              <p className="">{dateToString({ start: startDate.utc, end: endDate.utc || '' })}</p>
            </div>
          )}

          <div className="c-article-sidebar__row--regular">
            <h3 className="u-heading--7">Cost</h3>
            <p>Free</p>
          </div>

          {language && (
            <div className="c-article-sidebar__row--regular">
              <h3 className="u-heading--7">Language:</h3>
              <p>{languageName({ langcode: language })}</p>
            </div>
          )}

          <div className="c-article-sidebar__row--regular">
            <h3 className="u-heading--7">Duration</h3>
            <p />
          </div>

          <div className="c-article-sidebar__row--regular">
            <h3 className="u-heading--7">Comitment</h3>
            <p />
          </div>

          <div className="c-article-sidebar__row--regular">View course leaflet (PDF)</div>
        </div>
      ) : null}
    </div>
  ) : null;
};
