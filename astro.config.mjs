import { defineConfig, envField, passthroughImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel';
import sectionize from '@hbsnow/rehype-sectionize';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), icon()],
  image: {
    service: passthroughImageService(),
  },
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  markdown: {
    rehypePlugins: [sectionize],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    schema: {
      FIREBASE_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
      FIREBASE_AUTH_DOMAIN: envField.string({
        context: 'server',
        access: 'secret',
      }),
      FIREBASE_PROJECT_ID: envField.string({
        context: 'server',
        access: 'secret',
      }),
      FIREBASE_STORAGE_BUCKET: envField.string({
        context: 'server',
        access: 'secret',
      }),
      FIREBASE_MESSAGING_SENDER_ID: envField.string({
        context: 'server',
        access: 'secret',
      }),
      FIREBASE_APP_ID: envField.string({ context: 'server', access: 'secret' }),
      FIREBASE_MEASUREMENT_ID: envField.string({
        context: 'server',
        access: 'secret',
      }),

      FIREBASE_PRIVATE_KEY_ID: envField.string({
        context: 'server',
        access: 'secret',
      }),
      FIREBASE_PRIVATE_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
      FIREBASE_CLIENT_EMAIL: envField.string({
        context: 'server',
        access: 'secret',
      }),
      FIREBASE_CLIENT_ID: envField.string({
        context: 'server',
        access: 'secret',
      }),
      FIREBASE_AUTH_URI: envField.string({
        context: 'server',
        access: 'secret',
      }),
      FIREBASE_TOKEN_URI: envField.string({
        context: 'server',
        access: 'secret',
      }),
      FIREBASE_AUTH_CERT_URL: envField.string({
        context: 'server',
        access: 'secret',
      }),
      FIREBASE_CLIENT_CERT_URL: envField.string({
        context: 'server',
        access: 'secret',
      }),
      PUBLIC_WEBSITE_URL: envField.string({
        context: 'client',
        access: 'public',
      }),
    },
  },
});
