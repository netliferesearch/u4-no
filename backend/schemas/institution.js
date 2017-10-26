export default {
  name: 'institution',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name of institution',
      type: 'string',
    },
    {
      name: 'logo',
      type: 'image',
    },
    {
      name: 'contact',
      type: 'object',
      fields: [
        {
          name: 'phone',
          type: 'string',
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'postalAdress',
          type: 'text',
        },
        {
          name: 'postalNumber',
          type: 'number',
        },
        {
          name: 'country',
          type: 'string'
        },
      ],
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
