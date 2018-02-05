import { slug, license } from './fields';

export default {
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
      name: 'position',
      type: 'string'
    },
    {
      name: 'email',
      type: 'email'
    },
    {
      name: 'phone',
      type: 'string'
    },
    {
      name: 'twitter',
      type: 'url'
    },
    {
      name: 'medium',
      type: 'url'
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'surname',
        slugify: input => input
                             .toLowerCase()
                             .replace(/\s+/g, '-')
                             .slice(0, 200)
      }
    },
    {
      name: 'affiliations',
      title: 'Affiliations',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'institution',
            },
          ],
        },
      ],
    },
    {
      name: 'cv',
      title: 'CV',
      type: 'url'
    },
    {
      name: 'bio',
      title: 'Full biography',
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
      name: 'bioShort',
      title: 'Short biography',
      description: 'For publications on pdfs etc. Typically just one paragraph.',
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
      name: 'image',
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
  ],
  orderings: [
    {
      title: 'Last name',
      name: 'surnameAsc',
      by: [{ field: 'surname', direction: 'asc' }],
    },
    {
      title: 'First name',
      name: 'firstNameAsc',
      by: [{ field: 'firstName', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      firstName: 'firstName',
      surname: 'surname',
      email: 'email',
      image: 'image.asset.url',
    },
    prepare({ firstName = 'N.', surname = 'N', image, email = ''}, viewOptions = {}) {
      const previewtitle =
        viewOptions.ordering && viewOptions.ordering.name === 'firstNameAsc'
          ? `${firstName} ${surname}`
          : `${surname}, ${firstName}`;
      return {
        title: previewtitle,
        subtitle: email,
        image,
      };
    },
  },
 }
