import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  addSearchFilter,
  removeSearchFilter,
  clearAllSearchFilters,
  replaceSearchFilters,
} from '../helpers/redux-store';

const SearchFilterReset = props => {
  const { children, searchFilters = [], replaceSearchFilters, filterPrefix = '' } = props;
  const activeFilters = searchFilters.filter(name => name.indexOf(filterPrefix) !== -1);
  return (
    <button
      className="c-search-filter-reset"
      onClick={event => {
        event.preventDefault();
        replaceSearchFilters(searchFilters.filter(name => name.indexOf(filterPrefix) === -1));
      }}
      disabled={activeFilters.length === 0}
    >
      {activeFilters.length > 0 ? children : null}
    </button>
  );
};

SearchFilterReset.propTypes = {
  searchFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  replaceSearchFilters: PropTypes.func.isRequired,
  filterPrefix: PropTypes.string,
  children: PropTypes.any,
};

SearchFilterReset.defaultProps = {
  filterPrefix: '',
  children: 'Clear',
};

const mapStateToProps = ({ searchFilters }) => ({
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
)(SearchFilterReset);
