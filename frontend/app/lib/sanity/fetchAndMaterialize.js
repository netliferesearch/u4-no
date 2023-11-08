import materialize from '@/app/lib/sanity/materialize';
import { sanityFetch } from '@/app/lib/sanity/sanity-client';
//import { sanityFetch } from '@/app/lib/sanity-fetch';
import { timer } from 'helpers/timer';

export async function fetchAndMaterialize({ 
    query = '', 
    params = {}, 
    tags = [],
    materializeDepth = 0,
  }) {
  if (!query) {
    console.warn('No query provided. Returning empty object', params, tags);
    return {};
  }
  //const time = timer(`FetchAndMaterialize: ${JSON.stringify(params)}`);
  const results = await sanityFetch( {query, params, tags} );
  //time();

  if (!results || Object.keys(results).length === 0) {
    console.warn('Sanity results was empty, nothing to materialize');
    return { error: 'No content found (fetchAndMaterialize said this)' };
  }
  if (!materializeDepth) {
    const data = Array.isArray(results) ? [...results] : {...results};
    return data;
  }
  const materializedResults = await materialize(results, materializeDepth);
  const data = Array.isArray(materializedResults)
    ? [...materializedResults]
    : { ...materializedResults };
  return data;
}