export default {
  name: 'testimonial',
  description: 'Testimonial/ quote from former participant to event or course',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'Quote',
      description: 'What the quote is',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [{ title: 'Emphasis', value: 'em' }],
            annotations: [],
          },
        },
      ],
    },
    {
      name: 'cite',
      title: 'Source',
      description: 'Who to cite',
      type: 'string',
    },
  ],
  preview: {
    select: {
      blocks: 'text',
    },
    prepare(value) {
      const block = (value.blocks || []).find(block => block._type === 'block');
      return {
        title: block
          ? block.children
              .filter(child => child._type === 'span')
              .map(span => span.text)
              .join(' ')
          : 'No title',
      };
    },
  },
};
