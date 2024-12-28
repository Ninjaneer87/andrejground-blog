import { defineConfig, passthroughImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel/serverless';
import sectionize from '@hbsnow/rehype-sectionize';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), icon()],
  image: {
    service: passthroughImageService(),
  },
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  markdown: {
    rehypePlugins: [sectionize],
  },
});
