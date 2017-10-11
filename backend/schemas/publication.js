import FunkyEditor from '../components/FunkyEditor'
import license from './fields/license';
/**
 * A publication is a long form document
 */
import { Input as UrlWithMetadataInput } from 'part:url-metadata-input/input';
import {
  title,
  subtitle,
  standfirst,
  date,
  image,
  leadText,
  slug
} from './fields'

export default {
    name: 'publication',
    title: 'Publication',
    type: 'object',
    fields: [
      title,
      subtitle,
      standfirst,
      slug,
      leadText,
      {
        name: 'featuredImage',
        title: 'Featured image',
        description: 'This is the image that illustrates this publication in the hero, frontpage and previews',
        type: 'image',
        options: {
          isHighlighted: true,
          hotspot: true,
        },
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
                lists: [],
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
        name: 'summary',
        title: 'Summary for busy people',
        description: 'One-pager, blog-like, light narrative. Bite-sized chunks with descriptive sub-headings. Explain: 1. the main recommendations and/or implications and findings, and  2. why this is important. Max 1000 words.',
        type: 'array',
        of: [
          {
            type: 'block'
          }
        ]
      },
      {
        name: 'content',
        title: 'Publication content',
        description: 'The body text and graphic elements.',
        type: 'array',
        of: [
          {
            type: 'block',
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
        name: 'references',
        title: 'Publication references',
        description: 'A list of the sources used in this publication',
        type: 'array',
        of: [
          {
            type: 'block',
            lists: [],
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
        name: 'notes',
        description: 'Optional',
        type: 'array',
        of: [
          {
            type: 'block',
            lists: [],
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
        name: 'partners',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [
              {
                type: 'partners'
              },
            ],
          },
        ],
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
        description: 'Chose from drop-down menu of the available U4 keywords.',
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
        ],
      },
      {
        name: 'publicationType',
        title: 'Publication type',
        type: 'reference',
        to: [
          {
            type: 'publicationType'
          }
        ]
      },
      {
        name: 'bibliograpicalOverride',
        title: 'Override Bibliography',
        description: 'Do you want to override some of this publication’s bibliographic details?',
        type: 'object',
        options: {
          collapsable: true,
        },
        fields: [
          {
            name: 'year',
            type: 'richDate'
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
        ],
        preview: {
          select: {
            title: title,
          }
        }
      },
      {
        name: 'abbreviations',
        title: 'Abbreviations',
        type: 'block',
        preview: {
          select: {
            title: 'title',
            subtitle: 'text'
          },

          prepare({ title = '', subtitle = false }) {
            return {
              title,
              subtitle: subtitle ? subtitle[0].children[0].text : 'Empty'
            };
          },
        }
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
        description: 'Select relevant U4 topics',
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
        ],
        preview: {
          title: 'topics.title'
        }
      },
      {
        name: 'relatedUrl',
        title: 'Related URL',
        type: 'urlWithMetadata',
        inputComponent: UrlWithMetadataInput
      }
    ],
    preview: {
      select: {
        title: 'title',
        subtitle: 'subtitle',
        image: 'featuredImage.asset.url'
      }
    }
  }
