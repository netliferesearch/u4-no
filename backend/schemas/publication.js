/**
 * A publication is a long form document
 */
import {
  title,
  subtitle,
  date,
  image,
  leadText,
} from './fields'

export default {
    name: 'publication',
    title: 'Publication',
    type: 'object',
    fields: [
      title,
      subtitle,
      leadText,
      {
        name: 'content',
        title: 'Publication content',
        description: 'The body text and graphic elements.',
        type: 'array',
        of: [
          {
            type: 'block'
          },
          {
            type: 'reference',
            tile: 'Nugget',
            to: [
              {
                type: 'nugget'
              },
            ]
          },
          {
            type: 'pullQuote'
          },
          image,
        ]
      },
      {
        name: 'mainPoints',
        title: 'Main points',
        description: 'List 2–10 implications/recommendations/must-knows for development professionals. 1-2 sentences per point.',
        type: 'array',
        of: [
          {
            type: 'string',
          }
        ]
      },
      {
        name: 'authors',
        description: 'Place in order of appearance',
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
        description: 'Responsible U4 staff member',
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

