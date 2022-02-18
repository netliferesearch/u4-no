import license from './fields/license';
import annotationsLinksOnly from './fields/annotationsLinksOnly';

/**
 * A publication is a long form document
 */
import { Input as UrlWithMetadataInput } from 'part:url-metadata-input/input';
import { title, longTitle, date, image, leadText, featuredImage, vimeoVideo, previewLinks } from './fields';

export default {
  name: 'frontpage',
  type: 'document',
  title: 'Frontpage',
  fields: [
    previewLinks,
    title,
    longTitle,
    {
      name: 'lead',
      title: 'Lead text',
      description: `One or two main points to highlight importance, relevance, and benefit for development professionals.
      (Aim for 400–500 characters with spaces)`,
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      name: 'leadLinks',
      title: 'Links in lead text box',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'link',
              title: 'Link URL',
              type: 'string',
            },
          ],
        },
      ],
    },
    featuredImage,
    {
      name: 'sections',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          // Only allow numbered lists
          marks: {
            // Only allow these decorators
            decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
            // Support annotating text with a reference to an author
            annotations: annotationsLinksOnly,
          },
        },
        {
          name: 'heading',
          title: 'Centered heading',
          type: 'object',
          fields: [
            {
              name: 'headingValue',
              type: 'string',
            },
          ],
        },
        {
          name: 'textBlock',
          title: 'Text field',
          type: 'object',
          fields: [
            {
              name: 'text',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                  ],
                  // Only allow numbered lists
                  marks: {
                    // Only allow these decorators
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                    // Support annotating text with a reference to an author
                    annotations: annotationsLinksOnly,
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              blocks: 'text',
            },
            prepare({ blocks }) {
              const block = (blocks || []).find(block => block._type === 'block');
              return {
                title: block
                  ? block.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                  : 'No title',
              };
            },
          },
        },

        {
          name: 'oneColumn',
          title: 'One column text box',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text box contents',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                  ],
                  // Only allow numbered lists
                  marks: {
                    // Only allow these decorators
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                    // Support annotating text with a reference to an author
                    annotations: annotationsLinksOnly,
                  },
                },
              ],
            },
            {
              name: 'colorScheme',
              title: 'Color scheme',
              type: 'string',
              options: {
                list: [
                  { title: 'Dark on white', value: 'darkOnWhite' },
                  { title: 'Dark on light blue', value: 'darkOnLightBlue' },
                  { title: 'White on blue', value: 'whiteOnBlue' },
                  { title: 'White on dark blue', value: 'whiteOnDarkBlue' },
                ],
              },
              layout: 'dropdown',
            },
          ],
          preview: {
            select: {
              blocks: 'text',
            },
            prepare({ blocks }) {
              const block = (blocks || []).find(block => block._type === 'block');
              return {
                title: block
                  ? block.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                  : 'No title',
              };
            },
          },
        },

        {
          name: 'features',
          title: 'Features',
          type: 'object',
          fields: [
            {
              name: 'featureArray',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    image,
                    {
                      name: 'featureText',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'workshops',
          title: 'Workshops list',
          type: 'object',
          fields: [
            {
              name: 'workshopsRef',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [
                    {
                      type: 'event',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'expertAnswers',
          title: 'Expert answers',
          type: 'object',
          fields: [
            {
              name: 'expertAnswersRef',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [
                    {
                      type: 'publication',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'resources',
          title: 'Resources',
          type: 'object',
          fields: [
            {
              name: 'resourcesRef',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [
                    {
                      type: 'resource',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'assets',
          title: 'Assets',
          type: 'object',
          fields: [
            {
              name: 'assetsRef',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [
                    {
                      type: 'asset',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'mosaic',
          title: 'Mosaic',
          type: 'object',
          fields: [
            {
              name: 'itemsRef',
              title: 'Items in the Mosaic',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [
                    {
                      type: 'asset',
                    },
                    {
                      type: 'article',
                    },
                    {
                      type: 'course',
                    },
                    {
                      type: 'event',
                    },
                    {
                      type: 'person',
                    },
                    {
                      type: 'publication',
                    },
                    {
                      type: 'topics',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'courses',
          title: 'Courses list',
          type: 'object',
          fields: [
            {
              name: 'coursesRef',
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
          ],
        },
        vimeoVideo,
        {
          name: 'cta',
          title: 'Call to action link',
          type: 'object',
          fields: [
            {
              name: 'ctaValue',
              title: 'Lenketekst',
              type: 'string',
            },
            {
              name: 'ctaURL',
              title: 'URL',
              type: 'string',
            },
          ],
        },
        {
          name: 'twoColumns',
          title: 'Text in two columns',
          type: 'object',
          fields: [
            {
              name: 'textLeft',
              title: 'Text in left hand box',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                  ],
                  // Only allow numbered lists
                  marks: {
                    // Only allow these decorators
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                    // Support annotating text with a reference to an author
                    annotations: annotationsLinksOnly,
                  },
                },
              ],
            },
            {
              name: 'textRight',
              title: 'Text in right hand box',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                  ],
                  // Only allow numbered lists
                  marks: {
                    // Only allow these decorators
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                    // Support annotating text with a reference to an author
                    annotations: annotationsLinksOnly,
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              blocks: 'textLeft',
              blocks2: 'textRight',
            },
            prepare({ blocks, blocks2 }) {
              const block = (blocks || []).find(block => block._type === 'block');
              const block2 = (blocks2 || []).find(block => block._type === 'block');
              return {
                title: block
                  ? block.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                  : 'No title',
                subtitle: block2
                  ? block2.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                  : 'No title',
              };
            },
          },
        },
        {
          name: 'boxOnBoxRef',
          title: 'Two text boxes',
          type: 'object',
          fields: [
            {
              name: 'textLeft',
              title: 'Text in left hand box',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                  ],
                  // Only allow numbered lists
                  marks: {
                    // Only allow these decorators
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                    // Support annotating text with a reference to an author
                    annotations: annotationsLinksOnly,
                  },
                },
              ],
            },
            {
              name: 'textRight',
              title: 'Text in right hand box',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                  ],
                  // Only allow numbered lists
                  marks: {
                    // Only allow these decorators
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                    // Support annotating text with a reference to an author
                    annotations: annotationsLinksOnly,
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              blocks: 'textLeft',
              blocks2: 'textRight',
            },
            prepare({ blocks, blocks2 }) {
              const block = (blocks || []).find(block => block._type === 'block');
              const block2 = (blocks2 || []).find(block => block._type === 'block');
              return {
                title: block
                  ? block.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                  : 'No title',
                subtitle: block2
                  ? block2.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                  : 'No title',
              };
            },
          },
        },
        {
          name: 'boxOnBoxTopics',
          title: 'Two text boxes, topics in right one',
          type: 'object',
          fields: [
            {
              name: 'textLeft',
              title: 'Text in left hand box',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                  ],
                  // Only allow numbered lists
                  marks: {
                    // Only allow these decorators
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                    // Support annotating text with a reference to an author
                    annotations: annotationsLinksOnly,
                  },
                },
              ],
            },
            {
              name: 'textRight',
              title: 'Text in right hand box',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                  ],
                  // Only allow numbered lists
                  marks: {
                    // Only allow these decorators
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                    // Support annotating text with a reference to an author
                    annotations: annotationsLinksOnly,
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              blocks: 'textLeft',
              blocks2: 'textRight',
            },
            prepare({ blocks, blocks2 }) {
              const block = (blocks || []).find(block => block._type === 'block');
              const block2 = (blocks2 || []).find(block => block._type === 'block');
              return {
                title: block
                  ? block.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                  : 'No title',
                subtitle: block2
                  ? block2.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                  : 'No title',
              };
            },
          },
        },
        {
          name: 'HelpdeskTeam',
          title: 'Two text boxes for contacts',
          type: 'object',
          fields: [
            {
              name: 'img',
              title: 'Image on the left hand',
              type: 'image',
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
            {
              name: 'textRight',
              title: 'Text in right hand box',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                  ],
                  // Only allow numbered lists
                  marks: {
                    // Only allow these decorators
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                    // Support annotating text with a reference to an author
                    annotations: annotationsLinksOnly,
                  },
                },
              ],
            },
            {
              name: 'headingLeft',
              title: 'Heading for left column contacts',
              type: 'string',
            },
            {
              name: 'personLeft',
              title: 'Left column contacts',
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
              name: 'headingRight',
              title: 'Heading for right column contacts',
              type: 'string',
            },
            {
              name: 'personRight',
              title: 'Right column contacts',
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
          ],
          preview: {
            select: {
              blocks: 'textRight',
            },
            prepare({ blocks }) {
              const block = (blocks || []).find(block => block._type === 'block');
              return {
                title: block
                  ? block.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                  : 'No title',
              };
            },
          },
        },
        {
          name: 'boxOnImageRef',
          title: 'Text box on image',
          type: 'object',
          fields: [
            {
              name: 'img',
              title: 'Image on the left hand',
              type: 'image',
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
            {
              name: 'block',
              title: 'Text in right hand box',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                  ],
                  // Only allow numbered lists
                  marks: {
                    // Only allow these decorators
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                    ],
                    // Support annotating text with a reference to an author
                    annotations: annotationsLinksOnly,
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              blocks: 'block',
            },
            prepare({ blocks }) {
              const block = (blocks || []).find(block => block._type === 'block');
              return {
                title: block
                  ? block.children
                      .filter(child => child._type === 'span')
                      .map(span => span.text)
                      .join('')
                  : 'No title',
              };
            },
          },
        },
      ],
    },
    {
      name: 'resources',
      description: 'Relevant resources for this page',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'article',
            },
            {
              type: 'publication',
            },
            {
              type: 'blog-post',
            },
          ],
        },
      ],
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: input =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .slice(0, 200),
      },
    },
    {
      name: 'relatedUrl',
      title: 'Related URL',
      type: 'urlWithMetadata',
      inputComponent: UrlWithMetadataInput,
    },
  ],
  orderings: [
    {
      title: 'Date',
      name: 'dateDesc',
      by: [{ field: '_updatedAt', direction: 'desc' }],
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'longTitle',
      imageUrl: 'featuredImage.asset.url',
    },
  },
};
