import createSchema from 'part:@sanity/base/schema-creator';
import publication from './publication';

export default createSchema({
  name: 'default',
  types: [
    {
      name: 'nugget',
      type: 'object',
      fields: [
        {
          name: 'title',
          type: 'string'
        },
        {
          name: 'text',
          type: 'array',
          of: [
            {
              type: 'block'
            }
          ],
        },
        {
          name: 'image',
          type: 'image'
        },
        {
          name: 'resources',
          type: 'reference',
          to: [
            {
              type: 'person'
            }
          ]
        }
      ],
      preview: {
        select: {
          title: 'title',
        }
      }
    },
    {
    name: 'topics',
    type: 'object',
    fields: [
      {
        name: 'title',
        type: 'string',
      },
      {
        name: 'longTitle',
        type: 'string',
      },
      {
        name: 'explainerText',
        type: 'text',
        description: 'Punchy one/two-liner to introduce this U4 topic (200-300 characters with spaces)'
      },
      {
        name: 'featuredImage',
        type: 'image',
      },
      {
        name: 'parent',
        type: 'reference',
        to: [
          {
            type: 'topics'
          }
        ]
      },
      {
        name: 'introduction',
        title: 'Topic introduction',
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
            type: 'image'
          },
        ]
      },
      {
        name: 'agenda',
        title: 'Research and policy agenda',
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
            type: 'image'
          },
        ]
      },
      {
        name: 'advisors',
        type: 'array',
        of: [
          {
            name: 'advisor',
            type: 'reference',
            to: [
              {
                type: 'person'
              }
            ]
          }
        ]
      }

    ]
  },
  {
   name: 'person',
   type: 'object',
   fields: [
     {
       name: 'firstName',
       type: 'string'
     },
     {
       name: 'surname',
       type: 'string'
     },
     {
       name: 'image',
       type: 'image',
     }
   ],
   preview: {
     select: {
       title: 'firstName'
     }
   },
  },
  {
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
      }
    ]

  },
  publication

]
})
