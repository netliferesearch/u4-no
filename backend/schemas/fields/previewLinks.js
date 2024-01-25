import PreviewLinksField from '../../components/PreviewLinks/PreviewLinksField';

const previewLinks = {
  name: 'previewLinks',
  title: 'Preview Links',
  description: 'Links to preview of longform and pdf (for publications)',
  type: 'boolean',
  readOnly: true,
  components: {
    field: PreviewLinksField
  }
  // inputComponent: PreviewLinksComponent,
};

export default previewLinks;
