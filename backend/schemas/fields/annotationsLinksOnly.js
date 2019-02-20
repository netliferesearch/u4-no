const annotationsLinksOnly = [
  {
    name: 'link',
    title: 'External Link',
    type: 'object',
    fields: [
      {
        name: 'href',
        title: 'URL',
        type: 'url',
        validation: false,
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
      { type: 'course' },
      { type: 'event' },
      { type: 'frontpage' },
      { type: 'file' },
      { type: 'asset' },
    ],
  },
];

export default annotationsLinksOnly;
