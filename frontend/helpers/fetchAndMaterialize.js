import materialize from './materialize';
import { client } from './sanityClient.pico';

export async function fetchAndMaterialize({ sanityQuery, params, materializeDepth }) {
  if (!sanityQuery) {
    console.warn('No query function provided. Returning empty object');
    return {};
  }
  // console.time('Get sanity data:' + params.slug);
  const sanityResults = await client.fetch(sanityQuery, params);
  // console.timeEnd('Get sanity data:' + params.slug);

  if (!sanityResults || Object.keys(sanityResults).length === 0) {
    console.warn('Sanity results was empty, nothing to materialize', sanityResults);
    return { error: 'No content found (fetchAndMaterialize said this)' };
  }
  if (!materializeDepth) {
    const data = Array.isArray(sanityResults) ? [...sanityResults] : { ...sanityResults };
    return data;
  }
  const materializedResults = await materialize(sanityResults, materializeDepth);
  const data = Array.isArray(materializedResults)
    ? [...materializedResults]
    : { ...materializedResults };
  return data;
}
