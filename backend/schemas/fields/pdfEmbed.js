export default {
  name: 'pdfEmbed',
  title: 'Embedded pdf',
  type: 'object',
  fields: [
    {
      name: 'src',
      title: 'URL to the pdf file',
      type: 'url',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'mode',
      title: 'Mode',
      description: 'Select embed mode',
      type: 'string',
      initialValue: 'inline',
      options: {
        list: [
          { title: 'Inline - all pages without container', value: 'inline' },
          { title: 'Scrolled - scroll all pages inside container', value: 'fullwindow' },
          { title: 'Paged - page by page inside container', value: 'sizedcontainer' },
          { title: 'LightBox - click button to open full screen', value: 'lightbox' },
        ],
      },

    },

  ],
};
