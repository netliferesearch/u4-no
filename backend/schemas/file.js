export default {
  name: 'asset',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'asset',
      type: 'file'
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: input => input
                             .toLowerCase()
                             .replace(/\s+/g, '-')
                             .slice(0, 200)
      }
    },
  ]
}
