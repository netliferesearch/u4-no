import {
  title,
  leadText,
  featuredImage,
  image,
  language,
  shortSlug,
  slug,
  standfirst,
  vimeoVideo,
} from './fields';
import annotationsLinksOnly from './fields/annotationsLinksOnly';
import augmentSchema from './fields/augmentSchema';
import defaultBlock from './fields/defaultBlock';
import testimonial from './fields/testimonial';

export default augmentSchema({
  title: 'Course',
  name: 'course',
  type: 'document',
  fields: [
    title,
    standfirst,
    leadText,
    {
      name: 'content',
      title: 'Description',
      type: 'array',
      of: [defaultBlock, image, vimeoVideo],
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
      name: 'registrationLink',
      title: 'Registration link',
      type: 'url',
      description: 'Link to the enrolment page, like https://learn.u4.no/enrol/index.php?id=4',
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
      description: '(not in use for courses at learn.u4.no)',
    },
    {
      name: 'mode',
      title: 'Mode',
      type: 'string',
      initialValue: 'Self-paced',
      options: {
        list: ['Self-paced', 'Facilitated'], // <-- predefined values
      },
      layout: 'dropdown',
    },
    {
      name: 'method',
      title: 'Mode (same as above, in the language of the course)',
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
      type: 'file',
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
    {
      name: 'relatedCourses',
      title: 'Related courses',
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
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [testimonial],
    },
    slug,
    shortSlug,
  ],
});
