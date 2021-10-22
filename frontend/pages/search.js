import React from 'react';
import { useSelector } from 'react-redux';
import ElasticDataLoader from '../helpers/elastic-data-loader';
import Layout from '../components/Layout';
import Footer from '../components/general/footer/Footer';
import { SearchFieldV3 } from '../components/search/SearchFieldV3';
import { wrapInRedux } from '../helpers/redux-store-wrapper';
import { PageIntro } from '../components/general/PageIntro';
import { SearchResultsV3 } from '../components/search/SearchResultsV3';
import { SearchFiltersV3 } from '../components/search/SearchFiltersV3';

const Search = ({ data = {}, url = '' }) => {
  console.log({ data });
  const showResults = useSelector(state => state.searchResultsVisible);
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
        <div>
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
        </div>

        {showResults && (
          <div className="o-wrapper-medium">
            <div className="c-search-page__sections">
              <section className="o-layout__item u-12/12 u-3/12@desktop">
                <SearchFiltersV3 data={data} />
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

export default wrapInRedux(ElasticDataLoader(Search));
