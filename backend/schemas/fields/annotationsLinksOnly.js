import { FaPaperclip as linkIcon } from 'react-icons/fa'

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
    ],
  },
];

export default annotationsLinksOnly;
