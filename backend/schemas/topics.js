import { title, longTitle, explainerText, featuredImage, slug, license } from './fields'

export default {
  name: 'topics',
  title: 'Topic',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Short title',
      description: 'Keywords that people search. Not including "corruption". Max 5 words',
    },
    longTitle,
    explainerText,
    featuredImage,
    {
      name: 'parent',
      title: 'This is an area of…',
      description: 'This topic is an area of another topic',
      type: 'reference',
      to: [
        {
          type: 'topics'
        }
      ]
    },
    {
      name: 'introduction',
      title: 'Basic guide',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'H5', value: 'h5'},
          ],
          // Only allow numbered lists
          marks: {
            // Only allow these decorators
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'}
            ],
            // Support annotating text with a reference to an author
            annotations: [
              {name: 'link', title: 'External Link', type: 'object', fields: [{ name: 'href', title: 'URL', type: 'url'}] },
              {name: 'internalReferance', title: 'Author/ publication/ article/ asset', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'},{type: 'asset'}]},
            ]
          }
        },
        {
          type: 'reference',
          to: [
            {
              type: 'nugget'
            }
          ]
        },
        {
          type: 'image',
          fields: [
    {
      name: 'altText',
      title: 'Alternative text',
      description: 'For users that can\'t see images',
      type: 'string'
    },
    {
      name: 'caption',
      title: 'Caption text',
      description: 'Shows next to image. Title from Flickr – if applicable. Describe context and/or message. Name people and places.',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          marks: {
            // Only allow these decorators
            decorators: [
              { title: 'Emphasis', value: 'em' }
            ],
          },
        },
      ],
    },
    {
      name: 'size',
      title: 'Image size',
      description: 'Set size for image in frontend that supports it',
      type: 'string',
      options: {
        list: [
          { title: 'wide', value: 'wide' },
          { title: 'normal', value: 'normal' },
          { title: 'small', value: 'small' },
          { title: 'narrow', value: 'narrow' },
        ],
      },
    },
    {
      name: 'credit',
      title: 'Credit',
      description: 'Photographer/publisher’s name.',
      type: 'text'
    },
    {
      name: 'sourceUrl',
      title: 'Credit URL',
      type: 'url',
      description: 'Enter link for source for the image or the originator'
    },
    license,
  ]
        }
      ]
    },
    {
      name: 'agenda',
      title: 'Research and policy agenda',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
          ],
          // Only allow numbered lists
          marks: {
            // Only allow these decorators
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'}
            ],
            // Support annotating text with a reference to an author
            annotations: [
              {name: 'link', title: 'External Link', type: 'object', fields: [{ name: 'href', title: 'URL', type: 'url'}] },
              {name: 'internalReferance', title: 'Author/ publication/ article/ asset', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'},{type: 'asset'}]},
            ]
          }
        },
        {
          type: 'reference',
          to: [
            {
              type: 'nugget'
            }
          ]
        },
        {
          type: 'image',
          fields: [
            {
              name: 'altText',
              title: 'Alternative text',
              description: 'For users that can\'t see images',
              type: 'string'
            },
            {
              name: 'caption',
              title: 'Caption text',
              description: 'Shows next to image. Title from Flickr – if applicable. Describe context and/or message. Name people and places.',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [],
                  marks: {
                    // Only allow these decorators
                    decorators: [
                      { title: 'Emphasis', value: 'em' }
                    ],
                  },
                },
              ],
            },
            {
              name: 'size',
              title: 'Image size',
              description: 'Set size for image in frontend that supports it',
              type: 'string',
              options: {
                list: [
                  { title: 'wide', value: 'wide' },
                  { title: 'normal', value: 'normal' },
                  { title: 'small', value: 'small' },
                  { title: 'narrow', value: 'narrow' },
                ],
              },
            },
            {
              name: 'credit',
              title: 'Credit',
              description: 'Photographer/publisher’s name.',
              type: 'text'
            },
            {
              name: 'sourceUrl',
              title: 'Credit URL',
              type: 'url',
              description: 'Enter link for source for the image or the originator'
            },
            license,
          ]
        }
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
    },
    slug,
    {
      name: 'resources',
      description: 'Relevant resources for this topic page',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'article'
            },
            {
              type: 'publication'
            }
          ]
        }
      ]
    }
  ]
}
