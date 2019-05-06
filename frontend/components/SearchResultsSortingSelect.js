import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSearchSorting } from '../helpers/redux-store';

const SearchResultsSortingSelect = ({ searchSorting = '', updateSearchSorting = () => {} }) => {
  return (
    <Fragment>
      <label htmlFor="select-sorting">Sort by </label>
      <select
        id="select-sorting"
        value={searchSorting}
        onChange={e => updateSearchSorting(e.target.value)}
        className="c-select c-select__full-width-mobile"
      >
        <option value="relevance">Relevance</option>
        <option value="year-desc">Year, new → old</option>
        <option value="year-asc">Year, old → new</option>
      </select>
    </Fragment>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  updateSearchSorting: bindActionCreators(updateSearchSorting, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsSortingSelect);
