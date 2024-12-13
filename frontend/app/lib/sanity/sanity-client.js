import 'server-only';

import { createClient } from 'next-sanity';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const apiVersion = process.env.SANITY_API_VERSION || '2023-05-03';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export async function sanityFetch({ query, params = {}, tags = [] }) {
  return client.fetch(query, params, {
    //cache: 'force-cache',
    next: {
      // revalidate: 600, // for simple, time-based revalidation
      tags: tags, // for tag-based revalidation
    },
  });
}
