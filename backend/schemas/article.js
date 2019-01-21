import { annotations, title, longTitle, standfirst,
image, explainerText, featuredImage, slug, box } from './fields'

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
      }
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
              type: 'person'
            }
          ]
        }
      ]
    },
    {
      name: 'content',
      title: 'Article content',
      description: 'The body text and graphic elements.',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'H5', value: 'h5'},
          ],
          // Only allow numbered lists
          marks: {
            // Only allow these decorators
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'}
            ],
            // Support annotating text with a reference to an author
            annotations,
          },
        },

        {
          type: 'reference',
          tile: 'Nugget',
          to: [
            {
              type: 'nugget'        },
          ]
        },
        {
          type: 'pullQuote'
        },
        {
          type: 'funkyTable',
          options: {
            defaultNumRows: 3,
            defaultNumColumns: 3
          }
        },
        image,
        {
          name: 'vimeo',
          title: 'Vimeo video',
          type: 'object',
          fields: [
            {
              name: 'src',
              title: 'URL to the vimeo video (not the whole embed code)',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            }
          ]
        },
        box,
      ]
    },
    slug
  ],
  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc'}
        ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'standfirst',
      imageUrl: 'featuredImage.asset.url',
    }
  }
}
