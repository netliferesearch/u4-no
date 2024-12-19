import React, { Fragment, useState } from 'react';
import { CourseResult } from './CourseResult';
import { CourseResultsSortingSelect } from './CourseResultsSortingSelect';

export const CourseResults = props => {
  const { totalCourses = 0 } = props;
  const [sortby, setSortby] = useState('recommended');

  // sort course list according to selected value of sortby
  const courses = props.courses.slice().sort((a, b) => {
    switch (sortby) {
      case 'date':
        // Check if both courses have a startDate
        if (a.startDate?.utc && b.startDate?.utc) {
          return new Date(a.startDate.utc) - new Date(b.startDate.utc);
        }
        // If only one course has a startDate, it should come first
        if (a.startDate?.utc) return -1;
        if (b.startDate?.utc) return 1;
        // If neither course has a startDate, Self-paced comes first
        if (a.mode === 'Self-paced' && b.mode !== 'Self-paced') return -1;
        if (a.mode !== 'Self-paced' && b.mode === 'Self-paced') return 1;
        // else use default order
        return a.defaultIndex - b.defaultIndex;
      case 'alphabetically':
        return a.title.localeCompare(b.title);
      default:
        return a.defaultIndex - b.defaultIndex;
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
