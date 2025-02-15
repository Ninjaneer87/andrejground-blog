import { defineConfig, envField, passthroughImageService } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel';
import sectionize from '@hbsnow/rehype-sectionize';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import rehypePrettyCode from 'rehype-pretty-code';

const prettyCodeOptions = {
  theme: 'github-dark',
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [
        {
          type: 'text',
          value: ' ',
        },
      ];
    }
  },
  onVisitHighlightedLine(node) {
    if (node.properties.className) {
      node.properties.className.push('highlighted');
      return;
    }
    node.properties.className = ['highlighted'];
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['word'];
  },
  tokensMap: {},
};

const prettyCode = [rehypePrettyCode, prettyCodeOptions];

// https://astro.build/config
export default defineConfig({
  site: 'https://andrejground.com',
  integrations: [tailwind(), react(), icon(), sitemap({}), mdx()],
  image: {
    service: passthroughImageService(),
  },
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: false,
    rehypePlugins: [sectionize, prettyCode],
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
