// sanity.config.js
import { richDate } from '@sanity/rich-date-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { sanityDataset, sanityProjectId, sanityProjectName } from './config/environment';
import { Logo } from './plugins/u4-studio-logo/Logo';
import schemas from './schemas/schema';
import './styles/studioOverrides.css';

export default defineConfig({
  title: sanityProjectName,
  projectId: sanityProjectId,
  dataset: sanityDataset,
  plugins: [structureTool(), visionTool(), richDate()],
  schema: {
    types: schemas,
  },
  studio: {
    components: {
      logo: Logo,
    },
  },
  // env: {
  //   development: {
  //     dataset: 'staging',
  //   },
  // },
});
