import 'babel-polyfill';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import { initStore, updateReadingProgress } from './redux-store';
import { Error404 } from '../components';
import { redirectPermanent, getRedirect } from '../helpers/redirect';
import materialize from '../helpers/materialize';
import { clientWithToken } from './sanity-client-config';

const mapDispatchToProps = dispatch => ({
  updateReadingProgress: bindActionCreators(updateReadingProgress, dispatch),
});

export default (Child, { queryFunc = false, materializeDepth = false, query = {} }) =>
  withRedux(initStore, null, mapDispatchToProps)(
    class DataLoader extends Component {
      static async getInitialProps(nextContext) {
        if (!queryFunc) {
          console.log('No query function provided. Returning empty object');
          return {};
        }
        const { sanityQuery, param = {} } = queryFunc(nextContext);

        const sanityResults = await clientWithToken.fetch(sanityQuery, param);

        if (!sanityResults || Object.keys(sanityResults).length === 0) {
          console.warn('Sanity results was empty, nothing to materialize', sanityResults);
          // throw new Error('No content found');
          if (nextContext.res) {
            const path = getRedirect(nextContext);
            if (path) return redirectPermanent(nextContext, path);
            nextContext.res.statusCode = 404;
          }
          return { error: 'No content found (dataLoader said this)' };
        }
        if (!materializeDepth) {
          const data = Array.isArray(sanityResults) ? [...sanityResults] : { ...sanityResults };
          return { data };
        }
        const materializedResults = await materialize(sanityResults, materializeDepth);
        const data = Array.isArray(materializedResults)
          ? [...materializedResults]
          : { ...materializedResults };
        return { data };
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
    }
  );
