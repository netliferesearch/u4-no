import React, { Component } from 'react';
import Downshift from 'downshift';
import BEMHelper from 'react-bem-helper';
import autobind from 'react-autobind';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSearchPageNum } from '../helpers/redux-store';
import { LoaderV2 } from '../components';
import { SearchIcon } from '../components/icons';
import { Router } from '../routes';
import { withRouter } from 'next/router';
import queryString from 'query-string';

const classes = BEMHelper({
  name: 'search-v2',
  prefix: 'c-',
});

function debounce(fn, time) {
  let timeoutId;
  function wrapper(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
    }, time);
  }
  return wrapper;
}

class SearchFieldV2 extends Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      items: [],
      loading: false,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.updateSearch({ urlUpdateType: 'push', value: e.target.value });
  }

  componentDidUpdate(prevProps) {
    const { searchData: prevSearchData = {} } = prevProps;
    const { searchData = {} } = this.props;
    if (prevSearchData !== searchData) {
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    const { search: searchValue = '' } = this.props.router.query;
    const { current: input } = this.inputReference;
    if (input) {
      // Trick to put caret after word in input field.
      // Source: https://stackoverflow.com/a/2345915
      input.focus();
      input.value = '';
      input.value = searchValue;
    }
  }

  updateSearch({ urlUpdateType, value }) {
    this.setState(
      {
        // Prevent loading indicator from showing before search has been made.
        loading: value.length > 2,
      },
      () => {
        // whenever we do a new query we reset the search page, to avoid potentially
        // fetching a lot of results per key stroke. We reset to the default.
        this.props.updateSearchPageNum(1);
        debounce(() => {
          const queryParams = queryString.parse(location.search);
          const updatedQueryString = queryString.stringify({
            ...queryParams,
            search: value,
          });
          Router[`${urlUpdateType}Route`](`/search?${updatedQueryString}`);
          console.log('debounce was called');
        }, 100)();
      }
    );
  }

  inputReference = React.createRef();

  render() {
    const { modifier, triggerSearchMenu, isOpen = false, isAlwaysOpen = false } = this.props;
    if (!isOpen && !isAlwaysOpen) {
      return null;
    }
    const { search: searchValue = '' } = this.props.router.query;
    return (
      <Downshift
        id="autocomplete"
        onChange={this.props.onChange}
        defaultInputValue={searchValue}
        onInputValueChange={value => {
          if (!value) {
            // also triggered when we click outside of the search field,
            // so we must make sure to not update the search field in that
            // case.
            return;
          }
        }}
      >
        {({ getInputProps, getLabelProps }) => (
          <form onSubmit={this.handleSubmit} {...classes()}>
            <label
              {...getLabelProps({ htmlFor: 'search' })}
              {...classes('label', modifier, 'u-visually-hidden')}
            >
              Search to find topics, publications, people, services, and more:
            </label>
            <div className="c-search-v2__content">
              <button {...classes('button')} type="submit" value="Search">
                {this.state.loading ? <LoaderV2 /> : <SearchIcon />}
              </button>
              <input
                ref={this.inputReference}
                {...classes('input', modifier)}
                {...getInputProps({
                  id: 'search',
                  name: 'search',
                  type: 'search',
                  // prevents field from forgetting input
                  defaultValue: searchValue,
                  value: undefined,
                  onKeyDown: event => {
                    // While onChange is called every time the input field
                    // changes value, we need to also listen for the enter key
                    // so that we can re-trigger query.
                    if (event.keyCode === 13) {
                      this.updateSearch({ urlUpdateType: 'push', value: event.target.value });
                    }
                  },
                  onChange: event => {
                    this.updateSearch({ urlUpdateType: 'replace', value: event.target.value });
                  },
                })}
              />
              {!isAlwaysOpen && (
                <button {...classes('button')} type="button" onClick={triggerSearchMenu}>
                  ✕
                </button>
              )}
            </div>
          </form>
        )}
      </Downshift>
    );
  }
}

const mapStateToProps = ({ searchPageNum }) => ({ searchPageNum });
const mapDispatchToProps = dispatch => ({
  updateSearchPageNum: bindActionCreators(updateSearchPageNum, dispatch),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchFieldV2)
);
