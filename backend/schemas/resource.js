import { title, slug, date } from './fields'

export default {
  name: 'resource',
  title: 'Resource',
  type: 'object',
  fields: [
    title,
    {
      name: 'author',
      description: 'Author/publishing organization',
      type: 'string'
    },
    {
      name: 'reference',
      description: '(report type/number etc.)',
      type: 'string'
    },
    date,
    {
      name: 'abstract',
      type: 'text'
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
      name: 'link',
      description: 'Link to the resource',
      type: 'url'
    },
    {
      name: 'file',
      description: 'Upload resource file',
      type: 'file'
    },

    slug,
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
