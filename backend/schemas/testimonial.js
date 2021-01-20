/**
 * A testimonial is a combination of quote content, image and cite
 */

export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Testimonial',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          marks: {
            // Only allow these decorators
            decorators: [{ title: 'Emphasis', value: 'em' }],
          },
        },
      ],
    },
    {
      name: 'cite',
      title: 'Cite',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'cite',
      subtitle: 'text',
    },

    prepare({ title = '', subtitle = false }) {
      return {
        title,
        subtitle: subtitle ? subtitle[0].children[0].text : 'Empty',
      };
    },
  },
};
