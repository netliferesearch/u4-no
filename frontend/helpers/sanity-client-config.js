import sanityClient from '@sanity/client';
//const dataset = process.env.REACT_APP_DATASET === 'staging' ? 'staging' : 'production';

export const clientWithToken = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: true,
});

const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: '',
  useCdn: true,
});

export default client;
