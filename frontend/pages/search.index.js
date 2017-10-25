import React, { Component } from 'react';
import sanityClient from '@sanity/client';
import Downshift from 'downshift';
import BEMHelper from 'react-bem-helper';

import buildSearchQuery from '../helpers/buildSearchQuery';
import DataLoader from '../helpers/data-loader';
import { Router } from '../routes';
import { Layout, Footer, SearchResults, SearchField } from '../components/';

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


function handleChange(query) {

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
            <SearchField  />
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
    sanityQuery: buildSearchQuery(query.search),
  }),
  materializeDepth: 0,
});
