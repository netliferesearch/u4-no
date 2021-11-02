import React, { Component } from 'react';
import Error404 from '../components/Error404';
import materialize from '../helpers/materialize';
import { getRedirect, redirectPermanent } from '../helpers/redirect';
import { timer } from '../helpers/timer';
import { client } from '../helpers/sanityClient.pico';

export async function fetchAndMaterialize({ nextContext, queryFunc, materializeDepth }) {
  if (!queryFunc) {
    console.log('No query function provided. Returning empty object');
    return {};
  }
  const { sanityQuery, param = {} } = queryFunc(nextContext);

  const sanityResults = await client.fetch(sanityQuery, param);

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

const DataLoaderWrapper = (Child, { queryFunc = false, materializeDepth = false, query = {} }) =>
  class DataLoader extends Component {
    static async getInitialProps(nextContext) {
      const { params = {} } = nextContext;
      const time = timer(`DataLoader, params: ${JSON.stringify(params)}`);
      const result = await fetchAndMaterialize({ queryFunc, nextContext, materializeDepth });
      time();
      return result;
    }
    render() {
      console.log('DataLoader rendering with these props:');
      console.log(this.props);
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
  };
export default DataLoaderWrapper;
