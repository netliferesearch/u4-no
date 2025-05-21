// import ReferringDocumentsList from '../components/referring-documents/src/ReferringDocumentsList';
import { HighChartsEditor } from '../components';
import { GeneratedFileInput } from '../components/GeneratedFileInput/GeneratedFileInput';
import { ThumbnailInput } from '../components/ThumbnailInput/ThumbnailInput';
import {
  box,
  date,
  explainerText,
  featuredImage,
  image,
  license,
  longTitle,
  pdfEmbed,
  previewLinks,
  slug,
  standfirst,
  tableBlock,
  title,
  vimeoVideo,
} from './fields';
import annotationsLinksOnly from './fields/annotationsLinksOnly';
import publicationContent, { blocksToText } from './fields/publicationContent';

export default {
  name: 'topics',
  title: 'Topic',
  type: 'document',
  groups: [
    {
      name: 'basicGuide',
      title: 'Basic guide',
    },
  ],
  fields: [
    previewLinks,
    {
      name: 'title',
      type: 'string',
      title: 'Short title',
      description: 'Keywords that people search. Not including "corruption". Max 5 words',
    },
    longTitle,
    standfirst,
    explainerText,
    featuredImage,
    {
      name: 'parent',
      title: 'This is an area of…',
      description: 'This topic is an area of another topic',
      type: 'reference',
      to: [
        {
          type: 'topics',
        },
      ],
    },
    {
      name: 'agenda',
      title: 'Research and policy agenda',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
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
          type: 'reference',
          to: [
            {
              type: 'nugget',
            },
          ],
        },
        {
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
      ],
    },
    {
      name: 'advisors',
      type: 'array',
      of: [
        {
          name: 'advisor',
          type: 'reference',
          to: [
            {
              type: 'person',
            },
          ],
        },
      ],
    },
    slug,
    {
      name: 'resources',
      title: 'Featured resources',
      description: 'Featured resources for this topic page',
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
            {
              type: 'event',
            },
            {
              type: 'course',
            },
          ],
        },
      ],
    },
    {
      name: 'courses',
      title: 'Featured courses',
      description: 'Featured courses for this topic page',
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
      name: 'further_resources',
      title: 'Further resources',
      description: 'Further resources for this topic page',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'article',
            },
            {
              type: 'event',
            },
          ],
        },
      ],
    },
    {
      name: 'collections',
      title: 'Resource collection',
      description: 'Resource collections for this topic page',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'collection',
            },
          ],
        },
      ],
    },
    {
      ...date,
      title: 'Guide update date',
      description: 'Date guide was last substantially updated',
      group: 'basicGuide',
    },
    publicationContent({ includeGroup: true, groupName: 'basicGuide' }),
    {
      title: 'Author(s) of basic guide',
      description: 'If no authors are added, we use advisors from the topic page',
      name: 'authors',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
      group: 'basicGuide',
    },
    {
      name: 'pdfThumbnail',
      title: 'Thumbnail of publication pdf',
      type: 'image',
      group: 'basicGuide',
      components: {
        input: ThumbnailInput,
      },
    },
    {
      name: 'pdfFile',
      title: 'Pdf file (generated)',
      description: 'This file is generated from the content of this publication',
      type: 'file',
      group: 'basicGuide',
      components: {
        input: GeneratedFileInput,
      },
    },
    {
      name: 'legacypdf',
      title: 'Pdf file (uploaded)',
      description: 'This file overrides the generated pdf',
      type: 'file',
      group: 'basicGuide',
    },
    {
      name: 'relatedContent',
      title: 'Related blog articles, publications and courses',
      description: 'Add related content, max 3 will be displayed in the frontend',
      type: 'array',
      group: 'basicGuide',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'course',
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
      name: 'introduction',
      title: 'Basic guide',
      type: 'array',
      group: 'basicGuide',
      hidden: ({ document, currentUser }) => {
        return !(currentUser.roles.find(({ name }) => name === 'administrator'))
      },
      deprecated: {
        reason: 'Please use Content field instead',
      },
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' },
            { title: 'Quote', value: 'blockquote' },
          ],
          // Only allow numbered lists
          marks: {
            // Only allow these decorators
            decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
            // Support annotating text with a reference to an author
            annotations: annotationsLinksOnly,
          },
        },
        box,
        vimeoVideo,
        pdfEmbed,
        {
          type: 'pullQuote',
        },
        {
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
        tableBlock,
        {
          name: 'chart',
          title: 'Chart',
          type: 'object',
          components: {
            input: HighChartsEditor,
          },
          options: {
            modal: {
              type: 'dialog',
              with: 900,
            },
          },
          fields: [
            { name: 'title', type: 'string' },
            { name: 'caption', type: 'array', of: [{ type: 'block' }] },
            {
              name: 'size',
              title: 'Size',
              description: 'Select display width',
              type: 'string',
              options: {
                isHighlighted: true,
                list: [
                  { title: 'Full width', value: 'fullwidth' },
                  { title: 'Wide', value: 'wide' },
                  { title: 'Normal', value: 'normal' },
                  { title: 'Small', value: 'small' },
                  { title: 'Narrow', value: 'narrow' },
                ],
              },
            },
            { name: 'htmlStr', readOnly: true, type: 'string' },
            { name: 'jsonStr', readOnly: true, type: 'string' },
            { name: 'svgStr', readOnly: true, type: 'string' },
            { name: 'editorConfigWithData', readOnly: true, type: 'string' },
          ],
          preview: {
            select: {
              title: 'title',
              caption: 'caption',
            },
            prepare({ title, caption = [] }) {
              const subtitle = blocksToText(caption);
              return {
                title: `Highcharts: ${title || 'No title'}`,
                subtitle,
              };
            },
          },
        },
        {
          name: 'pagebreak',
          title: 'Page break',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Page break',
              type: 'boolean',
              description: 'Insert a page break here in the generated pdf',
            },
          ],
          preview: {
            prepare() {
              return {
                title: 'Insert a page break here in the generated pdf',
              };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'longTitle',
      imageUrl: 'featuredImage.asset.url',
    },
    prepare({ title, subtitle, imageUrl }) {
      return {
        title,
        subtitle,
        imageUrl,
      };
    },
  },
};
