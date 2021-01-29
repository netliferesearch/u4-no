/**
 * A testimonial is a combination of quote content, image and cite
 */

import { license } from './fields';

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
    {
      name: 'image',
      type: 'image',
      options: {
        isHighlighted: true,
        hotspot: true,
      },
      fields: [
        {
          name: 'altText',
          title: 'Alternative text',
          description: "For users that can't see images",
          type: 'string',
        },
        {
          name: 'caption',
          title: 'Caption text',
          description:
            'Shows next to image. Title from Flickr – if applicable. Describe context and/or message. Name people and places.',
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
          name: 'size',
          title: 'Image size',
          description: 'Set size for image in frontend that supports it',
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
        {
          name: 'credit',
          title: 'Credit',
          description: 'Photographer/publisher’s name.',
          type: 'text',
        },
        {
          name: 'sourceUrl',
          title: 'Credit URL',
          type: 'url',
          description: 'Enter link for source for the image or the originator',
        },
        license,
      ],
    },
  ],
  preview: {
    select: {
      title: 'cite',
      imageUrl: 'image.asset.url',
    },
    prepare({ title = '', subtitle = false, imageUrl }) {
      return {
        title,
        subtitle: subtitle ? subtitle[0].children[0].text : '',
        imageUrl,
      };
    },
  },
};
