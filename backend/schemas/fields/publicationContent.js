import annotations from './annotations'
import {
  image,
  box,
} from './'
import {FaTable} from 'react-icons/fa'

import { HtmlTableEditor, HtmlTableEditorPreview, HighChartsEditor, HighChartsEditorPreview } from '../../components'

const content = {
  name: 'content',
  title: 'Publication content',
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
        { title: 'H5', value: 'h5' }
      ],
      // Only allow numbered lists
      marks: {
        // Only allow these decorators
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' }
        ],
        // Support annotating text with a reference to an author
        annotations
      }
    },
    {
      type: 'reference',
      tile: 'Nugget',
      to: [
        {
          type: 'nugget'
        }
      ]
    },
    {
      type: 'pullQuote'
    },
    {
      type: 'funkyTable',
      options: {
        defaultNumRows: 3,
        defaultNumColumns: 3
      }
    },
    image,
    {
      name: 'vimeo',
      title: 'Vimeo video',
      type: 'object',
      fields: [
        {
          name: 'src',
          title: 'URL to the vimeo video (not the whole embed code)',
          type: 'string'
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string'
        }
      ]
    },
    {
      name: 'table',
      title: 'Table',
      type: 'object',
      inputComponent: HtmlTableEditor,
      options: {
        editModal: 'fullscreen'
      },
      fields: [
        {
          name: 'title',
          type: 'string'
        },
        {
          name: 'caption',
          type: 'array',
          of: [{type: 'block'}]
        },
        {
          name: 'htmlStr',
          readOnly: true,
          type: 'string'
        }
      ],
      preview: {
        select: {
          htmlStr: 'htmlStr',
          title: 'title',
          caption: 'caption',
        },
        component: HtmlTableEditorPreview
      }
    },
    {
      name: 'chart',
      title: 'Chart',
      type: 'object',
      inputComponent: HighChartsEditor,
      options: {
        editModal: 'fullscreen'
      },
      fields: [
        { name: 'title', type: 'string' },
        { name: 'caption', type: 'array', of: [{type: 'block'}] },
        { name: 'htmlStr', readOnly: true, type: 'string' },
        { name: 'jsonStr', readOnly: true, type: 'string' },
        { name: 'svgStr', readOnly: true, type: 'string' },
        { name: 'editorConfigWithData', readOnly: true, type: 'string' },
      ],
      preview: {
        select: {
          htmlStr: 'htmlStr',
          svgStr: 'svgStr',
          jsonStr: 'jsonStr',
          title: 'title',
          caption: 'caption',
        },
        component: HighChartsEditorPreview
      }
    }
  ]
}

export default content
