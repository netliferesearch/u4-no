export default {
  name: 'keyword',
  type: 'object',
  fields: [
    {
      name: 'keyword',
      type: 'string'
    },
    {
      title: 'Does this keyword represent a country?',
      name: 'isCountry',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      title: 'keyword'
    }
  }
}
