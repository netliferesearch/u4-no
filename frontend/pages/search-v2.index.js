import React from 'react';
import BEMHelper from 'react-bem-helper';
import { connect } from 'react-redux';

import buildSearchQuery from '../helpers/buildSearchQuery';
import DataLoader from '../helpers/data-loader';
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

const dataResolver = (data = []) => {
  if (Array.isArray(data)) {
    return data.filter(doc => (doc._type === 'person' ? (doc.affiliations && doc.affiliations.includes('419c2497-8e24-4599-9028-b5023830c87f')) : doc));
  }
  if (data.data) {
    return data.data.filter(doc => (doc._type === 'person' ? (doc.affiliations && doc.affiliations.includes('419c2497-8e24-4599-9028-b5023830c87f')) : doc));
  }
  return [];
};

const Search = ({
  data = [],
  searchFilters = [],
  searchSorting = '',
  url = '',
  topic = {},
}) => {
  const washedResults = dataResolver(data);
  if (!data) return <div />;
  return (
    <Layout
      noSearch
      searchV2
      headComponentConfig={{
      title: 'Search',
      description: '',
      url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
    }}
    >
      <div className="o-wrapper o-wrapper--padded o-layout o-layout--flush">
        <section className=" o-layout__item u-12/12 u-3/12@desktop">
          <SearchFiltersV2 />
        </section>

        <section className="o-layout__item u-12/12 u-8/12@desktop u-push-1/12@desktop">
          <SearchResultsV2
            results={sortResultsBySortCriteria({
            searchString: url.query.search || '',
            results: filterResultsBySearchFilterList(
              washedResults.filter(item => item.slug),
              searchFilters,
            ),
            sortCriteria: searchSorting,
          })}
          />
        </section>

      </div>
      <Footer />
    </Layout>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = () => ({});
export default DataLoader(connect(mapStateToProps, mapDispatchToProps)(Search), {
  materializeDepth: 0,
});
