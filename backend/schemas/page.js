import license from './fields/license';
/**
 * A publication is a long form document
 */
// import { Input as UrlWithMetadataInput } from 'part:url-metadata-input/input';
import {
  title,
  subtitle,
  date,
  image,
  leadText,
} from './fields'

export default {
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
      title,
      subtitle,
      leadText,
      {
        name: 'featuredImage',
        title: 'Featured image',
        description: 'This is the image that illustrates this publication in the hero, frontpage and previews',
        type: 'image',
        options: {
          // isHighlighted: true,
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
        name: 'content',
        title: 'Publication content',
        description: 'The body text and graphic elements.',
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
        name: 'topics',
        type: 'array',
        of: [
          {
            type: 'reference',
            weak: true,
            to: [
              {
                type: 'topics'
              }
            ]
          }
        ]
      },
      // Todo: v3 update
      // {
      //   name: 'relatedUrl',
      //   title: 'Related URL',
      //   type: 'urlWithMetadata',
      //   inputComponent: UrlWithMetadataInput
      // }
    ]
  }
