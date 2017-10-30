import React, { Component } from 'react';
import sanityClient from '@sanity/client';
import Downshift from 'downshift';
import BEMHelper from 'react-bem-helper';
import { connect } from 'react-redux';

import buildSearchQuery from '../helpers/buildSearchQuery';
import DataLoader from '../helpers/data-loader';
import { Router } from '../routes';
import {
  Layout,
  Footer,
  SearchResults,
  SearchField,
  SearchFilters,
  filterResultsBySearchFilterList,
} from '../components/';

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
const Search = ({ results = [], searchFilters = [] }) => (
  <Layout>
    <div className="o-layout o-layout--center c-search__wrapper">
      <div className="o-layout__item u-10/12  u-8/12@desktop u-6/12@wide">
        <section {...classes({ block: 'search-input', element: 'content' })}>
          <SearchField />
        </section>
      </div>
    </div>
    <div className="o-layout">
      <section className="o-layout__item u-10/12 u-push-1/12 u-6/12@desktop u-push-2/12@desktop u-6/12@wide u-push-3/12@wide" >
        <SearchResults
          results={filterResultsBySearchFilterList(
            results.filter(item => item.slug),
            searchFilters,
          )}
        />
      </section>
      <section className="o-layout__item u-2/12@desktop u-push-2/12@desktop u-2/12@wide u-push-3/12@wide">
        <SearchFilters results={results} />
      </section>
    </div>
    <Footer />
  </Layout>
);

const mapStateToProps = state => state;
const mapDispatchToProps = () => ({});
export default DataLoader(connect(mapStateToProps, mapDispatchToProps)(Search), {
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
