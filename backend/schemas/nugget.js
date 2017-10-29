/**
 * A nugget is a bit of reusable information
 */
import {
  title,
  image,
} from './fields';

export default {
  name: 'nugget',
  type: 'object',
  fields: [
    title,
    {
      name: 'text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
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
        }
      ],
    },
    image,
    {
      name: 'resources',
      type: 'reference',
      to: [
        {
          type: 'person'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'text'
    },

    prepare({ title = '', subtitle = false }) {
      return {
        title,
        subtitle: subtitle ? subtitle[0].children[0].text : 'Empty'
      };
    },
  },
}
