import { React, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  addSearchFilter,
  removeSearchFilter,
  clearAllSearchFilters,
  replaceSearchFilters,
} from '../../helpers/redux-store';

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
  const [fromExpanded, setFromExpanded] = useState('');
  const [toExpanded, setToExpanded] = useState('');
  return (
    <form className="c-filters-v2__item--date">
      <div className="c-filters-v2__item--date-section">
        <div className="c-filters-v2__item-head">
          <h3 className="c-filters-v2__title">From</h3>
        </div>
        <span>
          <div className="c-filters-v2__select">
            <select
              onClick={e => {
                e.preventDefault();
                setFromExpanded(prevIsExpanded => !prevIsExpanded);
              }}
              onBlur={e => {
                e.preventDefault();
                setFromExpanded(false);
              }}
              id="from"
              className={`c-select ${fromExpanded && 'expanded'}`}
              onChange={event => {
                const value = event.target.value;
                console.log(value);
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
                <option className="c-select__option" key={year} value={i === 0 ? '' : year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </span>
      </div>
      <div className="c-filters-v2__item--date-section">
        <div className="c-filters-v2__item-head">
          <h3 className="c-filters-v2__title">To</h3>
        </div>
        <span>
          <div className="c-filters-v2__select">
            <select
              onClick={e => {
                e.preventDefault();
                setToExpanded(prevToExpanded => !prevToExpanded);
              }}
              onBlur={e => {
                e.preventDefault();
                setToExpanded(false);
              }}
              id="to"
              className={`c-select ${toExpanded && 'expanded'}`}
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
        </span>
      </div>
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
