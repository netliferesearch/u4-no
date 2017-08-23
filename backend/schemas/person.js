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
