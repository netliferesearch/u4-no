export default {
  name: "license",
  title: "License",
  type: "string",
  options: {
    list: [
      { title: 'CC0', value: 'cc0'},
      { title: 'Copyright', value: 'copyright'},
      { title: 'Attribution', value: 'by' },
      { title: 'Share-alike', value: 'sa' },
      { title: 'Non-commercial', value: 'nc' },
      { title: 'No derivative work', value: 'nd' },
      { title: 'Public Domain', value: 'pd' },
      { title: 'Public Domain Dedication', value: 'cc0' },
      { title: 'Creative Commons', value: 'cc' },
      { title: 'Copyright', value: 'copy' },
    ], // <-- predefined values
  },
  layout: "dropdown"
}
