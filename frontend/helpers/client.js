import sanityClient from '@sanity/client';

export default sanityClient({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: true,
});