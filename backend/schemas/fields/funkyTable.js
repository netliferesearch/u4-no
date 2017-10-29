const funkyTable = {
    name: 'funkyTable',
    type: 'object',
    fields: [{
      name: 'grid',
      type: 'array',
      of: [{
        type: 'grid'
      }]
    }]
  },

  const grid = {
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

export default {
  funkyTable,
  grid,
}
