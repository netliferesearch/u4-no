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
    longTitle,
    explainerText,
    featuredImage,
    {
      name: 'content',
      title: 'Article content',
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
              {title: 'Emphasis', value: 'em'}
            ],
            // Support annotating text with a reference to an author
            annotations: [
              {name: 'link', title: 'External Link', type: 'object', fields: [{ name: 'href', title: 'URL', type: 'url'}] },
              {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'}]},
            ]
          }
        },
        {
          type: 'reference',
          to: [
            {
              type: 'nugget'
            }
          ]
        },
        {
          type: 'pullQuote'
        },
        image,
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
