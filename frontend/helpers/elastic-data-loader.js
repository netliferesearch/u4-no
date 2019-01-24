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

const doSearch = async (query) => {
  const { search: searchQuery = '', sort = '', filters: filterStr = '' } = query;
  const activeFilterQueries = filterStr.split(',').reduce((acc, filter) => {
    if (filter === 'publications-only') {
      acc.push({ term: { type: 'publication' } });
    }
    return acc;
  }, []);
  try {
    const result = await client.search({
      index: 'u4-*',
      body: {
        query: {
          function_score: {
            query: {
              bool: {
                ...(activeFilterQueries.length > 0 ? { filter: activeFilterQueries } : {}),
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
                      type: 'phrase',
                      _name: 'Main query',
                      fields: [
                        'title',
                        'standfirst',
                        'keywords',
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

        ...(sort === 'year-desc' ? {
          sort: [
            { 'date.utc': { order: 'desc' } },
          ],
        } : sort === 'year-asc' ? {
          sort: [
            { 'date.utc': { order: 'asc' } },
          ],
        } : {}),


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
          'url',
          'featuredImageUrl',
          'longTitle',
          'explainerText',
          'isAgendaPresent',
          'isBasicGuidePresent',
          'publicationTypeTitle',
        ],
        aggs: {
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
        },
      },
    });
    console.log('Elastic data loader received data', { query, result });
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
      const { query } = nextContext;
      const result = await doSearch(query);
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
