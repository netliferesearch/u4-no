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
      <div className="c-input">
        <input type="radio" name="content" value="all-content" checked />
        <label htmlFor="all-content">All website content</label>
      </div>
      <div className="c-input">
        <input type="radio" name="content" value="publications-only" />
        <label htmlFor="publications-only" className="c-filters-v2__checkbox-label">Publications only</label>
      </div>
    </div>

    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Publication type</h3>
        <input className="c-filters-v2__clear" type="reset" value="Clear" />
      </div>
      <span>
        <div className="c-input">
          <input type="checkbox" id="pub-type-pubtype-1" value="pub-type-pubtype-1" />
          <label htmlFor="pub-type-pubtype-1">U4 Brief (137)</label>
        </div>
        <div className="c-input">
          <input type="checkbox" id="pub-type-pubtype-2" value="pub-type-pubtype-2" />
          <label htmlFor="pub-type-pubtype-2">U4 Issue (119)</label>
        </div>
        <div className="c-input">
          <input type="checkbox" id="pub-type-pubtype-3" value="pub-type-pubtype-3" />
          <label htmlFor="pub-type-pubtype-3">U4 Helpdesk Answer (303)</label>
        </div>
        <div className="c-input">
          <input type="checkbox" id="pub-type-pubtype-4" value="pub-type-pubtype-4" />
          <label htmlFor="pub-type-pubtype-4">U4 Report (6)</label>
        </div>
        <div className="c-input">
          <input type="checkbox" id="pub-type-pubtype-5" value="pub-type-pubtype-5" />
          <label htmlFor="pub-type-pubtype-5">Practice Insight (19)</label>
        </div>
      </span>
      <p>See all</p>
    </form>

    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Publication topics</h3>
        <input className="c-filters-v2__clear" type="reset" value="Clear" />
      </div>
      <span>
        <div className="c-input">
          <input type="checkbox" id="pub-type-pubtype-1" value="pub-type-pubtype-1" />
          <label htmlFor="pub-type-pubtype-1">Natural resources and energy (117)</label>
        </div>
        <div className="c-input">
          <input type="checkbox" id="pub-type-pubtype-2" value="pub-type-pubtype-2" />
          <label htmlFor="pub-type-pubtype-2">Development cooperation (88)</label>
        </div>
        <div className="c-input">
          <input type="checkbox" id="pub-type-pubtype-3" value="pub-type-pubtype-3" />
          <label htmlFor="pub-type-pubtype-3">International drivers of corruption (44)</label>
        </div>
        <div className="c-input">
          <input type="checkbox" id="pub-type-pubtype-4" value="pub-type-pubtype-4" />
          <label htmlFor="pub-type-pubtype-4">Justice sector (43)</label>
        </div>
        <div className="c-input">
          <input type="checkbox" id="pub-type-pubtype-5" value="pub-type-pubtype-5" />
          <label htmlFor="pub-type-pubtype-5">Public service delivery (41)</label>
        </div>
      </span>
      <p>See all</p>
    </form>

    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Languages</h3>
        <input className="c-filters-v2__clear" type="reset" value="Clear" />
      </div>
      <span>
        <div className="c-input">
          <input type="checkbox" id="pub-type-pubtype-1" value="pub-type-pubtype-1" />
          <label htmlFor="pub-type-pubtype-1">English (522)</label>
        </div>
        <div className="c-input">
          <input type="checkbox" id="pub-type-pubtype-2" value="pub-type-pubtype-2" />
          <label htmlFor="pub-type-pubtype-2">French (55)</label>
        </div>
        <div className="c-input">
          <input type="checkbox" id="pub-type-pubtype-3" value="pub-type-pubtype-3" />
          <label htmlFor="pub-type-pubtype-3">Ukranian (1)</label>
        </div>
        <div className="c-input">
          <input type="checkbox" id="pub-type-pubtype-4" value="pub-type-pubtype-4" />
          <label htmlFor="pub-type-pubtype-4">Russian (1)</label>
        </div>
      </span>
    </form>

    <div className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Year</h3>
      </div>
      <div className="c-filters-v2__select">
        <div>
          <label htmlFor="from">From:</label>
          <select id="from" className="c-select">
            <option selected value="2000">2000</option>
            <option value="2001">2001</option>
          </select>
        </div>
        <div>
          <label htmlFor="to">To:</label>
          <select id="to" className="c-select">
            <option selected value="2018">2018</option>
            <option selected value="2019">2019</option>
          </select>
        </div>
      </div>
    </div>

  </div>
);

export default SearchFiltersV2;
