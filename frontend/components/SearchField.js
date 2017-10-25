import React, { Component } from 'react';
import sanityClient from '@sanity/client';
import Downshift from 'downshift';
import BEMHelper from 'react-bem-helper';
import DataLoader from '../helpers/data-loader';
import buildQuery from '../helpers/buildSearchQuery';
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

function handleSubmit(e) {
  e.preventDefault();
  console.log(e.target.search.value);
  Router.pushRoute(`search?search=${e.target.search.value}`);
}


class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  render() {
    return (
      <Downshift
        id="autocomplete"
        onChange={this.props.onChange}
      >
        {({
          selectedItem,
          getInputProps,
          getItemProps,
          highlightedIndex,
          getLabelProps,
          isOpen,
          clearSelection,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="c-search u-margin-bottom-huge u-1/1"
          >
            <label
              {...getLabelProps({ htmlFor: 'search' })}
              {...classes('label', 'u-margin-bottom-small')}
            >
                Search for topics, publications, people and all the other stuff
            </label>
            <div className="c-search__content">
              <input
                placeholder="Search"
                name="search"
                {...getInputProps({ id: 'search' })}
                {...classes('input')}
                {...getInputProps({
                  onChange: (event) => {
                    const value = event.target.value;
                    if (!value) {
                      return;
                    }
                    debounce(
                      client
                        .fetch(buildQuery(value))
                        .then(({ results }) => {
                          const items = results.map(
                            item => `${item.title}`,
                          ); // Added ID to make it unique
                          this.setState({ items });
                        })
                        .catch((error) => {
                          console.log(error);
                        }),
                      300,
                    );
                  },
                })}
              />
              <button {...classes('button')}type="submit" value="Search"><MagnifyingGlass /></button>
            </div>
            {isOpen && (
              <div {...classes('results')}>
                {this.state.items.map((item, index) => (
                  <div
                    key={index}
                    {...classes('items', highlightedIndex === index ? 'highlighted' : null)}
                    {...getItemProps({
                      item,
                    })}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
            {selectedItem
              ? <button
                css={{ paddingTop: 4 }}
                onClick={clearSelection}
                aria-label="clear selection"
              >
                  X
              </button>
              : null
            }
          </form>

        )}
      </Downshift>
    );
  }
}


export default SearchField;
