import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/blog/' }),
  schema: z.object({
    title: z.string(),
    isDraft: z.boolean(),
    pubDate: z.date(),
    author: z.string(),
    metaImage: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    stackblitzProjectId: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
};
