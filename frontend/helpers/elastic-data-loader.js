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
  contentTypes: {
    terms: {
      field: 'contentType',
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
const doSearch = async ({
  query,
  defaultSearchAggs: { publicationTypes: defaultPublicationTypes = {} } = [],
}) => {
  const { search: searchQuery = '', sort = '', filters: filterStr = '', searchPageNum = 1 } = query;
  const filters = filterStr.split(',').map(name => name.replace(/\|/g, ','));
  const searchQueryFilters = searchQuery.split(' ');
  const activeFilterQueries = [];
  const topicNames = filters
    .filter(filter => /^topic-type-/gi.test(filter))
    .map(filter => /topic-type-(.*)/gi.exec(filter)[1]);
  if (topicNames.length > 0) {
    activeFilterQueries.push({ terms: { filedUnderTopicNames: topicNames } });
  }
  let searchQueryWithoutFilters = searchQuery;
  searchQueryFilters.forEach(part => {
    if (part.indexOf('author:') !== -1) {
      const personSlug = part.replace(/^author:/gi, '');
      searchQueryWithoutFilters = searchQueryWithoutFilters.replace(part, '');
      activeFilterQueries.push({ terms: { relatedPersons: [personSlug] } });
    }
  });
  searchQueryWithoutFilters = searchQueryWithoutFilters.trim();
  const publicationNames = filters
    .filter(filter => /^pub-/gi.test(filter))
    .map(filter => /pub-(.*)/gi.exec(filter)[1])
    .reduce((acc, name) => {
      if (name === 'other') {
        const restOfPubTypes = defaultPublicationTypes.buckets.filter(
          ({ key }) => !publicationTypesToShow.find(name => name === key)
        );
        return [...acc, ...restOfPubTypes];
      }
      acc.push(name);
      return acc;
    }, []);
  if (publicationNames.length > 0) {
    activeFilterQueries.push({
      terms: { 'publicationTypeTitle.keyword': publicationNames },
    });
  }
  const contentNames = filters
    .filter(filter => /^content-/gi.test(filter))
    .map(filter => /content-(.*)/gi.exec(filter)[1]);
  if (contentNames.length > 0) {
    activeFilterQueries.push({
      terms: { contentType: contentNames },
    });
  }

  const languageNames = filters
    .filter(filter => /^lang-type-/gi.test(filter))
    .map(filter => /lang-type-(.*)/gi.exec(filter)[1]);
  if (languageNames.length > 0) {
    activeFilterQueries.push({ terms: { languageName: languageNames } });
  }

  filters.forEach(filter => {
    if (filter === 'publications-only') {
      activeFilterQueries.push({ term: { type: 'publication' } });
    } else if (/^year-from-/gi.test(filter)) {
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
      index: process.env.ES_ENV ? `u4-${process.env.ES_ENV}-*` : 'u4-staging-*',
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
                  {
                    multi_match: {
                      query: searchQueryWithoutFilters,
                      fields: ['title'],
                      fuzziness: 'AUTO',
                      _name: 'Fuzzy search',
                    },
                  },
                  {
                    multi_match: {
                      query: searchQueryWithoutFilters,
                      _name: 'Exact title match',
                      fields: ['title.exact^10', 'termTitle.exact^10', 'topicTitle.exact^10'],
                    },
                  },
                  {
                    multi_match: {
                      query: searchQueryWithoutFilters,
                      type: 'phrase_prefix',
                      _name: 'Main query',
                      fields: [
                        'title',
                        'subtitle',
                        'type',
                        'standfirst',
                        'lead',
                        'content',
                        'authors',
                        'termTitle^2',
                        'termContent^2',
                        'topicTitle^3',
                        'topicContent^3',
                        'basicGuide',
                        'agenda',
                        'type^10',
                      ],
                    },
                  },
                ],
              },
            },
            boost: 1,
            functions: [
              {
                filter: [{ match: { type: 'topic' } }],
                weight: 5,
              },
            ],
          },
        },

        aggs: aggregations,

        /* eslint-disable no-nested-ternary */
        ...(sort === 'year-desc'
          ? {
              sort: [{ 'date.utc': { order: 'desc' } }],
            }
          : sort === 'year-asc'
          ? {
              sort: [{ 'date.utc': { order: 'asc' } }],
            }
          : {}),

        ...(searchPageNum > 1
          ? {
              from: searchPageNum * limit - limit,
              size: limit,
            }
          : {
              from: 0,
              size: limit,
            }),

        highlight: {
          fields: {
            title: {
              fragment_size: 250,
              number_of_fragments: 1,
            },
            topicTitle: {
              fragment_size: 250,
              number_of_fragments: 1,
            },
            content: {
              fragment_size: 250,
              number_of_fragments: 1,
            },
          },
        },
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
          'articleTypeTitles',
          'featuredImageUrl',
          'longTitle',
          'explainerText',
          'isAgendaPresent',
          'isBasicGuidePresent',
          'publicationType',
          'filedUnderTopicNames',
          'pdfFileUrl',
          'legacypdfFileUrl',
          'pdfThumbnail',
        ],
      },
    });
    // console.log('Elastic data loader received data', { query, result });
    return result;
  } catch (e) {
    console.error('Elasticsearch query failed', e);
    return {};
  }
};

export const getSearchAggregations = async () => {
  try {
    const result = await client.search({
      index: process.env.ES_ENV ? `u4-${process.env.ES_ENV}-*` : 'u4-staging-*',
      body: {
        query: { match_all: {} },
        aggs: aggregations,
        size: 1,
      },
    });
    return result;
  } catch (e) {
    console.error('Elasticsearch query failed', e);
    return {};
  }
};

const ElasticDataLoader = Child =>
  class DataLoader extends Component {
    static async getInitialProps(nextContext) {
      // console.log('Elastic data loader fetching data');
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
export default ElasticDataLoader;
