import React from 'react';
import { connect } from 'react-redux';
import ElasticDataLoader from '../helpers/elastic-data-loader';

import Layout from '../components/Layout';
import Footer from '../components/Footer';
import SearchResultsV2 from '../components/SearchResults-v2';
import SearchFiltersV2 from '../components/SearchFilters-v2';
import { wrapInRedux } from '../helpers/redux-store-wrapper';

const Search = ({ data = {}, url = '' }) => {
  if (!data) return <div />;
  return (
    <Layout
      
      searchV2
      isSearchPage
      headComponentConfig={{
        title: 'Search',
        description: '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
      }}
      searchData={data}
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
export default wrapInRedux(
  ElasticDataLoader(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Search)
  )
);
