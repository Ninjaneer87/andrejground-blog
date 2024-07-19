// ./sanity.config.ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from 'src/schemaTypes';
import { markdownSchema } from 'sanity-plugin-markdown';
import sectionize from '@hbsnow/rehype-sectionize';

export default defineConfig({
  name: 'andrejground-blog',
  title: 'andrejground-blog',
  projectId: 'q6lrrer2',
  dataset: 'production',
  useCdn: true,
  plugins: [
    structureTool(),
    markdownSchema(),
  ],
  schema: {
    types: schemaTypes,
  },
});
