import React from 'react';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'searchFilters',
  prefix: 'c-',
});

function toggle() {
  if (document) {
    document.querySelector('.c-filters-v2').classList.toggle('c-filters-v2--open');
    document.querySelector('html').classList.toggle('u-overflow-hidden');
  }
}

const SearchFiltersV2 = () => (
  <div className="c-filters-v2">
    <div className="c-filters-v2__topbar">
      <h3 className="c-filters-v2__topbar-result">Results (10)</h3>
      <button onClick={toggle} className="c-search-results-v2__topbar-filter">
        Update search
      </button>
    </div>
    <div className="c-filters-v2__item">
      <div className="c-filters-v2__radio">
        <input type="radio" name="content" value="all-content" checked />
        <label htmlFor="all-content" className="c-filters-v2__checkbox-label">All website content</label>
      </div>
      <div className="c-filters-v2__radio">
        <input type="radio" name="content" value="publications-only" />
        <label htmlFor="publications-only" className="c-filters-v2__checkbox-label">Publications only</label>
      </div>
    </div>

    <div className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Publication type</h3>
        <p className="c-filters-v2__clear">Clear</p>
      </div>
      <span>
        <div className="c-filters-v2__checkbox">
          <input type="checkbox" id="pub-type-pubtype-1" value="pub-type-pubtype-1" />
          <label htmlFor="pub-type-pubtype-1" className="c-filters-v2__checkbox-label">U4 Brief (137)</label>
        </div>
        <div className="c-filters-v2__checkbox">
          <input type="checkbox" id="pub-type-pubtype-2" value="pub-type-pubtype-2" />
          <label htmlFor="pub-type-pubtype-2" className="c-filters-v2__checkbox-label">U4 Issue (119)</label>
        </div>
        <div className="c-filters-v2__checkbox">
          <input type="checkbox" id="pub-type-pubtype-3" value="pub-type-pubtype-3" />
          <label htmlFor="pub-type-pubtype-3" className="c-filters-v2__checkbox-label">U4 Helpdesk Answer (303)</label>
        </div>
        <div className="c-filters-v2__checkbox">
          <input type="checkbox" id="pub-type-pubtype-4" value="pub-type-pubtype-4" />
          <label htmlFor="pub-type-pubtype-4" className="c-filters-v2__checkbox-label">U4 Report (6)</label>
        </div>
        <div className="c-filters-v2__checkbox">
          <input type="checkbox" id="pub-type-pubtype-5" value="pub-type-pubtype-5" />
          <label htmlFor="pub-type-pubtype-5" className="c-filters-v2__checkbox-label">Practice Insight (19)</label>
        </div>
      </span>
      <p>See all</p>
    </div>

    <div className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Publication topics</h3>
        <p className="c-filters-v2__clear">Clear</p>
      </div>
      <span>
        <div className="c-filters-v2__checkbox">
          <input type="checkbox" id="pub-type-pubtype-1" value="pub-type-pubtype-1" />
          <label htmlFor="pub-type-pubtype-1" className="c-filters-v2__checkbox-label">Natural resources and energy (117)</label>
        </div>
        <div className="c-filters-v2__checkbox">
          <input type="checkbox" id="pub-type-pubtype-2" value="pub-type-pubtype-2" />
          <label htmlFor="pub-type-pubtype-2" className="c-filters-v2__checkbox-label">Development cooperation (88)</label>
        </div>
        <div className="c-filters-v2__checkbox">
          <input type="checkbox" id="pub-type-pubtype-3" value="pub-type-pubtype-3" />
          <label htmlFor="pub-type-pubtype-3" className="c-filters-v2__checkbox-label">International drivers of corruption (44)</label>
        </div>
        <div className="c-filters-v2__checkbox">
          <input type="checkbox" id="pub-type-pubtype-4" value="pub-type-pubtype-4" />
          <label htmlFor="pub-type-pubtype-4" className="c-filters-v2__checkbox-label">Justice sector (43)</label>
        </div>
        <div className="c-filters-v2__checkbox">
          <input type="checkbox" id="pub-type-pubtype-5" value="pub-type-pubtype-5" />
          <label htmlFor="pub-type-pubtype-5" className="c-filters-v2__checkbox-label">Public service delivery (41)</label>
        </div>
      </span>
      <p>See all</p>
    </div>

    <div className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Languages</h3>
        <p className="c-filters-v2__clear">Clear</p>
      </div>
      <span>
        <div className="c-filters-v2__checkbox">
          <input type="checkbox" id="pub-type-pubtype-1" value="pub-type-pubtype-1" />
          <label htmlFor="pub-type-pubtype-1" className="c-filters-v2__checkbox-label">English (522)</label>
        </div>
        <div className="c-filters-v2__checkbox">
          <input type="checkbox" id="pub-type-pubtype-2" value="pub-type-pubtype-2" />
          <label htmlFor="pub-type-pubtype-2" className="c-filters-v2__checkbox-label">French (55)</label>
        </div>
        <div className="c-filters-v2__checkbox">
          <input type="checkbox" id="pub-type-pubtype-3" value="pub-type-pubtype-3" />
          <label htmlFor="pub-type-pubtype-3" className="c-filters-v2__checkbox-label">Ukranian (1)</label>
        </div>
        <div className="c-filters-v2__checkbox">
          <input type="checkbox" id="pub-type-pubtype-4" value="pub-type-pubtype-4" />
          <label htmlFor="pub-type-pubtype-4" className="c-filters-v2__checkbox-label">Russian (1)</label>
        </div>
      </span>
    </div>

    <div className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Year</h3>
        <p className="c-filters-v2__clear">Clear</p>
      </div>
      <span>
        <label htmlFor="from">From:</label>
        <select id="from">
          <option selected value="2000">2000</option>
          <option value="2001">2001</option>
        </select>

        <label htmlFor="to">To:</label>
        <select id="to">
          <option selected value="2018">2018</option>
          <option selected value="2019">2019</option>
        </select>

      </span>
    </div>

  </div>
);

export default SearchFiltersV2;
