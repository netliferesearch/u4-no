export default {
  name: 'keyword',
  type: 'object',
  fields: [
    {
      name: 'keyword',
      description: 'All keywords must: - make sense as stand-alone words - be in English - be a feasible search term - likely apply to several resources',
      type: 'string'
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: 'Keyword', value: 'keyword'},
          { title: 'Country', value: 'country'},
          { title: 'Region', value: 'region'},
        ],
      },
      layout: "radio",
    },
  ],
  orderings: [
    {
      title: 'Keywords',
      name: 'keywordsAsc',
      by: [
        { field: 'category', direction: 'desc' },
        { field: 'keyword', direction: 'asc'}
        ],
    },
    {
      title: 'Countries',
      name: 'firstNameAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'keyword', direction: 'asc'}
        ],
    },
  ],
  preview: {
    select: {
      title: 'keyword'
    }
  }
}
