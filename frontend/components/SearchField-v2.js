import React, { Component } from 'react';
import Downshift from 'downshift';
import BEMHelper from 'react-bem-helper';
import autobind from 'react-autobind';
import { LoaderV2 } from '../components';
import { SearchIcon } from '../components/icons';
import { Router } from '../routes';
import { withRouter } from 'next/router';

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
      placeholderIndex: 0,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: !this.state.loading,
    });
    Router.pushRoute(`/search-v2?search=${e.target.search.value}`);
  }

  render() {
    const {
      modifier, triggerSearchMenu, isOpen = false, isAlwaysOpen = false,
    } = this.props;
    if (!isOpen && !isAlwaysOpen) {
      return null;
    }
    const { search: searchValue = '' } = this.props.router.query;
    return (
      <Downshift
        id="autocomplete"
        onChange={this.props.onChange}
        defaultInputValue={searchValue}
        onInputValueChange={(value) => {
          debounce(Router.pushRoute(`/search-v2?search=${value}`), 400);
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
              <button tabIndex="1" {...classes('button')} type="submit" value="Search">
                {this.state.loading ? <LoaderV2 /> : <SearchIcon />}
              </button>
              <input
                ref={(el) => {
                  this.el = el;
                }}
                autoFocus
                {...classes('input', modifier)}
                {...getInputProps({
                  id: 'search',
                  name: 'search',
                  type: 'search',
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

export default withRouter(SearchFieldV2);
