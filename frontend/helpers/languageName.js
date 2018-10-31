export default ({ langcode = '' }) => {
  const languageNames = {
    en_US: 'English',
    fr_FR: 'French',
    es_ES: 'Spanish',
    de_DE: 'German',
    pt_PT: 'Portuguese',
    ru_RU: 'Russian',
    uk_UA: 'Ukranian',
  };
  if (langcode === '') return 'English';
  return languageNames[langcode] ? languageNames[langcode] : 'an other language';
};
