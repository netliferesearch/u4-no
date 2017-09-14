import React, { Component } from 'react';
import sanityClient from '@sanity/client';
import materialize from '../helpers/materialize';

export default (Child, { queryFunc, materializeDepth = false }) =>
  class extends Component {
    static async getInitialProps(nextContext) {
      const client = sanityClient({ projectId: '1f1lcoov', dataset: 'production', token: '', useCdn: false });
      if (!queryFunc) {
        console.log('No query function provided. Returning empty object');
        return {};
      }
      const sanityQuery = queryFunc(nextContext);
      const sanityResults = await client.fetch(sanityQuery);
      if (!materializeDepth) {
        return sanityResults;
      }
      return materialize(sanityResults, materializeDepth);
    }
    render() {
      return (
        <div>
          <Child {...this.props} />
        </div>
      );
    }
  };
