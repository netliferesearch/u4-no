import { leadText, featuredImage, slug, image } from './fields'

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
      name: "eventType",
      title: "Event type",
      type: "string",
      options: {
        list: [
          { title: 'In-country workshop', value: 'incountryworkshop'},
          { title: 'HQ workshop', value: 'hqworkshop'},
          { title: 'Other', value: 'other'},
        ],
      },
      layout: "dropdown",
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
      }
    },
    {
      name: 'endDate',
      title: 'End date',
      type: 'richDate',
      options: {
        inputDate: true,
        inputTime: true,
      }
    },
    {
      name: 'organiser',
      title: 'Organiser',
      description: 'Who will organise this event',
      type: 'string',
    },

    featuredImage,
    leadText,

    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
          ],
          // Only allow numbered lists
          marks: {
            // Only allow these decorators
            decorators: [
              {title: 'Emphasis', value: 'em'}
            ],
            // Support annotating text with a reference to an author
            annotations: [
              {name: 'link', title: 'External Link', type: 'object', fields: [{ name: 'href', title: 'URL', type: 'url'}] },
              {name: 'internalReferance', title: 'Author or publication', type: 'reference', to: [{type: 'person'},{type: 'publication'}]},
            ]
          }
        },
        image,
      ]
    },

    {
      name: 'eventLink',
      title: 'URL to external event page (if any)',
      type: 'url'
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
              type: 'topics'
            }
          ]
        }
      ],
      preview: {
        title: 'topics.title'
      }
    },

    {
      name: 'keywords',
      description: 'Select relevant U4 keywords',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'keyword'
            }
          ]
        }
      ],
    },
    slug
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
      image: 'image.asset.url',
    },
    prepare({ title = '(title missing)', date = '', location = '', image }) {
      const subtitle =
        date === ''
          ? `${location}`
          : `${date.split('T')[0]}, ${location}`;
      return {
        title: title,
        subtitle: subtitle,
        image,
      };
    },
  },

}
