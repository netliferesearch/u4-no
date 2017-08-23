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
/*

{
  name: 'type',
  title: 'Publication type',
  type: 'string',
  options:{
    list: [
        {
          title: 'Brief',
          value: 'brief'
        },
        {
          title: 'Issue',
          value: 'issue'
        },
        {
          title: 'Report',
          value: 'report'
        },
        {
          title: 'Practitioner Experience Note (PEN)',
          value: 'pen'
        },
        {
          title: '  ',
          value: 'pi'
        }
    ],
    layout: 'radio'
  }
},
*/
