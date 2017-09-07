import { title, longTitle, explainerText, featuredImage, slug } from './fields'

export default {
  name: 'article',
  title: 'Article',
  type: 'object',
  fields: [
    title,
    longTitle,
    explainerText,
    featuredImage,
    {
      name: 'content',
      title: 'Article content',
      type: 'array',
      of: [
        {
          type: 'block'
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
          type: 'image'
        }
      ]
    },
    slug
  ]
}
