export default {
  name: 'person',
  type: 'object',
  fields: [
    {
      name: 'firstName',
      type: 'string'
    },
    {
      name: 'surname',
      type: 'string'
    },
    {
      name: 'bio',
      title: 'Short biography',
      type: 'array',
      of: [
        {
          type: 'block'
        },
      ],
    },
    {
      name: 'image',
      type: 'image',
    }
  ],
  preview: {
    select: {
      title: 'firstName'
    }
  }
 }
