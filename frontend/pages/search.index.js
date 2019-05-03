import React from 'react';
import BEMHelper from 'react-bem-helper';
import { connect } from 'react-redux';

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

const dataResolver = (data = []) => {
  if (Array.isArray(data)) {
    return data.filter(doc =>
      doc._type === 'person'
        ? doc.affiliations && doc.affiliations.includes('419c2497-8e24-4599-9028-b5023830c87f')
        : doc
    );
  }
  if (data.data) {
    return data.data.filter(doc =>
      doc._type === 'person'
        ? doc.affiliations && doc.affiliations.includes('419c2497-8e24-4599-9028-b5023830c87f')
        : doc
    );
  }
  return [];
};

const Search = ({ data = [], searchFilters = [], searchSorting = '', url = '', topic = {} }) => {
  const washedResults = dataResolver(data);
  if (!data) return <div />;
  return (
    <Layout
      noSearch
      headComponentConfig={{
        title: 'Search',
        description: '',
        url: url.asPath ? `https://www.u4.no${url.asPath}` : '',
      }}
    >
      <div className="o-layout o-layout--center c-search__wrapper">
        <div className="o-layout__item u-10/12  u-8/12@desktop u-6/12@wide">
          <section {...classes({ block: 'search-input', element: 'content' })}>
            <SearchField />
          </section>
          {topic && topic.slug && (
            <div>
              <h3>
                Viewing all resources for{' '}
                <a href={`/topics/${topic.slug.current}`}>{topic.title}</a>
              </h3>
            </div>
          )}
        </div>
      </div>
      <div className="o-layout">
        <section className="o-layout__item u-10/12 u-push-1/12 u-6/12@desktop u-push-2/12@desktop u-6/12@wide u-push-3/12@wide">
          <SearchResults
            results={sortResultsBySortCriteria({
              searchString: url.query.search || '',
              results: filterResultsBySearchFilterList(
                washedResults.filter(item => item.slug),
                searchFilters
              ),
              sortCriteria: searchSorting,
            })}
          />
        </section>
        <section className=" o-layout__item u-3/12 u-3/12@desktop u-push-3/12@desktop u-2/12@wide u-push-4/12@wide">
          <SearchFilters results={washedResults} />
        </section>
      </div>
      <Footer />
    </Layout>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = () => ({});
export default DataLoader(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search),
  {
    queryFunc: ({ query }) => {
      if (!query.search && !query.topics) {
        return {
          sanityQuery: false,
        };
      }
      if (!query.search && query.topics) {
        return {
          sanityQuery: `{
          "data": *[references("${query.topics}")][0..1000]{..., "authors": authors[]->{...}},
          "topic": *[_id == "${query.topics}"][0]
        }`,
        };
      }
      return {
        sanityQuery: buildSearchQuery({ queryString: query.search, limit: { from: 0, to: 1000 } }),
        query: query.search,
      };
    },
    materializeDepth: 0,
  }
);
