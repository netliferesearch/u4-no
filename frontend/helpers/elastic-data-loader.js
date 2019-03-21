import 'babel-polyfill';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import { initStore, updateReadingProgress } from './redux-store';
import { Error404 } from '../components';

const elasticsearch = require('elasticsearch');

const mapDispatchToProps = dispatch => ({
  updateReadingProgress: bindActionCreators(updateReadingProgress, dispatch),
});

const client = new elasticsearch.Client({
  host:
    'https://u4frontend:u4frontend@34f28f12080e435795254ec8886248ba.eu-central-1.aws.cloud.es.io:9243/',
  apiVersion: '6.5',
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
      field: 'publicationTypeTitle',
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

const doSearch = async (query) => {
  const {
    search: searchQuery = '', sort = '', filters: filterStr = '', searchPageNum = 0,
  } = query;
  const filters = filterStr.split(',').map(name => name.replace(/\|/g, ','));

  const activeFilterQueries = [];

  const topicNames = filters
    .filter(filter => /^topic-type-/gi.test(filter))
    .map(filter => /topic-type-(.*)/gi.exec(filter)[1]);
  if (topicNames.length > 0) {
    activeFilterQueries.push({ terms: { filedUnderTopicNames: topicNames } });
  }

  const publicationNames = filters
    .filter(filter => /^pub-/gi.test(filter))
    .map(filter => /pub-(.*)/gi.exec(filter)[1]);
  if (publicationNames.length > 0) {
    activeFilterQueries.push({ terms: { publicationTypeTitle: publicationNames } });
  }

  const languageNames = filters
    .filter(filter => /^lang-type-/gi.test(filter))
    .map(filter => /lang-type-(.*)/gi.exec(filter)[1]);
  if (languageNames.length > 0) {
    activeFilterQueries.push({ terms: { languageName: languageNames } });
  }

  filters.forEach((filter) => {
    if (filter === 'publications-only') {
      activeFilterQueries.push({ term: { type: 'publication' } });
    } else if (/^year-from-/gi.test(filter)) {
      const yearFrom = /year-from-(.*)/gi.exec(filter)[1];
      activeFilterQueries.push({ range: { 'date.utc': { gte: new Date(yearFrom, 0) } } });
    } else if (/^year-to-/gi.test(filter)) {
      const yearTo = /year-to-(.*)/gi.exec(filter)[1];
      activeFilterQueries.push({ range: { 'date.utc': { lte: new Date(yearTo, 0) } } });
    }
  });

  try {
    const result = await client.search({
      index: process.env.ES_INDEX || 'u4-staging-*',
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
                  // if no query use match_all query to show results
                  ...(!searchQuery ? [{ match_all: {} }] : []),
                  {
                    multi_match: {
                      query: searchQuery,
                      fields: ['title'],
                      fuzziness: 'AUTO',
                      _name: 'Fuzzy search',
                    },
                  },
                  {
                    multi_match: {
                      query: searchQuery,
                      _name: 'Exact title match',
                      fields: ['title.exact^10', 'termTitle.exact^10', 'topicTitle.exact^10'],
                    },
                  },
                  {
                    multi_match: {
                      query: searchQuery,
                      type: 'phrase_prefix',
                      _name: 'Main query',
                      fields: [
                        'title',
                        'standfirst',
                        'lead',
                        'content',
                        'authors',
                        // term (glossary) related
                        'termTitle^2',
                        'termContent^2',
                        // topic related
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
                weight: 1.2,
              },
            ],
          },
        },

        ...(sort === 'year-desc'
          ? {
            sort: [{ 'date.utc': { order: 'desc' } }],
          }
          : sort === 'year-asc'
            ? {
              sort: [{ 'date.utc': { order: 'asc' } }],
            }
            : {}),

        ...(searchPageNum > 0
          ? {
            from: 0,
            size: searchPageNum * 10,
          }
          : {
            from: 0,
            size: 10,
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
        ],
      },
    });
    console.log('Elastic data loader received data', { query, result });
    return result;
  } catch (e) {
    console.error('Elasticsearch query failed', e);
    return {};
  }
};

const getSearchAggregations = async () => {
  try {
    const result = await client.search({
      index: process.env.ES_INDEX || 'u4-staging-*',
      body: {
        query: { match_all: {} },
        aggs: aggregations,
        size: 1,
      },
    });
    console.log('getSearchAggregations returned', result);
    return result;
  } catch (e) {
    console.error('Elasticsearch query failed', e);
    return {};
  }
};

export default Child =>
  withRedux(initStore, null, mapDispatchToProps)(class DataLoader extends Component {
    static async getInitialProps(nextContext) {
      console.log('Elastic data loader fetching data');
      const { query, store } = nextContext;
      // Use Promise.all so that we can fire off 1 or 2 two queries at once,
      // without one waiting for the other.
      const [result] = await Promise.all([
        doSearch(query),
        (async () => {
          const { defaultSearchAggs = [] } = store.getState();
          if (defaultSearchAggs.length > 0) {
            return true;
          }
          // We do one search just to know how many possible aggregations
          // we have. Filters needs this if they want to display unmatched filters.
          const { aggregations } = await getSearchAggregations();
          store.dispatch({
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
  });
