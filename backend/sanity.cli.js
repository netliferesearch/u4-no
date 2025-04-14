import { defineCliConfig } from 'sanity/cli';
import { sanityDataset, sanityProjectId } from './config/environment';

export default defineCliConfig({
  api: {
    projectId: sanityProjectId,
    dataset: sanityDataset,
  },
});
