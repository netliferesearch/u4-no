import React from 'react';
import languageName from '../../helpers/languageName';
import { Translations } from '../general/translations/Translations';
import dateToString from '../../helpers/dateToString';
import { SidebarItem } from '../general/sidebar-item/SidebarItem';

export const CourseSidebar = ({ data }) => {
  const {
    language = '',
    startDate = null,
    endDate = null,
    courseType = {},
    otherLanguages = [],
    method = '',
    cost = '',
    duration = '',
    commitment = '',
    pdfAsset = {},
  } = data;

  return data ? (
    <div className="c-article-sidebar c-course-sidebar">
      <div className="c-course-sidebar__right">
        {method && <SidebarItem label="Course Type" content={method} />}
        {startDate && (
          <SidebarItem
            label="When"
            content={dateToString({ start: startDate.local || startDate.utc, end: endDate?.local || endDate?.utc || '' })}
          />
        )}
        {cost ? <SidebarItem label="Cost" content={cost} /> : null}
        {duration ? <SidebarItem label="Duration" content={duration} /> : null}
        {commitment ? <SidebarItem label="Commitment" content={commitment} /> : null}
        {language ? (
          <SidebarItem label="Language" content={languageName({ langcode: language })} />
        ) : null}
        {pdfAsset?.asset ? (
          <div className="c-article-sidebar__select">
            <a href={pdfAsset.asset.url} target="_blank" className="c-btn c-btn--primary" rel="noreferrer">
              <span>View course leaflet</span>
            </a>
          </div>
        ) : null}
        {/* {otherLanguages.length > 0 && (
          <div className="">
            <div className="c-article-sidebar__row--regular c-course-sidebar__row-first u-hidden--tablet">
              <Translations
                translations={otherLanguages}
                language={language}
                type={'course'}
                currentSlug={slug}
              />
            </div>
          </div>
        )}        {/* {otherLanguages.length > 0 && (
          <div className="">
            <div className="c-article-sidebar__row--regular c-course-sidebar__row-first u-hidden--tablet">
              <Translations
                translations={otherLanguages}
                language={language}
                type={'course'}
                currentSlug={slug}
              />
            </div>
          </div>
        )} */}
      </div>
    </div>
  ) : null;
};
