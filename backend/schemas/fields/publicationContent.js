import annotations from './annotations';
import { image, box, vimeoVideo, pdfEmbed } from './';

import { HtmlTableEditor, HtmlTableEditorPreview, HighChartsEditor } from '../../components';
import { TinyEditor } from '../../components/HtmlTableEditor/TinyEditor';

import React from 'react';

// const subscriptIcon = () => (
//   <span>X<sub>y</sub></span>
// )
// const subscriptRender = props => (
//   <sub>{props.children}</sub>
// )

const content = {
  name: 'content',
  title: 'Content',
  description: 'The body text and graphic elements.',
  type: 'array',
  of: [
    box,
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
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Strike', value: 'strike-through' },
          {
            title: 'Subscript',
            value: 'sub',
            // icon: subscriptIcon,
            // component: Subscript
          },
        ],

        // Support annotating text with a reference to an author
        annotations,
      },
    },
    {
      type: 'reference',
      tile: 'Nugget',
      to: [
        {
          type: 'nugget',
        },
      ],
    },
    {
      type: 'pullQuote',
    },
    // {
    //   type: 'funkyTable',
    //   options: {
    //     defaultNumRows: 3,
    //     defaultNumColumns: 3,
    //   },
    // },
    image,
    vimeoVideo,
    pdfEmbed,
    {
      name: 'table',
      title: 'Table',
      type: 'object',
      components: {
        input: HtmlTableEditor,
        preview: HtmlTableEditorPreview,
      },
      options: {
        modal: {
          type: 'dialog',
          with: 900,
        },
      },
      fields: [
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'caption',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          name: 'htmlStr',
          readOnly: true,
          type: 'string',
          components: {
            input: TinyEditor,
          },
        },
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
      ],
      preview: {
        select: {
          htmlStr: 'htmlStr',
          title: 'title',
          caption: 'caption',
        },
        component: HtmlTableEditorPreview,
      },
    },
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
};

export default content;

// Convert Sanity's portable text into plain string.
function blocksToText(blocks, opts = {}) {
  const defaults = {};
  const options = Object.assign({}, defaults, opts);
  return blocks
    .map(block => {
      // TODO: Could make this even more general by letting it recursively
      // go down a block tree in search for indexable content.
      if (block._type === 'heading') {
        const { headingValue = '' } = block;
        return headingValue;
      } else if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`;
      }
      return block.children.map(child => child.text).join('');
    })
    .join(' ');
}
