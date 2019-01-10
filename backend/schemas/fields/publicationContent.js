import annotations from './annotations'
import {
  image,
  box,
} from './'

const content = {
  name: 'content',
  title: 'Publication content',
  description: 'The body text and graphic elements.',
  type: 'array',
  of: [
    box,
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' }
      ],
      // Only allow numbered lists
      marks: {
        // Only allow these decorators
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' }
        ],
        // Support annotating text with a reference to an author
        annotations
      }
    },
    {
      type: 'reference',
      tile: 'Nugget',
      to: [
        {
          type: 'nugget'
        }
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
          type: 'string'
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string'
        }
      ]
    }
  ]
}

export default content
