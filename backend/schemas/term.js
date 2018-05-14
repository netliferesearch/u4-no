import { slug } from './fields'

export default {
  name: 'term',
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
            annotations: [
              {name: 'link', title: 'External Link', type: 'object', fields: [{ name: 'href', title: 'URL', type: 'url'}] },
              {name: 'internalReferance', title: 'Glossary term, publication or article', type: 'reference', to: [{type: 'term'},{type: 'publication'},{type: 'article'}]},
            ]
          }
        },
      ]
    },
    slug,
  ]
}
