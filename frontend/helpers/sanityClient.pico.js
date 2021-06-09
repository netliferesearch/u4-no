import sanityClient from 'picosanity';

export const defaultConfig = {
  projectId: '1f1lcoov',
  dataset: 'production',
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
