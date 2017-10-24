import React, { Component } from 'react';
import axios from 'axios';
import sanityClient from '@sanity/client';
import Downshift from 'downshift';
import BEMHelper from 'react-bem-helper';

import DataLoader from '../helpers/data-loader';
import {Router} from '../routes'
import { Layout, Footer, SearchResults } from '../components/';

const classes = BEMHelper({
  name: 'search',
  prefix: 'c-',
});


const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: '',
  useCdn: false,
});

const buildQuery = value => `*[(title match '${value}*' || longTitle match '${value}*' || explainerText match '${value}*' || firstName match '${value}*' || surname match '${value}*' || email match '${value}*' || subtitle match '${value}*' || standfirst match '${value}*' || lead match '${value}*' || summaryExternal match '${value}*' || acknowledgements match '${value}*' || abstract match '${value}*' || description match '${value}*' || term match '${value}*' || definition match '${value}*' || keyword match '${value}*' || text match '${value}*' || origin match '${value}*' || url match '${value}*' || resolvedUrl match '${value}*' || crawledAt match '${value}*' || name match '${value}*' || language match '${value}*' || utc match '${value}*' || local match '${value}*' || timezone match '${value}*')][0...20]`;

function debounce(fn, time) {
  let timeoutId;
  return wrapper;
  function wrapper(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
    }, time);
  }
}

class AxiosAutocomplete extends Component {
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
          clearSelection
        }) => (
          <div>
            <label {...getLabelProps({ htmlFor: 'search' })}>
              Search
            </label>
            <input
              name='search'
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
                      .then((response) => {
                        const items = response.map(
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
            {isOpen && (
              <div {...classes('results')}>
                {this.state.items.map((item, index) => (
                  <div
                    key={index}
                    {...classes('items')}
                    {...getItemProps({
                      item,
                      style: {
                        color:
                            highlightedIndex === index ? 'white' : 'black',
                        backgroundColor:
                            highlightedIndex === index ? 'blue' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
              {selectedItem
              ? <button
                  css={{paddingTop: 4}}
                  onClick={clearSelection}
                  aria-label="clear selection"
                >
                  X
                </button>
              : null
              }
          </div>
        )}
      </Downshift>
    );
  }
}
function handleSubmit(e) {
  e.preventDefault()
  Router.pushRoute('search', { search: e.target.search.value })
}

const Search = (props) => (
  <Layout>
    {
      console.log(props)
    }
    <div className="o-wrapper-inner">
      <section id="searchInput" className="o-wrapper-inner">
        <div {...classes({ block: 'search-input' })}>
          <div {...classes({ block: 'search-input', element: 'content' })}>
            <h4 {...classes({ block: 'search-input', element: 'title' }) }>Find something on U4.no</h4>
            <form onSubmit={handleSubmit}>
              <AxiosAutocomplete onChange={selectedItem => console.log(selectedItem)} />
              <button type="submit" value="Search">Search</button>
            </form>
          </div>
        </div>
      </section>
      <section>
        <SearchResults />
      </section>
      </div>
    <Footer />
  </Layout>
);

export default DataLoader(Search, {
  queryFunc: ({ query }) => {
    return {
      sanityQuery: buildQuery(query.search)
    };
  },
  materializeDepth: 3,
});
