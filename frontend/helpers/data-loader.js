import 'babel-polyfill';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import sanityClient from '@sanity/client';
import { initStore, updateReadingProgress } from './redux-store';

import materialize from '../helpers/materialize';

const mapDispatchToProps = dispatch => ({
  updateReadingProgress: bindActionCreators(updateReadingProgress, dispatch),
});

export default (Child, { queryFunc = false, materializeDepth = false, query = {} }) =>
  withRedux(initStore, null, mapDispatchToProps)(class DataLoader extends Component {
    static async getInitialProps(nextContext) {
      const client = sanityClient({
        projectId: '1f1lcoov',
        dataset: 'production',
        token: '',
        useCdn: true,
      });

      if (!queryFunc) {
        console.log('No query function provided. Returning empty object');
        return {};
      }
      const { sanityQuery, param = {} } = queryFunc(nextContext);

      console.log(sanityQuery);

      const sanityResults = await client.fetch(sanityQuery, param);

      if (!sanityResults) {
        console.warn('Sanity results was empty, nothing to materialize', sanityResults);
        // throw new Error('No content found');
      }
      if (!materializeDepth) {
        const data = Array.isArray(sanityResults) ? [...sanityResults] : { ...sanityResults }
        return { data };
      }
      const materializedResults = await materialize(sanityResults, materializeDepth)
      const data = Array.isArray(materializedResults) ? [...materializedResults] : { ...materializedResults }
      return { data };
    }
    render() {
      return (
        <div>
          <Child {...this.props} />
        </div>
      );
    }
  });
