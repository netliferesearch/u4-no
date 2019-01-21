import React from 'react';
import BEMHelper from 'react-bem-helper';
import { connect } from 'react-redux';

import buildSearchQuery from '../helpers/buildSearchQuery';
import ElasticDataLoader from '../helpers/elastic-data-loader';
import {
  Layout,
  Footer,
  SearchResults,
  SearchResultsV2,
  SearchField,
  SearchFiltersV2,
  SearchFilters,
  filterResultsBySearchFilterList,
  sortResultsBySortCriteria,
} from '../components/';

const classes = BEMHelper({
  name: 'search',
  prefix: 'c-',
});

const Search = ({
  data = [], searchFilters = [], searchSorting = '', url = '', topic = {},
}) => {
  if (!data) return <div />;
  return (
    <Layout
      noSearch
      searchV2
      isSearchPage
      headComponentConfig={{
        title: 'Search',
        description: '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
      }}
    >
      <div className="o-wrapper o-wrapper--padded-large o-layout o-layout--flush">
        <section className=" o-layout__item u-12/12 u-3/12@desktop">
          <SearchFiltersV2 />
        </section>

        <section className="o-layout__item u-12/12 u-8/12@desktop u-push-1/12@desktop">
          <SearchResultsV2 data={data} />
        </section>
      </div>
      <Footer />
    </Layout>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = () => ({});
export default ElasticDataLoader(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search));
