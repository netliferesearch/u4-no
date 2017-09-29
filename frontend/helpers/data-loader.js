import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import sanityClient from '@sanity/client';
import { initStore, startClock, addCount } from './redux-store';

import materialize from '../helpers/materialize';

const mapDispatchToProps = dispatch => ({
  addCount: bindActionCreators(addCount, dispatch),
  startClock: bindActionCreators(startClock, dispatch),
});

export default (Child, { queryFunc = false, materializeDepth = false }) =>
  withRedux(initStore, null, mapDispatchToProps)(
    class DataLoader extends Component {
      static async getInitialProps(nextContext) {
        const client = sanityClient({
          projectId: '1f1lcoov',
          dataset: 'production',
          token: '',
          useCdn: false,
        });
        if (!queryFunc) {
          console.log('No query function provided. Returning empty object');
          return {};
        }
        const { sanityQuery, param } = queryFunc(nextContext);
        const sanityResults = await client.fetch(sanityQuery, param);
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
    },
  );
