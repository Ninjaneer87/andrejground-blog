import { defineType } from 'sanity';

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
  ],
});
