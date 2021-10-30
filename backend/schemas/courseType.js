import { title, leadText, featuredImage, language, slug } from './fields';

export default {
  title: 'Course Type',
  name: 'courseType',
  type: 'document',
  fieldsets: [
    {
      name: 'unused',
      title: 'Other fields (that are currently not in use)',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    title,
    language,
    {
      title: 'Course type ID',
      description: 'ID of corresponding course type on https://partner.u4.no/partner/admin/course/',
      name: 'waitingListId',
      type: 'number',
    },
    slug,
    { ...leadText, fieldset: 'unused' },
    {
      name: 'content',
      title: 'Description',
      fieldset: 'unused',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          // Only allow numbered lists
          marks: {
            // Only allow these decorators
            decorators: [{ title: 'Emphasis', value: 'em' }],
            // Support annotating text with a reference to an author
            annotations: [
              {
                name: 'link',
                title: 'External Link',
                type: 'object',
                fields: [{ name: 'href', title: 'URL', type: 'url' }],
              },
              {
                name: 'internalReferance',
                title: 'Author or publication',
                type: 'reference',
                to: [{ type: 'person' }, { type: 'publication' }, { type: 'article' }],
              },
            ],
          },
        },
      ],
    },
    {
      name: 'contact',
      title: 'Contact person',
      fieldset: 'unused',
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
      name: 'topics',
      description: 'Select relevant U4 topics',
      fieldset: 'unused',
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
    {
      name: 'description',
      type: 'string',
      fieldset: 'unused',
    },
    {
      name: 'lang',
      type: 'string',
      fieldset: 'unused',
    },
  ],
  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
};
