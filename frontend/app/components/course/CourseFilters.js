'use client';

import { CourseFilterReset } from './CourseFilterReset';
import { CourseFilterCheckboxes } from './CourseFilterCheckboxes';

function toggle() {
  if (document) {
    document.querySelector('.c-filters-v2').classList.toggle('c-filters-v2--open');
  }
}

export const CourseFilters = ({ courses = [], filters = {}, toggleFilter, resetFilters }) => {
  const uniqueTopics = getUniqueTopics(courses);
  const uniqueModes = getUniqueModes(courses);

  function getUniqueModes(courses) {
    let uniqueModes = new Set();
    courses.forEach(course => {
      course.mode && uniqueModes.add(course.mode);
    });
    return Array.from(uniqueModes).sort((a, b) => a.localeCompare(b));
  }

  function getUniqueTopics(courses) {
    let uniqueTopics = new Set();

    courses.forEach(course => {
      if (course.topic && Array.isArray(course.topic)) {
        course.topic.forEach(topic => topic && uniqueTopics.add(topic));
      }
    });
    return Array.from(uniqueTopics).sort((a, b) => a.localeCompare(b));
  }

  return (
    <div>
      <button onClick={toggle} className="c-search-results-v2__topbar-filter">
        Filters
      </button>
      <div className="c-filters-v2">
        <div className="c-filters-v2__item--title">
          <div className="c-filters-v2__clear-all">
            <h4>Filters</h4>
            {Object.keys(filters).length > 0 && (
              <CourseFilterReset buttonText="Clear all" onClick={resetFilters} />
            )}
          </div>
        </div>

        <CourseFilterCheckboxes
          id="select-mode"
          title="Delivery Mode"
          placeholder="All modes"
          filters={filters}
          filterValues={uniqueModes}
          filterName="mode"
          onChange={toggleFilter}
        />

        <CourseFilterCheckboxes
          id="select-topic"
          title="Topics"
          placeholder="All topics"
          filters={filters}
          filterValues={uniqueTopics}
          filterName="topic"
          onChange={toggleFilter}
        />

        <CourseFilterCheckboxes
          id="select-lang"
          title="Language"
          placeholder="All languages"
          filters={filters}
          filterValues={['English', 'French', 'Spanish', 'Ukrainian', 'Arabic']}
          filterName="language"
          onChange={toggleFilter}
        />

        <button onClick={toggle} className="c-search-results-v2__topbar-filter-close">
          Close
        </button>
      </div>
    </div>
  );
};
