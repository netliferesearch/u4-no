/**
 * A publication is a long form document
 */
import {
  title,
  date,
} from './fields'

export default {
    name: 'publication',
    title: 'Publication',
    type: 'object',
    fields: [
      title,
      {
        name: 'lead',
        title: 'Lead text',
        type: 'text',
        description: 'One paragraph – max 80 words'
      },
      {
        name: 'content',
        title: 'Publication content',
        type: 'array',
        of: [
          {
            type: 'block'
          },
          {
            type: 'reference',
            to: [
              {
                type: 'nugget'
              },
            ]
          },
          {
            type: 'pullQuote'
          },
          {
            type: 'image'
          },
        ]
      },
      {
        name: 'mainPoints',
        title: 'Main points',
        description: '2–5 implications/recommendations/must-knows relevant for donors',
        type: 'array',
        of: [
          {
            type: 'string',
          }
        ]
      },
      {
        name: 'authors',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'person'
              }
            ]
          }
        ]
      },
      {
        name: 'editors',
        title: 'Series editors',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'person'
              }
            ]
          }
        ]
      },
      {
        name: 'acknowledgements',
        type: 'text'
      },
      {
        name: 'abstract',
        type: 'text'
      },
      date,
      {
        name: 'keywords',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'keyword'
              }
            ]
          }
        ]
      },
      {
        name: 'bibliograpicalOverride',
        title: 'Override Bibliography',
        type: 'object',
        options: {
          collapsable: true,
        },
        fields: [
          {
            name: 'year',
            type: 'date'
          },
          {
            name: 'volume',
            type: 'number'
          },
          {
            name: 'series',
            type: 'string'
          },
          {
            name: 'issue',
            type: 'number'
          },
          {
            name: 'publisher',
            type: 'string'
          },
          {
            name: 'location',
            type: 'string'
          },
          {
            name: 'pages',
            type: 'number'
          },
          {
            name: 'type',
            type: 'string'
          }
        ]
      },
      {
        name: 'blurbs',
        type: 'array',
        of: [
          {
            type: 'blurb'
          }
        ]
      },
      {
        name: 'topics',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'topics'
              }
            ]
          }
        ]
      }
    ]
  }

