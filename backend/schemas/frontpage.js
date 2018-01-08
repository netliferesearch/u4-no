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
    {
      name: 'lead',
      title: 'Lead text',
      description: `One or two main points to highlight importance, relevance, and benefit for development professionals.
      (Aim for 400–500 characters with spaces)`,
      type: 'array',
      of: [{
        type: 'block'
      }]
    },
    {
      name: 'leadLinks',
      title: 'Links in lead text box',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link URL',
              type: 'string',
            },
          ]
        }
      ]
    },
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
              {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'}]},
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
                      {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'}]},
                    ]
                  }
                }
              ]
            }
          ],
          preview: {
            select: {
              blocks: 'text',
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

        {
          name: 'oneColumn',
          title: 'One column text box',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text box contents',
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
                      {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'}]},
                    ]
                  }
                }
              ]
            },
            {
              name: 'colorScheme',
              title: 'Color scheme',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark on white', value: 'darkOnWhite'},
                  { title: 'Dark on light blue', value: 'darkOnLightBlue'},
                  { title: 'White on blue', value: 'whiteOnBlue'},
                  { title: 'White on dark blue', value: 'whiteOnDarkBlue'},
                ],
              },
              layout: "dropdown"
            },
          ],
          preview: {
            select: {
              blocks: 'text',
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
                      type: 'event'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'expertAnswers',
          title: 'Expert answers',
          type: 'object',
          fields: [
            {
              name: 'expertAnswersRef',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [
                    {
                      type: 'publication'
                    },
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'resources',
          title: 'Resources',
          type: 'object',
          fields: [
            {
              name: 'resourcesRef',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [
                    {
                      type: 'resource'
                    },
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
          name: 'vimeo',
          title: 'Vimeo video',
          description: 'Paste URL to the vimeo video (not the whole embed code)',
          type: 'object',
          fields: [
            {
              name: 'src',
              title: 'URL',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
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
          name: 'twoColumns',
          title: 'Text in two columns',
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
                    {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'}]},
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
                    {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'}]},
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
                    {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'}]},
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
                    {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'}]},
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
          name: 'boxOnBoxTopics',
          title: 'Two text boxes, topics in right one',
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
                    {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'}]},
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
                    {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'}]},
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
          name: 'HelpdeskTeam',
          title: 'Two text boxes for Helpdesk Team',
          type: 'object',
          fields: [
            {
              name: 'img',
              title: 'Image on the left hand',
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
                    {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'}]},
                  ]
                }
              }],
            },
            {
              name: 'personLeft',
              title: 'Left column persons',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [
                    {
                      type: 'person'
                    },
                  ]
                }
              ]
            },
            {
              name: 'personRight',
              title: 'Right column persons',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [
                    {
                      type: 'person'
                    },
                  ]
                }
              ]
            },
          ],
          preview: {
            select: {
              blocks: 'textRight',
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
        {
          name: 'boxOnImageRef',
          title: 'Text box on image',
          type: 'object',
          fields: [
            {
              name: 'img',
              title: 'Image on the left hand',
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
                      {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'}]},
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
