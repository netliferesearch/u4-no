import Downshift from 'downshift';
import { withRouter } from 'next/router';
import queryString from 'query-string';
import React, { Component } from 'react';
import autobind from 'react-autobind';
import BEMHelper from 'react-bem-helper';
import SearchIcon from '../icons/SearchIcon';
import LoaderV2 from '../LoaderV2';

const classes = BEMHelper({
  name: 'search-v3',
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

class SearchField extends Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const { search: searchValue = '' } = this.props.router.query;
    const { current: input } = this.inputReference;
    if (input.value) {
      // Trick to put caret after word in input field.
      // Source: https://stackoverflow.com/a/2345915
      input.focus();
      input.value = '';
      input.value = searchValue;
    }
  }

  componentDidUpdate(prevProps) {
    this.updateLoadingState({ prevProps });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.updateSearch({ urlUpdateType: 'push', value: e.target.value });
  }

  handleInputChange(e) {
    e.persist();
    const { value = '' } = e.target;
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      if (value.length <= 2) {
        return null; // Do nothing.
      } else if (window.location.pathname !== '/search') {
        return this.updateSearch({
          urlUpdateType: 'push',
          value,
        });
      }
      return this.updateSearch({
        urlUpdateType: 'replace',
        value: e.target.value,
      });
    }, 400);
  }

  updateLoadingState({ prevProps }) {
    const { searchData: prevSearchData = {} } = prevProps;
    const { searchData = {} } = this.props;
    if (prevSearchData !== searchData) {
      this.setState({ loading: false });
    }
  }

  updateSearch({ urlUpdateType, value }) {
    this.setState(
      {
        // Prevent loading indicator from showing before search has been made.
        loading: value.length > 2,
      },
      () => {
        // if (window.location.pathname === '/search') {
        //   // whenever we do a new query we reset the search page, to avoid potentially
        //   // fetching a lot of results per key stroke. We reset to the default.
        //   this.props.updateSearchPageNum(1);
        // }
        debounce(() => {
          const queryParams = queryString.parse(location.search);
          const updatedQueryString = queryString.stringify({
            ...queryParams,
            search: value,
            searchPageNum: 1,
          });
          this.props.router[`${urlUpdateType}Route`](`/search?${updatedQueryString}`);
          console.log('debounce was called');
        }, 100)();
      }
    );
  }

  inputReference = React.createRef();

  render() {
    const {
      modifier,
      triggerSearchMenu,
      isOpen = false,
      isAlwaysOpen = false,
      router: { query: { search: searchValue = '' } = {} } = {},
    } = this.props;
    if (!isOpen && !isAlwaysOpen) {
      return null;
    }
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
              {...getLabelProps({
                htmlFor: 'search',
              })}
              {...classes('label', modifier, 'u-visually-hidden')}
            >
              Search to find topics, publications, people, services, and more:
            </label>
            <div className="c-search-v3__content">
              <input
                ref={this.inputReference}
                {...classes('input', modifier)}
                placeholder="Search the entire site"
                {...getInputProps({
                  id: 'search',
                  name: 'search',
                  type: 'search',
                  // prevents field from forgetting input
                  defaultValue: searchValue,
                  value: undefined,
                  onKeyDown: event => {
                    // Prevent the user from typing more if search is initiated on
                    // page different from the search page.
                    if (window.location.pathname !== '/search' && this.state.loading) {
                      event.preventDefault();
                      event.stopPropagation();
                      return;
                    }
                    // While onChange is called every time the input field
                    // changes value, we need to also listen for the enter key
                    // so that we can re-trigger query.
                    if (event.keyCode === 13) {
                      this.updateSearch({
                        urlUpdateType: 'push',
                        value: event.target.value,
                      });
                    }
                  },
                  onChange: e => this.handleInputChange(e),
                })}
              />
              {!isAlwaysOpen && (
                <button {...classes('button')} type="button" onClick={triggerSearchMenu}>
                  ✕
                </button>
              )}
            </div>
            <button {...classes('button')} type="submit" value="Search">
              {this.state.loading ? <LoaderV2 /> : <SearchIcon />}
            </button>
          </form>
        )}
      </Downshift>
    );
  }
}

export default withRouter(SearchField);
