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

const doSearch = async ({ searchQuery }) => {
  try {
    const result = await client.search({
      index: 'u4-*',
      body: {
        query: {
          multi_match: {
            query: searchQuery,
            fields: [
              'title',
              'standfirst',
              'keywords',
              'lead',
              'content',
              'authors',
              'termTitle^3',
              'termContent^3',
              'topicTitle^3',
              'topicContent^3',
              'basicGuide',
              'agenda',
              'type^10',
            ],
          },
        },
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
    console.log('Elastic data loader received data', { searchQuery, result });
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
      const { search: searchQuery = '*' } = query;
      const result = await doSearch({ searchQuery });
      return { data: result };
    }

    render() {
      // console.log('DataLoader rendering with these props:');
      // console.log(this.props);
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
