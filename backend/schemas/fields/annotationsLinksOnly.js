import { FaPaperclip as linkIcon } from 'react-icons/fa';

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
        validation: Rule => Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel']
        })
      },
    ],
  },
  {
    name: 'internalReferance',
    title: 'Link to internal resource',
    icon: linkIcon,
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
];

export default annotationsLinksOnly;
