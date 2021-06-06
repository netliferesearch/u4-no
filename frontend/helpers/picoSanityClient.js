import PicoSanity from 'picosanity';

export const client = new PicoSanity({
  projectId: '1f1lcoov',
  dataset: 'production',
  // token: process.env.SANITY_TOKEN,
  useCdn: true,
});
