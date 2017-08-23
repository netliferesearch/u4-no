import {
  title
} from './fields';

export default {
  title: 'Publication type',
  name: 'publicationType',
  type: 'object',
  fields: [
    title,
    {
      name: 'description',
      type: 'text'
    },
  ],
}
