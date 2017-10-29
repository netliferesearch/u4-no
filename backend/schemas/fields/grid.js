export default {
  name: 'grid',
  type: 'object',
  fields: [{
    name: 'grid',
    type: 'array',
    of: [{
      type: 'object',
      fields: [{
        name: 'value',
        type: 'string'
      }]
    }]
  }, ],
}
