import { 
  title,
  longTitle,
  explainerText,
  featuredImage,
 } from './fields';

export default {
  name: 'topics',
  title: 'Topic',
  type: 'object',
  fields: [
    title,
    longTitle,
    explainerText,
    featuredImage,
    {
      name: 'parent',
      type: 'reference',
      to: [
        {
          type: 'topics'
        }
      ]
    },
    {
      name: 'introduction',
      title: 'Topic introduction',
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
            },

          ]
        },
        {
          type: 'image'
        },
      ]
    },
    {
      name: 'agenda',
      title: 'Research and policy agenda',
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
            },
          ]
        },
        {
          type: 'image'
        },
      ]
    },
    {
      name: 'advisors',
      type: 'array',
      of: [
        {
          name: 'advisor',
          type: 'reference',
          to: [
            {
              type: 'person'
            }
          ]
        }
      ]
    }

  ]
}
