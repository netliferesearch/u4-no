import license from './license';

export default {
  name: 'featuredImage',
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
