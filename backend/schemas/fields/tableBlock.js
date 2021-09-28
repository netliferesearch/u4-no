import { HtmlTableEditor, HtmlTableEditorPreview } from '../../components';

export default {
  name: 'table',
  title: 'Table',
  type: 'object',
  inputComponent: HtmlTableEditor,
  options: {
    editModal: 'fullscreen',
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
};
