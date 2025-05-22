// sanity.config.js
import { richDate } from '@sanity/rich-date-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { Logo } from './plugins/u4-studio-logo/Logo';
import schemas from './schemas/schema';
import './styles/studioOverrides.css';

export default defineConfig({
  // title: process.env.SANITY_STUDIO_PROJECT_NAME,
  title: process.env.SANITY_STUDIO_PROJECT_NAME || 'U4-no',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '1f1lcoov',
  dataset: process.env.SANITY_STUDIO_API_DATASET || 'production',
  plugins: [structureTool(), visionTool(), richDate()],
  schema: {
    types: schemas,
  },
  studio: {
    components: {
      logo: Logo,
    },
  },
  env: {
    development: {
      dataset: process.env.SANITY_STUDIO_DATASET || 'staging',
    },
  },
});
