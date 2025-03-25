'use client';

import { FilterReset } from './FilterReset';
import { FilterCheckboxes } from './FilterCheckboxes';

function toggle() {
  if (document) {
    document.querySelector('.c-filters-v2').classList.toggle('c-filters-v2--open');
  }
}

export const Filters = ({ tools = [], filters = {}, toggleFilter, resetFilters }) => {
  const uniqueTopics = getUniqueTopics(tools);
  const uniqueFrequencies = getUniqueFrequencies(tools);
  const uniqueCategories = getUniqueCategories(tools);

  function getUniqueCategories(tools) {
    let uniqueCategories = new Set();
    tools.forEach(tool => {
      tool.category && uniqueCategories.add(tool.category);
    });
    return Array.from(uniqueCategories).sort((a, b) => a.localeCompare(b));
  }
  function getUniqueFrequencies(tools) {
    let uniqueFrequencies = new Set();
    tools.forEach(tool => {
      tool.frequency && uniqueFrequencies.add(tool.frequency);
    });
    return Array.from(uniqueFrequencies).sort((a, b) => a.localeCompare(b));
  }

  function getUniqueTopics(tools) {
    let uniqueTopics = new Set();

    tools.forEach(tool => {
      if (tool.topic && Array.isArray(tool.topic)) {
        tool.topic.forEach(topic => topic && uniqueTopics.add(topic));
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
              <FilterReset buttonText="Clear all" onClick={resetFilters} />
            )}
          </div>
        </div>

        <FilterCheckboxes
          id="select-category"
          title="Analysis type"
          placeholder="All types"
          filters={filters}
          filterValues={uniqueCategories}
          filterName="category"
          onChange={toggleFilter}
        />
        <FilterCheckboxes
          id="select-frequency"
          title="Frequency"
          placeholder="All trequencies"
          filters={filters}
          filterValues={uniqueFrequencies}
          filterName="frequency"
          onChange={toggleFilter}
        />
        {/*
        <FilterCheckboxes
          id="select-topic"
          title="Topics"
          placeholder="All topics"
          filters={filters}
          filterValues={uniqueTopics}
          filterName="topic"
          onChange={toggleFilter}
        />
            */}
        <button onClick={toggle} className="c-search-results-v2__topbar-filter-close">
          Close
        </button>
      </div>
    </div>
  );
};
