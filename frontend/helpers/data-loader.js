import React, { Component } from 'react';
import { Layout, Article } from '../components';
import materialize from '../helpers/materialize';

const sanityClient = require('@sanity/client');

export default (Child, { queryFunc, materialize = false }) =>
  class extends Component {
    static async getInitialProps(nextContext) {
      const client = sanityClient({ projectId: '1f1lcoov', dataset: 'production', token: '' });
      if (!queryFunc) {
        console.log('No query function provided. Returning empty object');
        return {};
      }
      const sanityQuery = queryFunc(nextContext);
      const sanityResults = await client.fetch(sanityQuery);
      if (!materialize) {
        return sanityResults;
      }
      return await materialize(sanityResults);
    }
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
          <Child {...this.props} />
        </div>
      );
    }
  };
