import { title, leadText, featuredImage, language, slug } from './fields';
import annotationsLinksOnly from './fields/annotationsLinksOnly';
import augmentSchema from './fields/augmentSchema';

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
      type: 'defaultBlocks',
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
  ],
});
