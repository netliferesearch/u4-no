import { title, leadText, featuredImage, image, language, shortSlug, slug, vimeoVideo } from './fields';
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
        image,
        vimeoVideo,
      ],
    },
    {
      name: 'startDate',
      title: 'Start date',
      type: 'datetime',
      options: {
        inputDate: true,
        inputTime: false,
      },
    },
    {
      name: 'endDate',
      title: 'End date',
      type: 'datetime',
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
      name: 'expert',
      title: 'Course expert',
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
      name: 'method',
      title: 'Method (self-paced, expert led etc.)',
      type: 'string',
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
    featuredImage,
    vimeoVideo,
    {
      name: 'pdfAsset',
      description: 'Upload course leaflet',
      type: 'file'
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
    // shortSlug, // Note: this breaks in V3, 'Invalid hook call' error.
  ],
});
