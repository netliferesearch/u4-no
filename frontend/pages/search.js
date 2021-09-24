import React from 'react';
import { connect, useSelector } from 'react-redux';
import ElasticDataLoader from '../helpers/elastic-data-loader';
import { updateSearchPageNum } from '../helpers/redux-store';
import Layout from '../components/Layout';
import Footer from '../components/general/footer/Footer';
import SearchFiltersV2 from '../components/search/SearchFilters-v2';
import { SearchFieldV3 } from '../components/search/SearchFieldV3';
import { wrapInRedux } from '../helpers/redux-store-wrapper';
import { PageIntro } from '../components/general/PageIntro';
import { SearchResultsV3 } from '../components/search/SearchResultsV3';
import { bindActionCreators } from 'redux';

const Search = ({ data = {}, url = '' }) => {
  const showResults = useSelector(state => state.searchResultsVisible);
  console.log('search page data', data);
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
      {console.log('data', data)}
      <div className="c-search-page">
        <div className="o-wrapper-medium">
          <PageIntro title="Search" text={'Browse the U4 site.'} />
        </div>
        <hr className="u-section-underline--no-margins" />
        <div className="o-wrapper-medium">
          <div className="c-menu__search-holder">
            <SearchFieldV3 isOpen={true} isAlwaysOpen={true} searchData={data} />
          </div>
        </div>
        <hr className="u-section-underline--no-margins" />
        {showResults && (
          <div className="o-wrapper-medium">
            <div className="c-search-page__sections">
              <section className="o-layout__item u-12/12 u-3/12@desktop">
                <SearchFiltersV2 data={data} />
              </section>
              <section className="o-layout__item u-12/12 u-8/12@desktop u-push-1/12@desktop">
                <SearchResultsV3 data={data} />
              </section>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </Layout>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  updateSearchPageNum: bindActionCreators(updateSearchPageNum, dispatch),
});
export default wrapInRedux(
  ElasticDataLoader(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Search)
  )
);
