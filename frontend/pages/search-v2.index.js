import React from 'react';
import { connect } from 'react-redux';

import ElasticDataLoader from '../helpers/elastic-data-loader';
import { Layout, Footer, SearchResultsV2, SearchFiltersV2 } from '../components/';

const Search = ({
  data = {}, searchFilters = [], searchSorting = '', url = '', topic = {},
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
        <section className="o-layout__item u-12/12 u-3/12@desktop">
          <SearchFiltersV2 data={data} />
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
