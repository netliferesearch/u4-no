import { title, longTitle, image, leadText, featuredImage, slug } from './fields'

export default {
  name: 'service',
  title: 'Service',
  type: 'object',
  fields: [
    title,
    leadText,
    featuredImage,
    {
      name: 'content',
      title: 'Content blocks',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          name: 'heading',
          title: 'Centered heading',
          type: 'object',
          fields: [
            {
              name: 'headingValue',
              type: 'string',
            }
          ]
        },
        {
          name: 'boxOnBoxRef',
          title: 'Two text boxes',
          type: 'object',
          fields: [
            {
              name: 'textLeft',
              title: 'Text in left hand box',
              type: 'array',
              of: [{
                type: 'block',
              }],
            },
            {
              name: 'textRight',
              title: 'Text in right hand box',
              type: 'array',
              of: [{
                type: 'block',
              }],
              preview: {
                select: {
                  title: 'textRight'
                }
              }
            },
          ]
        },
        {
          name: 'boxOnImageRef',
          title: 'Text box on image',
          type: 'object',
          fields: [
            {
              name: 'img',
              title: 'Image on the left hand',
              type: 'image',
            },
            {
              name: 'block',
              title: 'Text in right hand box',
              type: 'array',
              of: [
                {
                  type: 'block',
                }
              ]
            },
          ]
        },
        {
          type: 'reference',
          title: '',
          to: [
            {
              type: 'nugget'
            }
          ]
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
