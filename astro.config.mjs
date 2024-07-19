import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import icon from 'astro-icon';
import vercelServerless from '@astrojs/vercel/serverless';
import sectionize from '@hbsnow/rehype-sectionize';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    icon(),
    sanity({
      projectId: 'q6lrrer2',
      dataset: 'production',
      useCdn: true,
      apiVersion: '2024-07-13',
      studioBasePath: '/admin',
    }),
  ],
  image: {
    service: passthroughImageService(),
  },
  output: 'server',
  adapter: vercelServerless(),
  markdown: {
    rehypePlugins: [sectionize],
  },
});
