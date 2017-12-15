import React from 'react';
import BEMHelper from 'react-bem-helper';
import { connect } from 'react-redux';

import buildSearchQuery from '../helpers/buildSearchQuery';
import DataLoader from '../helpers/data-loader';
import {
  Layout,
  Footer,
  SearchResults,
  SearchField,
  SearchFilters,
  filterResultsBySearchFilterList,
  sortResultsBySortCriteria,
} from '../components/';

const classes = BEMHelper({
  name: 'search',
  prefix: 'c-',
});

const Search = ({ results = [], searchFilters = [], searchSorting = '', url, topic = {} }) => (
  <Layout
    noSearch
    headComponentConfig={{
      title: 'Search',
      description: '',
      url: url.asPath ? `beta.u4.no${url.asPath}` : '',
    }}
  >
    <div className="o-layout o-layout--center c-search__wrapper">
      <div className="o-layout__item u-10/12  u-8/12@desktop u-6/12@wide">
        <section {...classes({ block: 'search-input', element: 'content' })}>
          <SearchField />
        </section>
        {
          topic && (<div>
            <h3>Viewing all resources for <a href={`/topics/${topic.slug.current}`}>{topic.title}</a></h3>
          </div>)
        }
      </div>
    </div>
    <div className="o-layout">
      <section className="o-layout__item u-10/12 u-push-1/12 u-6/12@desktop u-push-2/12@desktop u-6/12@wide u-push-3/12@wide">
        <SearchResults
          results={sortResultsBySortCriteria({
            results: filterResultsBySearchFilterList(
              results.filter(item => item.slug),
              searchFilters,
            ),
            sortCriteria: searchSorting,
          })}
        />
      </section>
      <section className=" o-layout__item u-3/12 u-2/12@desktop u-push-2/12@desktop u-2/12@wide u-push-3/12@wide">
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
    console.log('query', query)
    if (!query.search && !query.topics) {
      return {
        sanityQuery: false,
      };
    }
    if (!query.search && query.topics) {
      return {
        sanityQuery: `{
          "results": *[references("${query.topics}")][0..1000]{..., "authors": authors[]->{...}},
          "topic": *[_id == "${query.topics}"][0]
        }`,
      }
    }
    return {
      sanityQuery: buildSearchQuery({ queryString: query.search, limit: { from: 0, to: 1000 } }),
    };
  },
  materializeDepth: 0,
});
