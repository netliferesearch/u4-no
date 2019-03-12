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
    },
  },
  topicTitles: {
    terms: {
      field: 'topicTitles',
    },
  },
  languages: {
    terms: {
      field: 'languageName',
    },
  },
};

const doSearch = async (query) => {
  const {
    search: searchQuery = '', sort = '', filters: filterStr = '', searchPageNum = 0,
  } = query;
  const activeFilterQueries = filterStr.split(',').reduce((acc, filter) => {
    if (filter === 'publications-only') {
      acc.push({ term: { type: 'publication' } });
    } else if (/^pub-type-/gi.test(filter)) {
      const pubTypeName = /pub-type-(.*)/gi.exec(filter)[1];
      acc.push({ term: { publicationTypeTitle: pubTypeName } });
    } else if (/^topic-type-/gi.test(filter)) {
      const topicTypeName = /topic-type-(.*)/gi.exec(filter)[1];
      acc.push({ term: { filedUnderTopicNames: topicTypeName } });
    } else if (/^lang-type-/gi.test(filter)) {
      const languageName = /lang-type-(.*)/gi.exec(filter)[1];
      acc.push({ term: { languageName } });
    } else if (/^year-from-/gi.test(filter)) {
      const yearFrom = /year-from-(.*)/gi.exec(filter)[1];
      acc.push({ range: { 'date.utc': { gte: new Date(yearFrom, 0) } } });
    } else if (/^year-to-/gi.test(filter)) {
      const yearTo = /year-to-(.*)/gi.exec(filter)[1];
      acc.push({ range: { 'date.utc': { lte: new Date(yearTo, 0) } } });
    }
    return acc;
  }, []);
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
                    filter: {
                      bool: {
                        should: activeFilterQueries,
                      },
                    },
                  }
                  : {}),
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
                      type: 'phrase_prefix',
                      _name: 'Main query',
                      fields: [
                        'title',
                        'title.exact^6',
                        'standfirst',
                        'keywords',
                        'lead',
                        'content',
                        'authors',
                        // term (glossary) related
                        'termTitle^2',
                        'termTitle.exact^8',
                        'termContent^2',
                        // topic related
                        'topicTitle^3',
                        'topicTitle.exact^7',
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

        // example of spread syntax
        // docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_object_literals
        //
        // Elastic: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-sort.html
        ...(false ? { hello: 'world' } : {}),

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
          'keywords',
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
        ],
        aggs: aggregations,
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
