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
  const { buttonText, searchFilters = [], replaceSearchFilters, filterPrefix = '' } = props;
  const activeFilters = searchFilters.filter(name => name.indexOf(filterPrefix) !== -1);
  if (activeFilters.length === 0) {
    return null;
  }
  return (
    <button
      className="c-filters-v2-btn"
      onClick={event => {
        event.preventDefault();
        replaceSearchFilters(searchFilters.filter(name => name.indexOf(filterPrefix) === -1));
      }}
    >
      {buttonText}
    </button>
  );
};

SearchFilterReset.propTypes = {
  searchFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  replaceSearchFilters: PropTypes.func.isRequired,
  filterPrefix: PropTypes.string,
  buttonText: PropTypes.string,
};

SearchFilterReset.defaultProps = {
  filterPrefix: '',
  buttonText: 'Clear',
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
