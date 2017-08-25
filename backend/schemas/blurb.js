export default {
  name: 'blurb',
  title: 'Blurb',
  type: 'object',
  description: '(Optional) A quote from someone with an important opinion promoting the publication.',
  fields: [
    {
      name: 'text',
      type: 'text'
    },
    {
      name: 'origin',
      description: 'Who said this?',
      type: 'string'
    }
  ]
}
