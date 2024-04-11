import { leadText, featuredImage, slug, image, keywords } from './fields'
import annotationsLinksOnly from './fields/annotationsLinksOnly'
import defaultBlock from './fields/defaultBlock';
import publicationContent from './fields/publicationContent';

export default {
  title: 'Event',
  name: 'event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'Event title (include country name for in-country workshop)',
      type: 'string',
    },
    {
      name: 'eventType',
      title: 'Event type',
      type: 'string',
      options: {
        list: [
          { title: 'Event', value: 'event' },
          { title: 'Webinar', value: 'webinar' },
          { title: 'Event recording', value: 'eventrecording' },
          { title: 'In-country workshop', value: 'incountryworkshop' },
          { title: 'HQ workshop', value: 'hqworkshop' },
          { title: 'Other', value: 'other' },
        ],
      },
      layout: 'dropdown',
    },

    {
      name: 'location',
      title: 'Location',
      description: 'Country, place, venue, address',
      type: 'string',
    },
    {
      name: 'startDate',
      title: 'Start date',
      type: 'richDate',
      options: {
        inputDate: true,
        inputTime: true,
      },
    },
    {
      name: 'endDate',
      title: 'End date',
      type: 'richDate',
      options: {
        inputDate: true,
        inputTime: true,
      },
    },
    {
      name: 'altDateText',
      title: 'Approximate date text',
      description: 'Display this text instead of the actual dates (start date still used for sorting)',
      type: 'string',
    },
    {
      name: 'organiser',
      title: 'Organiser',
      description: 'Who will organise this event',
      type: 'string',
    },

    featuredImage,
    leadText,
    publicationContent,
    // {
    //   name: 'content',
    //   title: 'Content',
    //   type: 'array',
    //   of: [defaultBlock, image],
    // },
    {
      name: 'eventLink',
      title: 'URL to external event page (if any)',
      type: 'url',
    },

    {
      name: 'contact',
      title: 'Contact person(s)',
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
      name: 'relatedContent',
      title: 'Recommended and related content',
      description: 'Add related content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'publication',
            },
            {
              type: 'article',
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
              type: 'topics',
            },
          ],
        },
      ],
      preview: {
        title: 'topics.title',
      },
    },
    keywords,
    slug,
  ],

  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Date',
      name: 'dateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      date: 'startDate.local',
      location: 'location',
      imageUrl: 'image.asset.url',
    },
    prepare({ title = '(title missing)', date = '', location = '', imageUrl }) {
      const subtitle = date === '' ? `${location}` : `${date.split('T')[0]}, ${location}`;
      return {
        title,
        subtitle,
        imageUrl,
      };
    },
  },
};
