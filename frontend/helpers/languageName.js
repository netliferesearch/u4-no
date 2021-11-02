const LanguageName = ({ langcode = '' }) => {
  const languageNames = {
    en_US: 'English',
    fr_FR: 'French',
    es_ES: 'Spanish',
    de_DE: 'German',
    in_IN: 'Indonesian',
    pt_PT: 'Portuguese',
    ru_RU: 'Russian',
    uk_UA: 'Ukrainian',
    ar_AR: 'Arabic',
  };
  if (langcode === '') return 'English';
  return languageNames[langcode] ? languageNames[langcode] : 'an other language';
};

export default LanguageName;
