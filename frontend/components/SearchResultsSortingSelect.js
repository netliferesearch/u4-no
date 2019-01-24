import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSearchSorting } from '../helpers/redux-store';
/*

query paramenter

1. on load figure out if sort parameter is set and put it in class state, so that right select option is activated
2. when select element is selected, update state + url.

*/
class SearchResultsSortingSelect extends React.Component {
  render() {
    const { searchSorting = 'relevance', updateSearchSorting = () => {} } = this.props;
    return (<Fragment>
      <label>Sort by </label>
      <select
        defaultValue={searchSorting}
        onChange={e => updateSearchSorting(e.target.value)}
        className="c-select c-select__full-width-mobile"
      >
        <option value="relevance">Relevance</option>
        <option value="year-desc">Year, new → old</option>
        <option value="year-asc">Year, old → new</option>
      </select>
    </Fragment>);
  }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  updateSearchSorting: bindActionCreators(updateSearchSorting, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultsSortingSelect);
