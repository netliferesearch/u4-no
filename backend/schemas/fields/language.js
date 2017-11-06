export default {
  name: "language",
  title: "Language",
  type: "string",
  options: {
    list: [
      { title: 'English', value: 'en_US'},
      { title: 'French', value: 'fr_FR'},
      { title: 'Spanish', value: 'es_ES' },
      { title: 'German', value: 'de_DE' },
      { title: 'Portuguese', value: 'pt_PT' },
      { title: 'Russian', value: 'ru_RU' },
      { title: 'Ukranian', value: 'uk_UA' },
    ], // <-- predefined values
  },
  layout: "dropdown"
}
