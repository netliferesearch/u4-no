import React, { Fragment, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSearchSorting } from '../../helpers/redux-store';

const SearchResultsSortingSelect = ({
  searchSorting = 'Sort by',
  updateSearchSorting = () => {},
}) => {
  const [expanded, setExpanded] = useState('');
  return (
    <Fragment>
      <select
        id="select-sorting"
        value={searchSorting}
        onClick={e => {
          e.preventDefault();
          setExpanded(prevIsExpanded => !prevIsExpanded);
        }}
        onBlur={e => {
          e.preventDefault();
          setExpanded(false);
        }}
        onFocusOut={e => {
          e.preventDefault();
          setExpanded(false);
        }}
        onChange={e => updateSearchSorting(e.target.value)}
        className={`c-select ${expanded && 'expanded'} c-select__full-width-mobile`}
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
