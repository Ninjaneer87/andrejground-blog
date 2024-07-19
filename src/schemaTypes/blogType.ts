import { defineType } from 'sanity';

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'markdown',
      description: 'The content of the blog post',
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }],
        },
      ],
    },
  ],
});
