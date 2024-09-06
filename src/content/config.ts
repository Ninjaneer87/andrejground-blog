import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    isDraft: z.boolean(),
    pubDate: z.date(),
    author: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    stackblitzProjectId: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
};
