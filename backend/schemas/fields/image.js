import license from './license';

export default {
  name: 'image',
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
      type: 'string',
      options: {
        list: [
          {
            text: 'full', value: 'full',
          },
          {
            text: 'half', value: 'half',
          },
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
