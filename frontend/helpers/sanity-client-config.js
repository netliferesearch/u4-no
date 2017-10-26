import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: '',
  useCdn: true,
});
export default client;
