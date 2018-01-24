import FunkyEditor from '../components/FunkyEditor'
import { annotations, title, longTitle, image, explainerText, featuredImage, slug } from './fields'

export default {
  name: 'article',
  title: 'Article',
  type: 'object',
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
    featuredImage,
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
      ]
    },
    slug
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
