import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import icon from 'astro-icon';
import vercelServerless from '@astrojs/vercel/serverless';
import sectionize from '@hbsnow/rehype-sectionize';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), icon()],
  image: {
    service: passthroughImageService(),
  },
  output: 'server',
  adapter: vercelServerless(),
  markdown: {
    rehypePlugins: [sectionize],
  },
});
