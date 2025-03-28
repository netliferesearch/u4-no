'use client';
import { useState } from 'react';

import { Filters } from './Filters';
import { Results } from './Results';

export const List = ({ tools }) => {
  const [filters, setFilters] = useState({});
  const totalTools = tools.length;
  const filteredTools = filterTools(tools, filters);

  function filterTools(tools, filters) {
    return tools.filter(tool => {
      // For each filter, check if the tool has a matching value
      for (let filterName in filters) {
        if (filters.hasOwnProperty(filterName)) {
          // If the tool does not have the property or none of its values match, exclude the tool
          if (!tool.hasOwnProperty(filterName)) {
            return false;
          }
          let toolValue = tool[filterName];
          let toolValues = Array.isArray(toolValue) ? toolValue : [toolValue];

          if (!toolValues.some(value => filters[filterName].has(value))) {
            return false;
          }
        }
      }
      // If the tool passed all filters, include it
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
        <Filters
          tools={tools}
          filters={filters}
          toggleFilter={toggleFilter}
          resetFilters={resetFilters}
        />
      </section>
      <section className="o-layout__item u-12/12 u-8/12@desktop u-push-1/12@desktop">
        <Results tools={filteredTools} totalTools={totalTools} />
      </section>
    </div>
  );
};
