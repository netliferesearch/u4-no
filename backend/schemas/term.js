export default {
  name: 'term',
  type: 'object',
  fields: [
    {
     name: 'term',
     type: 'string',
    },
    {
      name: 'definition',
      type: 'text'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'term',
        slugify: input => input
                             .toLowerCase()
                             .replace(/\s+/g, '-')
                             .slice(0, 200)
      }
    }
  ]
}
