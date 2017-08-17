export default {
    name: 'publication',
    type: 'object',
    fields: [
      {
        name: 'title',
        type: 'string'
      },
      {
        name: 'authors',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'person'
              }
            ]
          }
        ]
      },
      {
        name: 'date',
        type: 'date'
      },
      {
        name: 'topics',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'topics'
              }
            ]
          }
        ]
      }
    ]
  }

