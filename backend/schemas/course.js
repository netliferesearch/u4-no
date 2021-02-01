import { title, leadText, featuredImage, language, slug, vimeoVideo } from './fields';
import annotationsLinksOnly from './fields/annotationsLinksOnly';
import augmentSchema from './fields/augmentSchema';
import defaultBlock from './fields/defaultBlock';

export default augmentSchema({
  title: 'Course',
  name: 'course',
  type: 'document',
  fields: [
    title,
    leadText,
    {
      name: 'content',
      title: 'Description',
      type: 'array',
      of: [
        defaultBlock,
        vimeoVideo,
      ],
    },
    {
      name: 'startDate',
      title: 'Start date',
      type: 'richDate',
      options: {
        inputDate: true,
        inputTime: false,
      },
    },
    {
      name: 'endDate',
      title: 'End date',
      type: 'richDate',
      options: {
        inputDate: true,
        inputTime: false,
      },
    },
    language,
    {
      name: 'otherLanguages',
      title: 'Course available in other languages',
      description: 'Add course versions in other languages',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'course',
            },
          ],
        },
      ],
    },
    {
      name: 'cost',
      title: 'Cost',
      type: 'string',
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
    },
    {
      name: 'commitment',
      title: 'Commitment',
      type: 'string',
    },
    {
      name: 'contact',
      title: 'Contact person',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'person',
            },
          ],
        },
      ],
    },
    {
      name: 'coordinator',
      title: 'Course coordinator',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'person',
            },
          ],
        },
      ],
    },
    {
      name: 'developer',
      title: 'Course developer',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'person',
            },
          ],
        },
      ],
    },
    {
      name: 'courseType',
      title: 'Course type',
      type: 'reference',
      to: [
        {
          type: 'courseType',
        },
      ],
    },
    {
      name: 'topics',
      description: 'Select relevant U4 topics',
      type: 'array',
      of: [
        {
          type: 'reference',
          weak: true,
          to: [
            {
              type: 'topics',
            },
          ],
        },
      ],
      preview: {
        title: 'topics.title',
      },
    },
    slug,
    featuredImage,
    vimeoVideo,
    {
      name: 'pdfAsset',
      description: 'Upload course leaflet',
      type: 'file'
    },
  ],
});
