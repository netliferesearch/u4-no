import { slug, language } from './fields'

export default {
  name: 'resource',
  title: 'Resource',
  type: 'object',
  fields: [
    {
      name: 'title',
      description: 'Title of the resource',
      type: 'string'
    },
    {
      name: 'author',
      description: 'Author/publishing organization',
      type: 'string'
    },
    {
      name: 'date',
      description: 'When published (leave empty if the resource has no meaningful date of publication)',
      type: 'richDate',
      options: {
        inputUtc: true,
        dateFormat: 'YYYY-MM-DD',
        inputDate: true,
        inputTime: false,
      }
    },
    {
      name: 'reference',
      description: '(report type/number etc.)',
      type: 'string'
    },
    language,
    {
      name: 'abstract',
      type: 'text'
    },
    {
      name: 'link',
      description: 'Link to the resource',
      type: 'url'
    },
    {
      name: 'linkText',
      title: 'Link text',
      description: 'Text to use for the link above (if relevant) ',
      type: 'string'
    },
    {
      name: 'file',
      description: 'Upload resource file',
      type: 'file'
    },
    {
      name: 'topics',
      description: 'Select relevant U4 topics',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'topics'
            }
          ]
        }
      ],
      preview: {
        title: 'topics.title'
      }
    },
    {
      name: 'keywords',
      description: 'Choose from drop-down menu of the available U4 keywords.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'keyword'
            }
          ]
        }
      ],
    },
    slug,
  ],
  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Date',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      reference: 'reference',
      date: 'date',
      image: 'image.asset.url',
    },
    prepare({ title = '(title missing)', author = '', reference = '', date = '', image }) {
      const subtitle =
        date === ''
          ? `${author} ${reference}`
          : `${author} (${date.utc.split('-')[0]}) ${reference}`;
      return {
        title: title,
        subtitle: subtitle,
        image,
      };
    },
  },
}
