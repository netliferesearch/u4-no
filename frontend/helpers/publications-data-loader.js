import React, { Component } from 'react';
import Error404 from '../components/Error404';
import { limit } from '../components/search/SearchResults';

const elasticsearch = require('elasticsearch');

// anonymous has read access to elasticsearch index so this works
const client = new elasticsearch.Client({
  host: 'https://34f28f12080e435795254ec8886248ba.eu-central-1.aws.cloud.es.io/',
  apiVersion: '7.7',
});

const aggregations = {
  minPublicationDateMilliSeconds: {
    min: {
      field: 'date.utc',
    },
  },
  maxPublicationDateMilliSeconds: {
    max: {
      field: 'date.utc',
    },
  },
  publicationTypes: {
    terms: {
      field: 'publicationTypeTitle.keyword',
      size: 100,
    },
  },
  topicTitles: {
    terms: {
      field: 'topicTitles',
      size: 100,
    },
  },
  filedUnderTopicNames: {
    terms: {
      field: 'filedUnderTopicNames',
      size: 100,
    },
  },
  languages: {
    terms: {
      field: 'languageName',
      size: 100,
    },
  },
};
const doSearch = async ({ query }) => {
  const {
    search: searchQuery = '',
    sort = 'year-desc',
    filters: filterStr = '',
    searchPageNum = 1,
  } = query;
  const filters = filterStr.split(',').map(name => name.replace(/\|/g, ','));
  const activeFilterQueries = [];
  const topicNames = filters
    .filter(filter => /^topic-type-/gi.test(filter))
    .map(filter => /topic-type-(.*)/gi.exec(filter)[1]);
  if (topicNames.length > 0) {
    activeFilterQueries.push({ terms: { filedUnderTopicNames: topicNames } });
  }
  let searchQueryWithoutFilters = searchQuery;

  searchQueryWithoutFilters = searchQueryWithoutFilters.trim();
  const publicationNames = filters
    .filter(filter => /^pub-/gi.test(filter))
    .map(filter => /pub-(.*)/gi.exec(filter)[1])
    .reduce((acc, name) => {
      acc.push(name);
      return acc;
    }, []);
  if (publicationNames.length > 0) {
    activeFilterQueries.push({
      terms: { 'publicationTypeTitle.keyword': publicationNames },
    });
  }

  const languageNames = filters
    .filter(filter => /^lang-type-/gi.test(filter))
    .map(filter => /lang-type-(.*)/gi.exec(filter)[1]);
  if (languageNames.length > 0) {
    activeFilterQueries.push({ terms: { languageName: languageNames } });
  }

  filters.forEach(filter => {
    activeFilterQueries.push({ term: { type: 'publication' } });
    if (/^year-from-/gi.test(filter)) {
      const yearFrom = /year-from-(.*)/gi.exec(filter)[1];
      activeFilterQueries.push({
        range: { 'date.utc': { gte: `${yearFrom}-01-01` } },
      });
    } else if (/^year-to-/gi.test(filter)) {
      const yearTo = /year-to-(.*)/gi.exec(filter)[1];
      activeFilterQueries.push({
        range: { 'date.utc': { lte: `${yearTo}-12-31` } },
      });
    }
  });

  // Need to have selected at least one filter, or started typing at least two
  // characters.
  if (activeFilterQueries.length === 0 && searchQueryWithoutFilters.length <= 2) {
    return;
  }

  try {
    const result = await client.search({
      index: process.env.NEXT_PUBLIC_ENV ? `u4-${process.env.NEXT_PUBLIC_ENV}-*` : 'u4-staging-*',
      body: {
        query: {
          function_score: {
            query: {
              bool: {
                ...(activeFilterQueries.length > 0
                  ? {
                      filter: activeFilterQueries,
                    }
                  : {}),
                // At least one search query should match. Need to have this
                // to prevent weird results when using filters.
                minimum_should_match: 1,
                should: [
                  // if no query, yet active filters use match_all query to show results
                  ...(!searchQueryWithoutFilters && activeFilterQueries.length > 0
                    ? [{ match_all: {} }]
                    : []),
                ],
              },
            },
            boost: 1,
            functions: [
              {
                filter: [{ match: { type: 'publication' } }],
                weight: 5,
              },
            ],
          },
        },

        aggs: aggregations,
        sort: [{ 'date.utc': { order: 'desc' } }],
        /* eslint-disable no-nested-ternary */

        ...(searchPageNum > 1
          ? {
              from: searchPageNum * limit - limit,
              size: limit,
            }
          : {
              from: 0,
              size: limit,
            }),
        _source: [
          'title',
          'authors*',
          'slug*',
          'subtitle',
          'standfirst',
          'lead',
          'type',
          'date',
          'pubdate.*',
          'termTitle',
          'termContent',
          'topicTitle',
          'topicContent',
          'numberOfTopicResources',
          'url',
          'featuredImageUrl',
          'longTitle',
          'explainerText',
          'isAgendaPresent',
          'isBasicGuidePresent',
          'publicationType',
          'filedUnderTopicNames',
          'pdfFileUrl',
          'legacypdfFileUrl',
        ],
      },
    });
    return result;
  } catch (e) {
    return {};
  }
};

export const getSearchAggregations = async () => {
  try {
    const result = await client.search({
      index: `u4-${process.env.NEXT_PUBLIC_ENV}-*` || 'u4-staging-*',
      body: {
        query: { match_all: {} },
        aggs: aggregations,
        size: 1,
      },
    });
    return result;
  } catch (e) {
    return {};
  }
};

const PublicationsDataLoader = Child =>
  class DataLoader extends Component {
    static async getInitialProps(nextContext) {
      const { query, store } = nextContext;
      const { defaultSearchAggs = {} } = store.getState();
      // Use Promise.all so that we can fire off 1 or 2 two queries at once,
      // without one waiting for the other.
      const [result] = await Promise.all([
        doSearch({ query, defaultSearchAggs }),
        (async () => {
          if (defaultSearchAggs.length > 0) {
            return true;
          }
          // We do one search just to know how many possible aggregations
          // we have. Filters needs this if they want to display unmatched filters.
          const { aggregations } = await getSearchAggregations();
          return store.dispatch({
            type: 'SEARCH_UPDATE_DEFAULT_AGGS',
            defaultSearchAggs: aggregations,
          });
        })(),
      ]);
      store.dispatch({
        type: 'SEARCH_UPDATE_RESULTS',
        searchResults: result,
      });
      return { data: result };
    }
    render() {
      const { error } = this.props;
      if (error) {
        return <Error404 {...this.props} />;
      }
      return (
        <div>
          <Child {...this.props} />
        </div>
      );
    }
  };
export default PublicationsDataLoader;
