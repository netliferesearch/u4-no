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
      title: 'Does this keyword represent a country?',
      name: 'isCountry',
      type: 'boolean'
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
      layout: "dropdown",
    },
  ],
  preview: {
    select: {
      title: 'keyword'
    }
  }
}
