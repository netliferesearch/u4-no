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

function handleChange(query) {}

const Search = ({ results = false }) => (
  <Layout>
    <div className="o-layout">
      <div className="o-layout__item u-1/1 o-layout c-search__wrapper">
        <div className="o-layout__item u-6/12 u-push-3/12">
          <section {...classes({ block: 'search-input', element: 'content' })}>
            <SearchField />
          </section>
        </div>
      </div>

      <section className="o-layout__item u-6/12 u-push-3/12">
        {results && <SearchResults results={results.filter(item => item.slug)} />}
      </section>

      <section className="o-layout__item u-2/12">filters</section>
    </div>
    <Footer />
  </Layout>
);

export default DataLoader(Search, {
  queryFunc: ({ query }) => {
    if (!query.search) {
      return {
        sanityQuery: false,
      };
    }
    return {
      sanityQuery: buildSearchQuery({ queryString: query.search, limit: { from: 0, to: 1000 } }),
    };
  },
  materializeDepth: 0,
});
