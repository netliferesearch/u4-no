import publicationContent from './fields/publicationContent';
import annotations from './fields/annotations';
import { title, longTitle, standfirst, image, leadText, featuredImage, slug } from './fields';

export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    title,
    {
      name: 'articleType',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'articleType',
            },
          ],
        },
      ],
    },
    publicationContent,
    leadText,
    standfirst,
    featuredImage,
    {
      name: 'date',
      description: 'Date of publication/last update',
      type: 'richDate',
      options: {
        inputUtc: true,
        dateFormat: 'YYYY-MM-DD',
        inputDate: true,
        inputTime: false,
      },
    },
    {
      name: 'authors',
      description: 'Place in order of appearance',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'person',
            },
          ],
        },
      ],
    },
    {
      name: 'headsUp',
      title: 'Heads up',
      description:
        'Important message to the reader, like "The content in this publication might be outdated"',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [],
          styles: [],
          marks: {
            // Only allow these decorators
            decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
          },
        },
      ],
    },
    {
      name: 'relatedContent',
      title: 'Recommended and related content',
      description: 'Add related content, max 3 will be displayed in the frontend',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'publication',
            },
            {
              type: 'article',
            },
          ],
        },
      ],
    },
    {
      name: 'topics',
      description: 'Select relevant U4 topics',
      type: 'array',
      of: [
        {
          type: 'reference',
          weak: true,
          to: [
            {
              type: 'topics',
            },
          ],
        },
      ],
      preview: {
        title: 'topics.title',
      },
    },

    slug,
  ],
  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'standfirst',
      imageUrl: 'featuredImage.asset.url',
    },
  },
};
