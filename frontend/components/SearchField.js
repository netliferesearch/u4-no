import React, { Component } from 'react';
import sanityClient from '@sanity/client';
import Downshift from 'downshift';
import BEMHelper from 'react-bem-helper';
import autobind from 'react-autobind';
import prioritize from './SearchFilters/searchWeighting';
import buildQuery from '../helpers/buildSearchQuery';
import { Loader } from '../components';
import { MagnifyingGlass } from '../components/icons';
import { Router } from '../routes';

const classes = BEMHelper({
  name: 'search',
  prefix: 'c-',
});

const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: '',
  useCdn: true,
});

const generateTitle = ({ title = false, firstName = false, surname = false }) => {
  if (title) return title;
  if (firstName) return `${firstName} ${surname}`;
  return 'no title';
};

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
    this.state = { items: [], loading: false };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: !this.state.loading,
    });
    Router.pushRoute(`/search?search=${e.target.search.value}`);
  }

  handleItemClick(item) {
    this.setState({
      loading: !this.state.loading,
    });
    Router.pushRoute(`/${item._type}s/${item.slug.current}`);
  }

  render() {
    const { modifier } = this.props;
    return (
      <Downshift id="autocomplete" onChange={this.props.onChange}>
        {({
          selectedItem,
          getInputProps,
          getItemProps,
          highlightedIndex,
          getLabelProps,
          isOpen,
          clearSelection,
          inputValue,
        }) => (
          <form onSubmit={this.handleSubmit} {...classes('', modifier, 'u-1/1')}>
            <label
              {...getLabelProps({ htmlFor: 'search' })}
<<<<<<< HEAD
              {...classes('label', modifier, 'u-margin-bottom-small')}
=======
              {...classes('label', modifier, 'u-margin-bottom-small', 'visually-hidden')}
>>>>>>> fix label and placeholder
            >
                Search to find topics, publications, people, services, and more:
            </label>

            <div className="c-search__content">

              <input
                autoFocus
                {...classes('input', modifier)}
                {...getInputProps({
                    id: 'search',
                    tabIndex: '0',
                    name: 'search',
                    placeholder: 'Search'
                    type: 'search',
                    value:
                      selectedItem && typeof selectedItem === 'object'
                        ? generateTitle(selectedItem)
                        : undefined,
                    onChange: (event) => {
                      const value = event.target.value;
                      if (!value) {
                        return;
                      }
                      if (event.keyCode != 8) {
                        // Allow backspace
                        debounce(
                          client
                            .fetch(buildQuery({ queryString: value, limit: { from: 0, to: 200 } }))
                            .then(({ results }) => {
                              const items = prioritize(value, results.map(item => item)); // Added ID to make it unique
                              this.setState({ items });
                            })
                            .catch((error) => {
                              console.log(error);
                            }),
                          300,
                        );
                      }
                    },
                    onKeyDown: (e) => {
                      // if enter pressed we reload search page with search value
                      if (e.keyCode !== 13) {
                        // if it's not enter do nothing
                      } else if (typeof highlightedIndex !== 'number') {
                        // if highlightedIndex is not a number it tells us that
                        // the user has clicked enter in the search field but not
                        // selected something from the dropdown. So, we just try
                        // make a search for it
                        Router.pushRoute(`/search?search=${e.target.value}`);
                      } else if (typeof highlightedIndex === 'number') {
                        // user has selected some item, we find it from state and
                        // visit it directly
                        const item = this.state.items[highlightedIndex];
                        this.handleItemClick(item);
                      }
                    },
                  })}
              />
              {inputValue && (
              <button {...classes('button', 'clear')} type="button" onClick={clearSelection}>
                    X
              </button>
                )}
<<<<<<< HEAD
              <button tabIndex="1" {...classes('button')} type="submit" value="Search">
                {this.state.loading ? <Loader /> : <MagnifyingGlass />}
              </button>
            </div>
            {isOpen && (
            <div {...classes('results')}>
              {this.state.items.map((item, index) => (
                <div
                  key={item._id ? item._id : index}
                  {...getItemProps({
=======
                <button tabIndex="1" {...classes('button')} type="submit" value="Search">
                  {this.state.loading ? <Loader /> : <MagnifyingGlass />}
                </button>
              </div>
            {isOpen && (
                <div {...classes('results')}>
                  {this.state.items.map((item, index) => (
                    <div
                      key={item._id ? item._id : index}
                      {...getItemProps({
>>>>>>> fix label and placeholder
                        item,
                        index,
                      })}
                >
                  <button
                    onClick={() => this.handleItemClick(item)}
                    {...classes('items', highlightedIndex === index ? 'highlighted' : null)}
                  >
                    <span className="c-search__items-type">{item._type}</span>
                    <br />
                    {generateTitle(item)}
                  </button>
                </div>
                  ))}
            </div>
              )}
          </form>
          )}
      </Downshift>
    );
  }
}

export default SearchField;
