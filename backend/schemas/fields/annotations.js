import { FaPaperclip as linkIcon } from 'react-icons/fa'

const annotations = [
  {
    name: 'link',
    title: 'External link',
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
    title: 'Link to internal resource',
    blockEditor: {
      icon: linkIcon,
    },
    type: 'reference',
    to: [
      { type: 'person' },
      { type: 'publication' },
      { type: 'article' },
      { type: 'event' },
      { type: 'frontpage' },
      { type: 'asset' },
      { type: 'topics' },
      { type: 'course' },
      { type: 'blog-post' },
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
