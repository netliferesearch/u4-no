export default {
  name: "language",
  title: "Language",
  type: "string",
  options: {
    list: [
      { title: 'English', value: 'en_EN'},
      { title: 'French', value: 'fr_FR'},
      { title: 'Spanish', value: 'es_ES' },
      { title: 'German', value: 'de_DE' },
    ], // <-- predefined values
  },
  layout: "dropdown"
}
