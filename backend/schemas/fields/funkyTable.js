export default {
    name: 'funkyTable',
    title: 'Data table',
    type: 'object',
    fields: [
      {
        name: 'title',
        title: 'Table title',
        type: 'string'
      },
      {
      name: 'grid',
      type: 'array',
      of: [{
        type: 'grid'
      }]
    }]
  }
