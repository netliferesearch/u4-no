import {
  language
} from './fields'


export default {
  name: 'keyword',
  title: 'Keyword',
  type: 'document',
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
    language,
    {
      name: 'translation',
      title: 'Translation of',
      hidden: ({document}) => document?.language === 'en_US',
      description: 'Which keyword (in English) this is a translation of',
      type: 'reference',
      to: [
        {
          type: 'keyword'
        }
      ],
      options: {
        disableNew: true,
        filter: ({document}) => {
          if (!document.category) {
            return {};
          } else {
            return {
              filter: '( category == $category ) && ( language == "en_US" )',
              params: {category: document.category}
            }
          }
        }
      }
    },
    {
      name: 'regions',
      title: 'Part of region(s)',
      description: 'Region(s) that this country is part of',
      hidden: ({document}) => document?.category !== 'country',
      type: 'array',
      of: [
        { 
          type: 'reference', 
          to: [ { type: 'keyword' } ],
          options: {
            filter: '( category == "region" ) && ( language == "en_US" )',
            disableNew: true,
          }    
        }
      ]
    }

  ],
  orderings: [
    {
      title: 'Keywords',
      name: 'keywordsAsc',
      by: [
        { field: 'keyword', direction: 'asc'},
        { field: 'category', direction: 'asc' }
        ]
    },
    {
      title: 'Countries first',
      name: 'firstNameAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'keyword', direction: 'asc'}
        ]
    }
  ],
  preview: {
    select: {
      title: 'keyword',
      subtitle: 'category'
    }
  }
}
