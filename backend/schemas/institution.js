import { license } from './fields';

export default {
  name: 'institution',
  title: 'Institution',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name of institution',
      type: 'string',
    },
    {
      name: 'about',
      title: 'About this institution',
      type: 'array',
      of: [
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
              {title: 'Emphasis', value: 'em'}
            ],
            // Support annotating text with a reference to an author
            annotations: [
              {name: 'link', title: 'External Link', type: 'object', fields: [{ name: 'href', title: 'URL', type: 'url'}] },
              {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'},{type: 'article'}]},
            ]
          }
        },
      ],
    },
    {
      name: 'funder',
      title: 'Is a U4 partner agency (funder)',
      type: 'boolean'
    },
    {
      name: 'logo',
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
      name: 'svgLogo',
      title: 'Logo in svg format',
      description: 'For selected institutions we create svg logos that look better on screen',
      type: 'string',
    },
    {
      name: 'website',
      title: 'Website url',
      type: 'url',
    },
    {
      name: 'contact',
      type: 'object',
      fields: [
        {
          name: 'phone',
          type: 'string',
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'postalAdress',
          type: 'text',
        },
        {
          name: 'postalNumber',
          type: 'number',
        },
        {
          name: 'country',
          type: 'string'
        },
      ],
    },
    {
      name: 'contactInformation',
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
    }
  ]
}
