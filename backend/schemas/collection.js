// import ReferringDocumentsList from '../components/referring-documents/src/ReferringDocumentsList';
import {
  title,
  longTitle,
  slug,
  standfirst,
} from './fields';

export default {
  name: 'collection',
  title: 'Resource collection',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Short title',
      description: 'Keywords that people search. Not including "corruption". Max 5 words',
    },
    longTitle,
    standfirst,
    {
      name: 'topics',
      title: 'Related topics',
      description: 'Topics that are related to this resource collection ',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'topics',
            },
          ],
        },
      ],
    },
    slug,
    {
      name: 'resources',
      title: 'Resources',
      description: 'Blog posts, publications and other resources for this resource collection',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'article',
            },
            {
              type: 'publication',
            },
            {
              type: 'blog-post',
            },
            {
              type: 'resource',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'longTitle',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      };
    },
  },
};
