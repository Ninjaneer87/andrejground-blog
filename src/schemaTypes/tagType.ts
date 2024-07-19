import { defineType } from 'sanity';

export const tagType = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    {
      name: 'tag',
      title: 'Tag',
      type: 'string',
    },
  ],
});
