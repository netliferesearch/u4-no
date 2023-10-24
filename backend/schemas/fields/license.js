export default {
  name: "license",
  title: "License",
  description: "See https://creativecommons.org for more information on Creative Commons",
  type: "string",
  options: {
    // isHighlighted: true,
    list: [
      { title: 'Attribution-NonCommercial-NoDerivs (by-nc-nd)', value: 'by-nc-nd' },
      { title: 'Attribution-NonCommercial-ShareAlike (by-nc-sa)', value: 'by-nc-sa' },
      { title: 'Attribution-NonCommercial-ShareAlike (by-nc)', value: 'by-nc' },
      { title: 'Attribution-NoDerivs (by-nd)', value: 'by-nd' },
      { title: 'Attribution ShareAlike (by-sa)', value: 'by-sa' },
      { title: 'Attribution (by)', value: 'by' },
      { title: 'Public Domain Mark (pd)', value: 'pd' },
      { title: 'Public Domain Dedication (cc0)', value: 'cc0' },
      { title: 'Copyrighted (©)', value: 'copyrighted' },
    ], // <-- predefined values
  },
  layout: "dropdown"
}