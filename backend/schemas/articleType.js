export default {
  name: 'articleType',
  title: 'Article type',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    }
  ],
  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
}
