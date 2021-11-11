import React from 'react';
import { useSelector } from 'react-redux';
import ElasticDataLoader from '../helpers/elastic-data-loader';
import Layout from '../components/Layout';
import Footer from '../components/general/footer/Footer';
import { SearchField } from '../components/search/SearchField';
import { wrapInRedux } from '../helpers/redux-store-wrapper';
import { PageIntro } from '../components/general/PageIntro';
import { SearchResults } from '../components/search/SearchResults';
import { SearchFilters } from '../components/search/SearchFilters';

const Search = ({ data = {}, url = '' }) => {
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
              <SearchField isOpen isAlwaysOpen searchData={data} />
            </div>
          </div>
          <hr className="u-section-underline--no-margins" />
        </div>

        {showResults && (
          <div className="o-wrapper-medium">
            <div className="c-search-page__sections">
              <section className="o-layout__item u-12/12 u-3/12@desktop">
                <SearchFilters data={data} />
              </section>
              <section className="o-layout__item u-12/12 u-8/12@desktop u-push-1/12@desktop">
                <SearchResults data={data} />
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
