import React from 'react';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'searchFilters',
  prefix: 'c-',
});

const SearchFiltersV2 = () => (
  <div className="c-filters">
    <div className="c-filters__item">
      <h3 className="c-filters__title">Publication type</h3>
      <span>
        <div className="c-filters__checkbox">
          <input type="checkbox" id="pub-type-0" value="pub-type-0" />
          <label htmlFor="pub-type-0" className="c-filters__checkbox-label">All publications (587)</label>
        </div>
        <div className="c-filters__checkbox">
          <input type="checkbox" id="pub-type-pubtype-1" value="pub-type-pubtype-1" />
          <label htmlFor="pub-type-pubtype-1" className="c-filters__checkbox-label">U4 Brief (137)</label>
        </div>
        <div className="c-filters__checkbox">
          <input type="checkbox" id="pub-type-pubtype-2" value="pub-type-pubtype-2" />
          <label htmlFor="pub-type-pubtype-2" className="c-filters__checkbox-label">U4 Issue (119)</label>
        </div>
        <div className="c-filters__checkbox">
          <input type="checkbox" id="pub-type-pubtype-3" value="pub-type-pubtype-3" />
          <label htmlFor="pub-type-pubtype-3" className="c-filters__checkbox-label">U4 Helpdesk Answer (303)</label>
        </div>
        <div className="c-filters__checkbox">
          <input type="checkbox" id="pub-type-pubtype-4" value="pub-type-pubtype-4" />
          <label htmlFor="pub-type-pubtype-4" className="c-filters__checkbox-label">U4 Report (6)</label>
        </div>
        <div className="c-filters__checkbox">
          <input type="checkbox" id="pub-type-pubtype-5" value="pub-type-pubtype-5" />
          <label htmlFor="pub-type-pubtype-5" className="c-filters__checkbox-label">Practice Insight (19)</label>
        </div>
        <div className="c-filters__checkbox">
          <input type="checkbox" id="pub-type-pubtype-6" value="pub-type-pubtype-6" />
          <label htmlFor="pub-type-pubtype-6" className="c-filters__checkbox-label">U4 Practitioner Experience Note (3)</label>
        </div>
      </span>
    </div>
  </div>
);

export default SearchFiltersV2;
