import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  addSearchFilter,
  removeSearchFilter,
  clearAllSearchFilters,
  replaceSearchFilters,
} from '../helpers/redux-store';
import { SearchFilterReset } from './';

const getFromYear = ({ searchFilters = [] }) => {
  const yearFilter = searchFilters.find(name => name.startsWith('year-from'));
  if (!yearFilter) {
    return ''; // no active from year
  }
  const fromYear = /year-from-(.*)/gi.exec(yearFilter)[1];
  return parseInt(fromYear, 10);
};

const getToYear = ({ searchFilters = [] }) => {
  const yearFilter = searchFilters.find(name => name.startsWith('year-to'));
  if (!yearFilter) {
    return ''; // no active to year
  }
  const toYear = /year-to-(.*)/gi.exec(yearFilter)[1];
  return parseInt(toYear, 10);
};

const SearchFilterYears = props => {
  const { searchFilters, years = [], replaceSearchFilters } = props;
  return (
    <form className="c-filters-v2__item">
      <div className="c-filters-v2__item-head">
        <h3 className="c-filters-v2__title">Year</h3>
        <span className="c-filters-v2__clear">
          <SearchFilterReset filterPrefix="year-" />
        </span>
      </div>
      <span>
        <div className="c-filters-v2__select">
          <div>
            <label htmlFor="from">From:</label>
            <select
              id="from"
              className="c-select"
              onChange={event => {
                const value = event.target.value;
                const newFilters = [...searchFilters.filter(name => !name.startsWith('year-from'))];
                if (!value) {
                  return replaceSearchFilters(newFilters);
                }
                newFilters.push(`year-from-${value}`);
                replaceSearchFilters(newFilters);
              }}
              value={getFromYear({ searchFilters })}
            >
              {years.map((year, i) => (
                <option key={year} value={i === 0 ? '' : year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="to">To:</label>
            <select
              id="to"
              className="c-select"
              onChange={event => {
                const value = event.target.value;
                const newFilters = [...searchFilters.filter(name => !name.startsWith('year-to'))];
                if (!value) {
                  return replaceSearchFilters(newFilters);
                }
                newFilters.push(`year-to-${value}`);
                replaceSearchFilters(newFilters);
              }}
              value={getToYear({ searchFilters })}
            >
              {years
                .slice()
                .reverse()
                .map((year, i) => (
                  <option key={year} value={i === 0 ? '' : year}>
                    {year}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </span>
    </form>
  );
};

const getYearAggregations = ({
  minPublicationDateMilliSeconds: { value: min = 0 } = {},
  maxPublicationDateMilliSeconds: { value: max = 0 } = {},
} = {}) => {
  const minYear = new Date(min).getFullYear();
  const maxYear = new Date(max).getFullYear();
  const numberOfyears = maxYear - minYear + 1;
  if (numberOfyears < 0) {
    return []; // exit early if we can't create a sensible set of options
  }
  return [...Array(numberOfyears)].map((x, i) => minYear + i);
};

const mapStateToProps = ({ defaultSearchAggs, searchFilters }) => ({
  years: getYearAggregations(defaultSearchAggs),
  searchFilters,
});

const mapDispatchToProps = dispatch => ({
  addSearchFilter: bindActionCreators(addSearchFilter, dispatch),
  removeSearchFilter: bindActionCreators(removeSearchFilter, dispatch),
  clearAllSearchFilters: bindActionCreators(clearAllSearchFilters, dispatch),
  replaceSearchFilters: bindActionCreators(replaceSearchFilters, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFilterYears);
