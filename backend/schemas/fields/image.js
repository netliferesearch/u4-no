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
      name: 'title',
      title: 'Title',
      description: '(displayed above image)',
      type: 'string',
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'altText',
      title: 'Alternative text',
      description: 'For users that can\'t see images',
      type: 'string',
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'caption',
      title: 'Caption text',
      description: 'Shows next to image. Title from Flickr – if applicable. Describe context and/or message. Name people and places.',
      type: 'array',
      options: {
        isHighlighted: true
      },
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
      title: 'Size',
      description: 'Set image display width',
      type: 'string',
      options: {
        isHighlighted: true,
        list: [
          { title: 'Full width', value: 'fullwidth' },
          { title: 'Wide', value: 'wide' },
          { title: 'Normal', value: 'normal' },
          { title: 'Small', value: 'small' },
          { title: 'Narrow', value: 'narrow' },
        ],
      },
    },
    {
      name: 'credit',
      title: 'Credit',
      description: 'Photographer/publisher’s name.',
      type: 'text',
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'sourceUrl',
      title: 'Credit URL',
      type: 'url',
      description: 'Enter link for source for the image or the originator',
      options: {
        isHighlighted: true
      }
    },
    license,
  ]
}
