import { title, leadText, image, featuredImage, slug } from './fields'

export default {
  name: 'workshop',
  title: 'Workshop',
  type: 'object',
  fields: [
    title,
    {
      name: 'content',
      title: 'Article content',
      type: 'array',
      of: [
        {
          type: 'block'
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
