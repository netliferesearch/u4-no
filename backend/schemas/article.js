import FunkyEditor from '../components/FunkyEditor'

const annotations = [
    {name: 'link', title: 'External Link', type: 'object', fields: [{ name: 'href', title: 'URL', type: 'url'}] },
    {name: 'internalReferance', title: 'Find some internal resource', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article', },{type: 'event'},{type:'frontpage'},{type:'file'}]},
    {
      type: 'object',
      name: 'blockNote',
      title: 'Block note',
      annotationMarker: '*',
      fields: [
        {
          type: 'string',
          name: 'style',
          options: {
            list: [
              {title: 'Footnote', value: 'footnote'},
              {title: 'Endnote', value: 'endnote'}
            ],
          }
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{type: 'block'}]
        }
      ]
    },
    {
      name: 'footnote',
      type: 'object',
      fields: [
        {
          name: 'content',
          title: 'Footnote content',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                {title: 'Normal', value: 'normal'},
              ],
              lists: [],
              // Only allow numbered lists
              marks: {
                // Only allow these decorators
                decorators: [
                  {title: 'Strong', value: 'strong'},
                  {title: 'Emphasis', value: 'em'}
                ],
                // Support annotating text with a reference to an author
                annotations,
              }
            }
          ]
        }
      ]
    }
]

import { title, longTitle, image, explainerText, featuredImage, slug } from './fields'

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
