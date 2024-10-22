import React, { Fragment, useState } from 'react';
import { CourseResult } from './CourseResult';
import { CourseResultsSortingSelect } from './CourseResultsSortingSelect';

export const CourseResults = props => {
  const { totalCourses = 0 } = props;
  const [sortby, setSortby] = useState('recommended');
  
  // sort course list according to selected value of sortby
  const courses = props.courses.slice().sort((a, b) => {
    switch (sortby) {
      case 'recommended':
        return a.defaultIndex - b.defaultIndex;
      case 'date':
        const dateA = a.startDate?.utc ? new Date(a.startDate.utc) : null;
        const dateB = b.startDate?.utc ? new Date(b.startDate.utc) : null;
        const selfpacedFirst = a.mode === 'Self-paced' ? -1 : b.mode === 'Self-paced' ? 1 : 0;
        const dateFirst = dateA ? (dateB ? dateA - dateB : -1) : dateB ? 1 : 0;
        return selfpacedFirst || dateFirst;
      case 'alphabetically':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  return (
    <section className="c-search-results-v2--search">
      <div className="c-search-results-v2__topbar">
        <div className="c-search-results-v2__topbar__results">
          {courses.length === totalCourses
            ? `Showing all ${totalCourses} courses`
            : courses.length > 0
            ? `${courses.length} of ${totalCourses} courses match your selection`
            : `None of ${totalCourses} courses match your selection`}
        </div>
        {courses.length > 0 && (
          <div className="c-search-results-v2__topbar-sortby">
            <CourseResultsSortingSelect setSortby={setSortby} />
          </div>
        )}
      </div>
      <hr className="u-section-underline--no-margins" />
      <ul className="c-search-results-v2__content">
        {courses.map(course => (
          <li key={course._id} className="c-course-results__item">
            <CourseResult course={course} />
          </li>
        ))}
      </ul>
    </section>
  );
};
