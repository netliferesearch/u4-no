export default {
  name: "language",
  title: "Language",
  type: "string",
  initialValue: "en_US",
  options: {
    list: [
      { title: 'English', value: 'en_US'},
      { title: 'Arabic', value: 'ar_AR'},
      { title: 'French', value: 'fr_FR'},
      { title: 'German', value: 'de_DE' },
      { title: 'Indonesian', value: 'in_IN' },
      { title: 'Portuguese', value: 'pt_PT' },
      { title: 'Spanish', value: 'es_ES' },
      { title: 'Russian', value: 'ru_RU' },
      { title: 'Ukrainian', value: 'uk_UA' },
    ], // <-- predefined values
  },
  layout: "dropdown"
}
