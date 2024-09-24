import {  slug } from './fields';

export default {
  name: 'asset',
  title: 'Asset (file)',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'asset',
      type: 'file'
    },
    slug,
  ]
}
