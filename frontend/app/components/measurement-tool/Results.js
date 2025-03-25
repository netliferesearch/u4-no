import React, { Fragment, useState } from 'react';
import { Result } from './Result';
import { ResultsSortingSelect } from './ResultsSortingSelect';

export const Results = props => {
  const { totalTools = 0 } = props;
  const [sortby, setSortby] = useState('alphabetically');

  // sort tool list according to selected value of sortby
  const tools = props.tools.slice().sort((a, b) => {
    switch (sortby) {
      case 'date':
        // Check if both tools have a startDate
        if (a.startDate?.utc && b.startDate?.utc) {
          return new Date(a.startDate.utc) - new Date(b.startDate.utc);
        }
        // If only one tool has a startDate, it should come first
        if (a.startDate?.utc) return -1;
        if (b.startDate?.utc) return 1;
        // If neither tool has a startDate, Self-paced comes first
        if (a.mode === 'Self-paced' && b.mode !== 'Self-paced') return -1;
        if (a.mode !== 'Self-paced' && b.mode === 'Self-paced') return 1;
        // else use default order
        return a.defaultIndex - b.defaultIndex;
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return a.title.localeCompare(b.title);
    }
  });

  return (
    <section className="c-search-results-v2--search">
      <div className="c-search-results-v2__topbar">
        <div className="c-search-results-v2__topbar__results">
          {tools.length === totalTools
            ? `Showing all ${totalTools} tools`
            : tools.length > 0
            ? `${tools.length} of ${totalTools} tools match your selection`
            : `None of ${totalTools} tools match your selection`}
        </div>
        {tools.length > 0 && (
          <div className="c-search-results-v2__topbar-sortby">
            <ResultsSortingSelect setSortby={setSortby} />
          </div>
        )}
      </div>
      <hr className="u-section-underline--no-margins" />
      <ul className="c-search-results-v2__content">
        {tools.map(tool => (
          <li key={tool._id} className="c-tools-results__item">
            <Result tool={tool} key={tool._id} />
          </li>
        ))}
      </ul>
    </section>
  );
};
