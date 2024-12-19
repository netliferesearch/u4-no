'use client';
import { useState } from 'react';

import { CourseFilters } from './CourseFilters';
import { CourseResults } from './CourseResults';

export const CourseList = ({ courses }) => {
  const [filters, setFilters] = useState({});
  const totalCourses = courses.length;
  const filteredCourses = filterCourses(courses, filters);

  function filterCourses(courses, filters) {
    return courses.filter(course => {
      // For each filter, check if the course has a matching value
      for (let filterName in filters) {
        if (filters.hasOwnProperty(filterName)) {
          // If the course does not have the property or none of its values match, exclude the course
          if (!course.hasOwnProperty(filterName)) {
            return false;
          }
          let courseValue = course[filterName];
          let courseValues = Array.isArray(courseValue) ? courseValue : [courseValue];

          if (!courseValues.some(value => filters[filterName].has(value))) {
            return false;
          }
        }
      }
      // If the course passed all filters, include it
      return true;
    });
  }

  function toggleFilter(filterName, value) {
    setFilters(prevFilters => {
      // Make a copy of the previous filters
      let newFilters = { ...prevFilters };
      let filterValues = newFilters[filterName] ? new Set(newFilters[filterName]) : new Set();

      // If the value exists in the filter, remove it; otherwise, add it
      if (filterValues.has(value)) {
        filterValues.delete(value);
      } else {
        filterValues.add(value);
      }

      // If the filter is now an empty Set, remove it from the filters object
      if (filterValues.size === 0) {
        delete newFilters[filterName];
      } else {
        newFilters[filterName] = filterValues;
      }
      return newFilters;
    });
  }

  const resetFilters = () => {
    setFilters({});
  };

  return (
    <div className="c-search-page__sections">
      <section className="o-layout__item u-12/12 u-3/12@desktop">
        <CourseFilters
          courses={courses}
          filters={filters}
          toggleFilter={toggleFilter}
          resetFilters={resetFilters}
        />
      </section>
      <section className="o-layout__item u-12/12 u-8/12@desktop u-push-1/12@desktop">
        <CourseResults courses={filteredCourses} totalCourses={totalCourses} />
      </section>
    </div>
  );
};
