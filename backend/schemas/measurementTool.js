import { leadText, featuredImage, slug, image, keywords } from './fields';
import annotationsLinksOnly from './fields/annotationsLinksOnly';
import defaultBlock from './fields/defaultBlock';

export default {
  title: 'Measurement tool',
  name: 'measurementTool',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'Name of the tool',
      type: 'string',
    },
    {
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      description: 'Link to the tool',
      type: 'url',
    },
    {
      name: 'category',
      title: 'Analysis type',
      description: 'Select one',
      type: 'string',
      options: {
        list: ['Static assessment', 'Multi-country index', 'Survey'],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [defaultBlock],
    },
    {
      name: 'strengths',
      title: 'Strengths',
      type: 'array',
      of: [defaultBlock],
    },
    {
      name: 'limitations',
      title: 'Limitations',
      type: 'array',
      of: [defaultBlock],
    },
    {
      name: 'sector',
      title: 'Sector',
      description: 'Select one or multiple',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'keyword' }],
          options: {
            filter: () => {
              return { filter: 'category == $category', params: { category: 'sector' } };
            },
          },
        },
      ],
    },
    {
      name: 'regions',
      title: 'Regions/geographic coverage',
      description: 'Select one or multiple',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'grid',
        list: [
          'Single-country',
          'Multi-country/global',
          'Regional',
          'Global',
          'Africa',
          'Asia-Pacific',
          'Caribbean',
          'Central Asia',
          'Europe',
          'Latin America',
          'Middle East',
          'North Africa',
          'North America',
          'Oceania',
          'South America',
        ],
      },
    },
    {
      name: 'timeframe_from',
      title: 'Timeframe start',
      description: 'Leave empty if N/A',
      type: 'number',
      validation: Rule =>
        Rule.custom((value, context) => {
          if (value !== '' && value < 1970) {
            return 'Please enter a year from 1970 onwards';
          }
          return true;
        }),
    },
    {
      name: 'timeframe_to',
      title: 'Timeframe end',
      description: 'Leave empty if present or  N/A',
      type: 'number',
      validation: Rule =>
        Rule.custom((value, context) => {
          if (value !== '' && value < 1970) {
            return 'Please enter a year from 1970 onwards';
          }
          return true;
        }),
    },
    {
      name: 'frequency',
      title: 'Frequency',
      description: 'Select one',
      type: 'string',
      options: {
        layout: 'grid',
        list: ['Cyclical', 'Continuously', 'Irregular', 'Yearly'],
      },
    },
    {
      name: 'datasource',
      title: 'Data source(s)',
      description: '',
      type: 'string',
    },

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
      publisher: 'publisher',
    },
    prepare({ title = '(title missing)', publisher = '' }) {
      const subtitle = publisher;
      return {
        title,
        subtitle,
      };
    },
  },
};
