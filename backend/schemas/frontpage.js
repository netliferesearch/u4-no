import FunkyEditor from '../components/FunkyEditor'
import license from './fields/license';
/**
 * A publication is a long form document
 */
import { Input as UrlWithMetadataInput } from 'part:url-metadata-input/input';
import {
  title,
  longTitle,
  date,
  image,
  leadText,
  featuredImage,
} from './fields';

export default {
  name: 'frontpage',
  type: 'object',
  title: 'Frontpage',
  fields: [
    title,
    longTitle,
    leadText,
    featuredImage,
    {
      name: 'sections',
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
              {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'}]},
            ]
          }
        },
        {
          name: 'heading',
          title: 'Centered heading',
          type: 'object',
          fields: [
            {
              name: 'headingValue',
              type: 'string',
            }
          ]
        },
        {
          name: 'textBlock',
          title: 'Text field',
          type: 'object',
          fields: [
            {
              name: 'text',
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
                      {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'}]},
                    ]
                  }
                }
              ]
            }
          ]
        },
        {
          name: 'features',
          title: 'Features',
          type: 'object',
          fields: [
            {
              name: 'featureArray',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    image,
                    {
                      name: 'featureText',
                      type: 'text',
                    },
                  ]
                }
              ]
            }
          ],
        },
        {
          name: 'workshops',
          title: 'Workshops list',
          type: 'object',
          fields: [
            {
              name: 'workshopsRef',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [
                    {
                      type: 'workshop'
                    },
                    {
                      type: 'event'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'courses',
          title: 'Courses list',
          type: 'object',
          fields: [
            {
              name: 'coursesRef',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [
                    {
                      type: 'course'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'cta',
          title: 'Call to action link',
          type: 'object',
          fields: [
            {
              name: 'ctaValue',
              title: 'Lenketekst',
              type: 'string',
            },
            {
              name: 'ctaURL',
              title: 'URL',
              type: 'string',
            }
          ]
        },
        {
          name: 'boxOnBoxRef',
          title: 'Two text boxes',
          type: 'object',
          fields: [
            {
              name: 'textLeft',
              title: 'Text in left hand box',
              type: 'array',
              of: [{
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
                    {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'}]},
                  ]
                },
              }],
            },
            {
              name: 'textRight',
              title: 'Text in right hand box',
              type: 'array',
              of: [{
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
                    {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'}]},
                  ]
                }
              }],
            },
          ],
          preview: {
            select: {
              blocks: 'textLeft',
              blocks2: 'textRight',
            },
            prepare({ blocks, blocks2 }) {
                const block = (blocks || []).find(block => block._type === 'block')
                const block2 = (blocks2 || []).find(block => block._type === 'block')
                return {
                  title: block
                    ? block.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                    : 'No title',
                  subtitle: block2
                    ? block2.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                    : 'No title'
                }
            },
          }
        },
        {
          name: 'boxOnImageRef',
          title: 'Text box on image',
          type: 'object',
          fields: [
            {
              name: 'img',
              title: 'Image on the left hand',
              type: 'image',
            },
            {
              name: 'block',
              title: 'Text in right hand box',
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
                      {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'}]},
                    ]
                  }
                }
              ]
            },
          ],
          preview: {
            select: {
              blocks: 'block',
            },
            prepare({ blocks }) {
                const block = (blocks || []).find(block => block._type === 'block')
                return {
                  title: block
                    ? block.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                    : 'No title'
                }
            },
          },
        },
      ],
    },
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
    {
      name: 'relatedUrl',
      title: 'Related URL',
      type: 'urlWithMetadata',
      inputComponent: UrlWithMetadataInput
    }
  ]
}
