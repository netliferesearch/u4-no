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
        {
          name: 'vimeo',
          title: 'Vimeo video',
          type: 'object',
          fields: [
            {
              name: 'src',
              title: 'URL to the vimeo video (not the whole embed code)',
              type: 'string',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'size',
              title: 'Video size',
              description: 'Set size for the video player.',
              type: 'string',
              options: {
                list: [
                  { title: 'wide', value: 'wide' },
                  { title: 'normal', value: 'normal' },
                  { title: 'small', value: 'small' },
                  { title: 'narrow', value: 'narrow' },
                ],
              },
            },
          ],
        },
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
