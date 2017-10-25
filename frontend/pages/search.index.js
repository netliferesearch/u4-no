import React, { Component } from 'react';
import sanityClient from '@sanity/client';
import Downshift from 'downshift';
import BEMHelper from 'react-bem-helper';

import DataLoader from '../helpers/data-loader';
import { Router } from '../routes';
import { Layout, Footer, SearchResults } from '../components/';

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

const buildQuery = (value = '') => {
  console.log(value)
  const matchString = value.length ? value.split(' ').map(tkn => `"${tkn}*"`).join(',') : value;
  return `{ "results": *[(title match [${matchString}] || longTitle match [${matchString}] || explainerText match [${matchString}] || firstName match [${matchString}] || surname match [${matchString}] || email match [${matchString}] || subtitle match [${matchString}] || standfirst match [${matchString}] || lead match [${matchString}] || summaryExternal match [${matchString}] || acknowledgements match [${matchString}] || abstract match [${matchString}] || description match [${matchString}] || term match [${matchString}] || definition match [${matchString}] || keyword match [${matchString}] || text match [${matchString}] || origin match [${matchString}] || url match [${matchString}] || resolvedUrl match [${matchString}] || crawledAt match [${matchString}] || name match [${matchString}] || language match [${matchString}] || utc match [${matchString}] || local match [${matchString}] || timezone match [${matchString}])][0...20]{title, slug, date, _type} }`;
};

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
          clearSelection,
        }) => (
            <div>
              <form onSubmit={handleSubmit}>
            <label {...getLabelProps({ htmlFor: 'search' })}>
              Search
            </label>
            <input
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
                css={{ paddingTop: 4 }}
                onClick={clearSelection}
                aria-label="clear selection"
              >
                  X
              </button>
              : null
                }
            <button type="submit" value="Search">Search</button>
          </form>
          </div>
        )}
      </Downshift>
    );
  }
}
function handleChange(query) {

}
function handleSubmit(e) {
  e.preventDefault();
  console.log(e.target.search.value)
  Router.pushRoute(`search?search=${e.target.search.value}`);
}

const Search = props => (
  <Layout>
    {
      console.log(props)
    }
    <div className="o-wrapper-inner">
      <section id="searchInput" className="o-wrapper-inner">
        <div {...classes({ block: 'search-input' })}>
          <div {...classes({ block: 'search-input', element: 'content' })}>
            <h4 {...classes({ block: 'search-input', element: 'title' })}>Find something on U4.no</h4>
              <AxiosAutocomplete  />
          </div>
        </div>
      </section>
      <section>
        <SearchResults results={props.results} />
      </section>
    </div>
    <Footer />
  </Layout>
);

export default DataLoader(Search, {
  queryFunc: ({ query }) => ({
    sanityQuery: buildQuery(query.search),
  }),
  materializeDepth: 0,
});
