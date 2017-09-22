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
      description: '',
      type: 'string'
    },
    {
      name: 'licensor',
      title: 'Lisence',
      type: 'text'
    },
    license,
  ]
}
