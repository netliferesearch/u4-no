import React from 'react';
import { connect } from 'react-redux';
import ElasticDataLoader from '../helpers/elastic-data-loader';

import Layout from '../components/Layout';
import Footer from '../components/general/footer/Footer';
import SearchResultsV2 from '../components/search/SearchResults-v2';
import SearchFiltersV2 from '../components/search/SearchFilters-v2';
import { wrapInRedux } from '../helpers/redux-store-wrapper';
import { PageIntro } from '../components/general/PageIntro';
import SearchFieldStationary from '../components/search/SearchFieldStationary';

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
      <div className="c-search-page">
        <div className="o-wrapper-medium">
          <PageIntro title="Search" text={'Browse the U4 site.'} />
        </div>
        <hr className="u-section-underline--no-margins" />
        <div className="o-wrapper-medium">
          <div className="c-menu__search-holder">
            <SearchFieldStationary isOpen={true} isAlwaysOpen={true} searchData={data} />
          </div>
        </div>
        <hr className="u-section-underline--no-margins" />
        <div className="o-wrapper-medium">
          <div className="c-search-page__sections">
            <section className="o-layout__item u-12/12 u-3/12@desktop">
              <SearchFiltersV2 data={data} />
            </section>
            <section className="o-layout__item u-12/12 u-8/12@desktop u-push-1/12@desktop">
              <SearchResultsV2 data={data} />
            </section>
          </div>
        </div>
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
