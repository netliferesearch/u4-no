import { title, leadText, image, featuredImage, slug } from './fields'
import annotationsLinksOnly from './fields/annotationsLinksOnly'

export default {
  name: 'workshop',
  title: 'Workshop',
  type: 'document',
  fields: [
    title,
    leadText,
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
          ],
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
