export default {
  name: 'partners',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name of partner',
      type: 'string',
    },
    {
      name: 'logo',
      type: 'image',
    },
    {
      name: 'contactInformation',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [],
          styles: [],
          marks: {
            // Only allow these decorators
            decorators: [
              { title: 'Emphasis', value: 'em' }
            ],
          },
        },
      ],
    }
  ]
}
