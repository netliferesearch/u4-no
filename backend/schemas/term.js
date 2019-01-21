import { slug } from './fields'
import annotationsLinksOnly from './fields/annotationsLinksOnly'

export default {
  name: 'term',
  title: 'Glossary term',
  type: 'document',
  fields: [
    {
     name: 'term',
     type: 'string',
    },
    {
      name: 'definition',
      title: 'Definition',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          // Only allow numbered lists
          marks: {
            // Only allow these decorators
            decorators: [
              {title: 'Emphasis', value: 'em'}
            ],
            // Support annotating text with a reference to an author
            annotations: annotationsLinksOnly
          }
        },
      ]
    },
    slug,
  ]
}
