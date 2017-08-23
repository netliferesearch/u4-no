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
      date,
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

