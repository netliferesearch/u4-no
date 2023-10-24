import PreviewLinksComponent from '../../components/PreviewLinksComponent';

const previewLinks = {
  name: 'previewLinks',
  title: 'Preview Links',
  description: 'Links to preview of longform and pdf (for publications)',
  type: 'boolean',
  readOnly: true,
  components: {
    input: PreviewLinksComponent,
  },
};

export default previewLinks;
