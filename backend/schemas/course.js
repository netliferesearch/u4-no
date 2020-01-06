import { title, leadText, featuredImage, language, slug, vimeoVideo } from './fields';
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
