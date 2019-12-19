export default {
  name: 'vimeo',
  title: 'Vimeo video',
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
      name: 'size',
      title: 'Size',
      description: 'Set size for the video player.',
      type: 'string',
      options: {
        isHighlighted: true,
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
