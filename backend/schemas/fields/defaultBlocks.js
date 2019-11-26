/*
  default blocks for ordinary portable text fields
*/

import annotationsLinksOnly from './annotationsLinksOnly';

export default {
  title: 'Default Blocks',
  name: 'defaultBlocks',
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
};
