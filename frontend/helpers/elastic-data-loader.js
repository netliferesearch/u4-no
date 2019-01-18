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
            fields: ['title', 'standfirst', 'keywords', 'lead', 'content', 'authors'],
          },
        },
        highlight: {
          fields: {
            content: {},
          },
        },
        _source: [
          'title',
          'authors*',
          'slug*',
          'standfirst',
          'lead',
          'date',
          'pubdate.*',
          'publicationType.title',
          'keywords.keyword',
          'keywords._id',
        ],
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
