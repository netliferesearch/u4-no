export default {
  name: 'websiteText',
  type: 'document',
  title: 'Website text',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'placeholder',
      description: 'Used for referencing this text in templates',
      type: 'string'
    },
    {
      name: 'text',
      type: 'text',
      title: 'Text content'
    }
  ]
}