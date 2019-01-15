const annotations = [
  {
    name: 'link',
    title: 'External Link',
    type: 'object',
    fields: [
      {
        name: 'href',
        title: 'URL',
        type: 'url',
        validation: Rule =>
          Rule.uri({ allowRelative: true, scheme: ['https', 'http', 'mailto', 'tel'] }),
      },
    ],
  },
  {
    name: 'internalReferance',
    title: 'Find some internal resource',
    type: 'reference',
    to: [
      { type: 'person' },
      { type: 'publication' },
      { type: 'article' },
      { type: 'event' },
      { type: 'frontpage' },
      { type: 'file' },
      { type: 'asset' },
    ],
  },
  {
    type: 'object',
    name: 'blockNote',
    title: 'Block note',
    annotationMarker: '*',
    fields: [
      {
        type: 'string',
        name: 'style',
        options: {
          list: [{ title: 'Footnote', value: 'footnote' }, { title: 'Endnote', value: 'endnote' }],
        },
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [{ type: 'block' }],
      },
    ],
  },
  {
    name: 'footnote',
    type: 'object',
    fields: [
      {
        name: 'content',
        title: 'Footnote content',
        type: 'array',
        of: [
          {
            type: 'block',
            styles: [{ title: 'Normal', value: 'normal' }],
            lists: [],
            // Only allow numbered lists
            marks: {
              // Only allow these decorators
              decorators: [
                { title: 'Strong', value: 'strong' },
                { title: 'Emphasis', value: 'em' },
              ],
              // Support annotating text with a reference to an author
              annotations,
            },
          },
        ],
      },
    ],
  },
];

export default annotations;
