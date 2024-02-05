// sanity.config.js
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { richDate } from '@sanity/rich-date-input';
import schemas from './schemas/schema';
import { Logo } from './plugins/u4-studio-logo/Logo';

export default defineConfig({
  title: 'u4-no',
  projectId: '1f1lcoov',
  dataset: 'staging',
  plugins: [structureTool(), visionTool(), richDate()],
  schema: {
    types: schemas,
  },
  studio: {
    components: {
      logo: Logo,
    },
  },
});
