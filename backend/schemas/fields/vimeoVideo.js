import license from './license';

export default {
  name: 'vimeo',
  title: 'Video',
  type: 'object',
  fields: [
    {
      name: 'src',
      title: 'URL to the vimeo video (not the whole embed code)',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'caption',
      title: 'Caption text',
      description: 'Shows next to/ below video. Title from Flickr – if applicable. Describe context and/or message. Name people and places.',
      type: 'array',
      options: {
        // isHighlighted: true
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
      name: 'credit',
      title: 'Credit',
      description: 'Photographer/publisher’s name.',
      type: 'string',
      options: {
        // isHighlighted: true
      }
    },
    {
      name: 'sourceUrl',
      title: 'Credit URL',
      type: 'url',
      description: 'Enter link to publisher/ originator',
      options: {
        // isHighlighted: true
      }
    },
    license,
    {
      name: 'size',
      title: 'Size',
      description: 'Set size for the video player.',
      type: 'string',
      options: {
        // isHighlighted: true,
        list: [
          { title: 'Wide', value: 'wide' },
          { title: 'Normal', value: 'normal' },
          { title: 'Small', value: 'small' },
          { title: 'Narrow', value: 'narrow' },
        ],
      },
    },
  ],
};
