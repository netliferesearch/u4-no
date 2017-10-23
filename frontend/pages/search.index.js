import React, { Component } from 'react';
import axios from 'axios';
import sanityClient from '@sanity/client';
import Downshift from 'downshift';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper({
  name: 'search',
  prefix: 'c-',
});

import { Layout, Footer } from '../components/';

const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: '',
  useCdn: false,
});

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

const baseEndpoint = 'https://api.github.com/search/repositories?q=';

class AxiosAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  render() {
    return (
      <Downshift>
        {({
          selectedItem,
          getInputProps,
          getItemProps,
          highlightedIndex,
          isOpen,
        }) => (
          <div>
              <input
                {...classes('input')}
              {...getInputProps({
                onChange: (event) => {
                  const value = event.target.value;
                  if (!value) {
                    return;
                  }
                  debounce(
                    client
                      .fetch(`*[(title match '${value}*' || longTitle match '${value}*' || explainerText match '${value}*' || firstName match '${value}*' || surname match '${value}*' || email match '${value}*' || subtitle match '${value}*' || standfirst match '${value}*' || lead match '${value}*' || summaryExternal match '${value}*' || acknowledgements match '${value}*' || abstract match '${value}*' || description match '${value}*' || term match '${value}*' || definition match '${value}*' || keyword match '${value}*' || text match '${value}*' || origin match '${value}*' || url match '${value}*' || resolvedUrl match '${value}*' || crawledAt match '${value}*' || name match '${value}*' || language match '${value}*' || utc match '${value}*' || local match '${value}*' || timezone match '${value}*')][0...20]`)
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
          </div>
        )}
      </Downshift>
    );
  }
}

const Search = () => (
  <Layout>
    <div className="o-wrapper-inner">
      <h1 className="c-topic-page_title">Search</h1>
      <h2 className="c-topic-page__longTitle">Find something on U4.no</h2>
      <section id="searchInput" className="o-wrapper-inner">
        <div {...classes({ block: 'search-input' })}>
          <div {...classes({ block: 'search-input', element: 'content' })}>
            <h4 {...classes({ block: 'search-input', element: 'title' })}>Find something on U4.no</h4>
            <AxiosAutocomplete />
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </Layout>
);

export default Search;
