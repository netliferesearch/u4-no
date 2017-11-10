import { title, leadText, featuredImage, slug } from './fields'

export default {
  title: 'Course',
  name: 'course',
  type: 'object',
  fields: [
    title,
    leadText,
    {
      name: 'language',
      title: 'Language',
      type: 'text',
    },
    {
      name: 'link',
      title: 'Link to registration/info',
      type: 'string',
    },
    {
      name: 'startDate',
      title: 'Start date',
      type: 'richDate',
      options: {
        inputDate: true,
        inputTime: false,
      }
    },
    {
      name: 'endDate',
      title: 'End date',
      type: 'richDate',
      options: {
        inputDate: true,
        inputTime: false,
      }
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
      name: 'topics',
      description: 'Select relevant U4 topics',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'topics'
            }
          ]
        }
      ],
      preview: {
        title: 'topics.title'
      }
    },
  ],
}
