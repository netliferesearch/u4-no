import sanityClient from '@sanity/client';
import PicoSanity from 'picosanity'

const client = new PicoSanity({
  projectId: '1f1lcoov',
  dataset: 'production',
  token: '',
  useCdn: true,
});
export default client;
