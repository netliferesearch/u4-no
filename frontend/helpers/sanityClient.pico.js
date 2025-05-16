import sanityClient from 'picosanity';

export const defaultConfig = {
  projectId: process.env.SANITY_PROJECT_ID || '1f1lcoov',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: true,
};

/**
 * Configure PicoSanity client.
 */
export const configureClient = (config = {}) => {
  return sanityClient({
    ...defaultConfig,
    ...config,
  });
};

export const client = configureClient();
