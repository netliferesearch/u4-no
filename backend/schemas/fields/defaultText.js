/*
  replace type: 'defaultText' with sanity definition (array of blocks)
  input: field definition
  return: {fields, fieldsets}
    fields = array of sanity field definitions with custom field definitions
    fieldsets = array of added fieldsets (none at the moment)
*/

import annotationsLinksOnly from './annotationsLinksOnly';

export default ({ type, ...fieldAttributes }) => ({
  fields: [
    {
      ...fieldAttributes,
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }],
          marks: {
            decorators: [{ title: 'Emphasis', value: 'em' }],
            // Support annotating text with internal and external links
            annotations: annotationsLinksOnly,
          },
        },
      ],
    },
  ],
  fieldsets: [],
});
