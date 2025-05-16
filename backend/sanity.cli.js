import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '1f1lcoov',
    dataset: process.env.SANITY_STUDIO_API_DATASET || 'production',
  },
});
